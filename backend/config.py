import os

RMQ_CONFIG = {
  'credentials': {
    'username': 'admin',
    'password': os.environ['rmq_passwd']
  },
  'host': os.environ['rmq_ip'],
  'exchange': 'applicare',
  'queue': 'backend_queue'
}

SCRAPING_CONFIG = {
  'rate_limit': 1, # seconds between requests
  'headers': {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  },
  'retail_urls': {
    'homedepot': 'https://www.homedepot.com/b/Appliances',
    'lowes': 'https://www.lowes.com/l/shop/appliances'
  },
  'parts_urls': {
    'repairclinic': 'https://www.repairclinic.com',
    'partselect': 'https://www.partselect.com',
    'appliancepartspros': 'https://www.appliancepartspros.com'
  },
  'manufacturer_urls': {
    'whirlpool': 'https://www.whirlpoolparts.com/',
    'lg': 'https://lgparts.com/',
    'samsung': 'https://samsungparts.com/', # 'https://www.samsung.com/us/support/',
    'ge': 'https://www.geappliances.com/ge/parts/'
  }
}

APPLIANCE_PROBLEMS = {
  'washer': {
    'drum': ['bearing', 'belt', 'motor', 'seal'],
    'control': ['panel', 'board', 'buttons', 'display'],
    'water_system': ['pump', 'hose', 'valve', 'filter'],
    'door': ['lock', 'seal', 'hinge', 'handle']
  },
  'dryer': {
    'heating': ['element', 'thermostat', 'fuse', 'gas_valve'],
    'airflow': ['vent', 'blower', 'duct', 'filter'],
    'drum': ['belt', 'roller', 'glide', 'bearing'],
    'control': ['panel', 'board', 'timer', 'switch']
  },
  'refrigerator': {
    'cooling': ['compressor', 'evaporator', 'condenser', 'fan'],
    'defrost': ['heater', 'timer', 'thermostat', 'sensor'],
    'ice_maker': ['motor', 'valve', 'mold', 'ejector'],
    'sealing': ['gasket', 'door_seal', 'hinge', 'closure']
  }
}

APPLIANCE_FILTERS = { # demo has limited scope
  'types': ['washer', 'dryer', 'refrigerator'],
  'brands': ['whirlpool', 'lg', 'samsung', 'ge'] #, 'frigidaire', 'maytag']
}

DB_CONFIG = {
  'select_appliances': '''
    SELECT brand, model, type 
    FROM appliances 
    WHERE type IN (%s) AND brand IN (%s)
  ''',
  'insert_appliance': '''
    INSERT INTO appliances (brand, model, type, source, url) 
    VALUES (%(brand)s, %(model)s, %(type)s, %(source)s, %(url)s)
    ON DUPLICATE KEY UPDATE 
    source = VALUES(source), 
    url = VALUES(url)
  ''',
  'insert_part': '''
    INSERT INTO parts 
    (part_name, part_number, price, type, problem_area, source, url, appliance_model) 
    VALUES 
    (%(name)s, %(part_number)s, %(price)s, %(type)s, %(problem_area)s, %(source)s, %(url)s, %(appliance_model)s)
  '''
}

TEST_CONFIG = { # for testing purposes
  'enabled': True,
  'output_file': 'scraper_test_output.json',
  'mock_db_response': {
    'results': [
      {'brand': 'whirlpool', 'model': 'WTW5000DW', 'type': 'washer'},
      {'brand': 'lg', 'model': 'WM3900HWA', 'type': 'washer'},
      {'brand': 'samsung', 'model': 'RF28R7551SR', 'type': 'refrigerator'}
    ]
  }
}