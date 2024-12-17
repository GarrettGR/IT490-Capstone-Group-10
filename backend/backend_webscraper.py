#!/usr/bin/env python3

import asyncio
import aiohttp
import pika
import json
from datetime import datetime
import logging
from typing import Dict, List
from config import RMQ_CONFIG, SCRAPING_CONFIG, APPLIANCE_PROBLEMS, APPLIANCE_FILTERS, DB_CONFIG
from backend.retail_scraper import RetailScraper
from backend.parts_scraper import PartsScraper

logging.basicConfig(
  level=logging.INFO,
  format='%(asctime)s - %(levelname)s - %(message)s'
)

class ApplianceWebScraper:
  def __init__(self):
    self.setup_rmq()
    self.retail_scrapers = {
      site: RetailScraper(
        SCRAPING_CONFIG['headers'],
        SCRAPING_CONFIG['rate_limit'],
        site
      )
      for site in SCRAPING_CONFIG['retail_urls']
    }
    self.parts_scrapers = {
      site: PartsScraper(
        SCRAPING_CONFIG['headers'],
        SCRAPING_CONFIG['rate_limit'],
        site
      )
      for site in {**SCRAPING_CONFIG['parts_urls'], **SCRAPING_CONFIG['manufacturer_urls']}
    }
    self.appliances_cache = []

  def setup_rmq(self):
    self.rmq_credentials = pika.PlainCredentials(
      RMQ_CONFIG['credentials']['username'],
      RMQ_CONFIG['credentials']['password']
    )
    self.rmq_connection = pika.BlockingConnection(
      pika.ConnectionParameters(
        RMQ_CONFIG['host'],
        credentials=self.rmq_credentials
      )
    )
    self.channel = self.rmq_connection.channel()
    self.channel.exchange_declare(
      exchange=RMQ_CONFIG['exchange'],
      exchange_type='direct',
      durable=True
    )

  async def run_scraping_cycle(self):
    """Main scraping cycle that runs in phases"""
    async with aiohttp.ClientSession() as session:
      await self.phase_appliance_collection(session)
      await self.phase_parts_collection(session)

  async def phase_appliance_collection(self, session):
    """Phase 1: Collect appliances from retail sites"""
    logging.info("Starting Phase 1: Appliance Collection")    
    appliances = await self._gather_appliance_data(session)
    filtered_appliances = self._filter_appliances(appliances)
    for appliance in filtered_appliances:
      query = DB_CONFIG['insert_appliance']
      self.send_to_database({
        'query': query,
        'params': appliance
      })
    await self._wait_for_db_sync()
    
  def _filter_appliances(self, appliances: List[Dict]) -> List[Dict]:
    """Filter appliances based on configured types and brands"""
    return [
      app for app in appliances
      if app['type'].lower() in APPLIANCE_FILTERS['types']
      and app['brand'].lower() in APPLIANCE_FILTERS['brands']
    ]

  async def phase_parts_collection(self, session):
    """Phase 2: Collect parts for known appliances"""
    logging.info("Starting Phase 2: Parts Collection")
    query = DB_CONFIG['select_appliances']
    params = (
      ','.join([f"'{t}'" for t in APPLIANCE_FILTERS['types']]),
      ','.join([f"'{b}'" for b in APPLIANCE_FILTERS['brands']])
    )
    self.send_to_database({
      'query': query,
      'params': params,
      'response_required': True
    })
    appliances = await self._wait_for_db_response()
    for appliance in appliances:
      await self._gather_parts_for_appliance(session, appliance)

  async def _gather_parts_for_appliance(self, session, appliance: Dict):
    """Gather parts for a specific appliance"""
    problems = APPLIANCE_PROBLEMS.get(appliance['type'].lower(), {})
    sources = self._get_parts_sources(appliance['brand'])
    for problem_area, part_types in problems.items():
      for part_type in part_types:
        parts = await self._search_parts_specific_sources(
          session, 
          appliance['model'],
          part_type,
          problem_area,
          sources
        )
        for part in parts:
          query = DB_CONFIG['insert_part']
          self.send_to_database({
            'query': query,
            'params': {**part, 'appliance_model': appliance['model']}
          })

  def _get_parts_sources(self, brand: str) -> List[str]:
    """Determine which parts sources to use based on brand"""
    sources = list(SCRAPING_CONFIG['parts_urls'].keys())  # always include generic parts sites
    brand = brand.lower()
    if brand in SCRAPING_CONFIG['manufacturer_urls']: # include manufacturer parts sites (if available)
      sources.append(brand)
    return sources

  async def _search_parts_specific_sources(self, session, model: str, part_type: str, problem_area: str, sources: List[str]) -> List[Dict]:
    """Search for parts in specific sources only"""
    tasks = []
    for site in sources:
      if site in self.parts_scrapers:
        tasks.append(self.parts_scrapers[site].search_parts(session, model, part_type, problem_area))
    results = await asyncio.gather(*tasks, return_exceptions=True)
    return [part for result in results if isinstance(result, list) for part in result]

  async def _gather_appliance_data(self, session) -> List[Dict]:
    tasks = []
    for site, url in SCRAPING_CONFIG['retail_urls'].items():
      scraper = self.retail_scrapers[site]
      tasks.append(scraper.scrape(session, url))    
    results = await asyncio.gather(*tasks, return_exceptions=True)
    appliances = []
    for result in results:
      if isinstance(result, Exception):
        logging.error(f"Scraping error: {result}")
      else:
        appliances.extend(result)
    return appliances

  async def _gather_parts_data(self, session, appliances: List[Dict]):
    for appliance in appliances:
      model = appliance.get('model')
      if not model:
        continue
      problems = APPLIANCE_PROBLEMS.get(appliance['type'].lower(), {})
      appliance['parts'] = []
      for problem_area, part_types in problems.items():
        for part_type in part_types:
          parts = await self._search_parts_all_sources(session, model, part_type, problem_area)
          appliance['parts'].extend(parts)

  async def _search_parts_all_sources(self, session, model: str, part_type: str, problem_area: str) -> List[Dict]:
    tasks = []
    for site, scraper in self.parts_scrapers.items():
      tasks.append(scraper.search_parts(session, model, part_type, problem_area))    
    results = await asyncio.gather(*tasks, return_exceptions=True)
    parts = []
    for result in results:
      if isinstance(result, Exception):
        logging.error(f"Parts scraping error: {result}")
      else:
        parts.extend(result)
    return parts

  async def _process_scraped_data(self, appliances: List[Dict]):
    for appliance in appliances:
      # Store appliance basic data
      await self.store_appliance_data(appliance)
      
      # Store parts data
      if 'parts' in appliance:
        for part in appliance['parts']:
          await self.store_part_data(part, appliance['model'])

  async def store_appliance_data(self, appliance: Dict):
    try:
      query = self.db_handler.construct_insert_query(
        {**appliance, 'problems': json.dumps(self.associate_problems_parts(appliance['type']))},
        'appliances'
      )
      self.send_to_database(query)
    except Exception as e:
      logging.error(f"Error storing appliance data: {e}")

  async def store_part_data(self, part: Dict, model: str):
    try:
      part['appliance_model'] = model
      query = self.db_handler.construct_insert_query(part, 'parts')
      self.send_to_database(query)
    except Exception as e:
      logging.error(f"Error storing part data: {e}")

  def associate_problems_parts(self, appliance_type: str) -> Dict:
    appliance_type = appliance_type.lower()
    if appliance_type in APPLIANCE_PROBLEMS:
      return APPLIANCE_PROBLEMS[appliance_type]
    return {}

  def send_to_database(self, query: str):
    try:
      self.channel.basic_publish(
        exchange=RMQ_CONFIG['exchange'],
        routing_key='database',
        body=json.dumps({'query': query}),
        properties=pika.BasicProperties(
          delivery_mode=2,
          correlation_id=str(datetime.now().timestamp())
        )
      )
      logging.info("Successfully sent data to database queue")
    except Exception as e:
      logging.error(f"Error sending to RabbitMQ: {e}")

  def cleanup(self):
    if not self.rmq_connection.is_closed:
      self.rmq_connection.close()

async def main():
  scraper = ApplianceWebScraper()
  try:
    await scraper.run_scraping_cycle()
  finally:
    scraper.cleanup()

if __name__ == "__main__":
  asyncio.run(main())