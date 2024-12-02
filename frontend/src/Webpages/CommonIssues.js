import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Accordion } from 'react-bootstrap';

function CommonIssues() {
    return (
      <div style={{ backgroundColor: "var(--gray_50)" }}>
        <Container className="my-5">
  
          <div className="bgColor" style={{ backgroundColor: "var(--blue_a200_7f)", borderRadius: "16px", padding: "20px" }}>
            <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>Common Issues</h2>
            <p className="text-center mb-5">
              This section lists all the common problems you appliance might have.
            </p>
          </div>

            <h1 id='washer' style={{marginTop: "50px"}}>Washers</h1>

                <Accordion defaultActiveKey="0">
                    {/* First Accordion Item */}
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><strong>Door Won't Open</strong></Accordion.Header>
                        <Accordion.Body>
                            Youtube Tutorial: <a href="https://www.youtube.com/watch?v=bQdniahf0bU" target='_blank'>Click Here</a><br /> 
                            Service Wokers Near Me: <a href="https://www.google.com/maps/search/washer+fix+services/@40.6322614,-74.321101,12z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D" target='_blank'>Click Here</a><br />
                            Parts Used / Needed:
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Second Accordion Item */}
                    <Accordion.Item eventKey="1">
                        <Accordion.Header><strong>Not Washing Properly</strong></Accordion.Header>
                        <Accordion.Body>
                            Youtube Tutorial: <a href="https://www.youtube.com/watch?v=bQdniahf0bU" target='_blank'>Click Here</a><br /> 
                            Service Wokers Near Me: <a href="https://www.google.com/maps/search/washer+fix+services/@40.6322614,-74.321101,12z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D" target='_blank'>Click Here</a><br />
                            Parts Used / Needed:
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Third Accordion Item */}
                    <Accordion.Item eventKey="2">
                        <Accordion.Header><strong>Won't Turn On</strong></Accordion.Header>
                        <Accordion.Body>
                            Youtube Tutorial: <a href=" " target='_blank'>Click Here</a><br /> 
                            Service Wokers Near Me: <a href=" " target='_blank'>Click Here</a><br />
                            Parts Used / Needed:
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>

                <h1 id='dryer' style={{marginTop: "50px"}}>Dryers</h1>

                <Accordion defaultActiveKey="0">
                    {/* First Accordion Item */}
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><strong>Door Won't Open</strong></Accordion.Header>
                        <Accordion.Body>
                            Youtube Tutorial: <a href=" " target='_blank'>Click Here</a><br /> 
                            Service Wokers Near Me: <a href=" " target='_blank'>Click Here</a><br />
                            Parts Used / Needed:
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Second Accordion Item */}
                    <Accordion.Item eventKey="1">
                        <Accordion.Header><strong>Not Drying Properly</strong></Accordion.Header>
                        <Accordion.Body>
                            Youtube Tutorial: <a href=" " target='_blank'>Click Here</a><br /> 
                            Service Wokers Near Me: <a href=" " target='_blank'>Click Here</a><br />
                            Parts Used / Needed:
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Third Accordion Item */}
                    <Accordion.Item eventKey="2">
                        <Accordion.Header><strong>Won't Turn On</strong></Accordion.Header>
                        <Accordion.Body>
                            Youtube Tutorial: <a href=" " target='_blank'>Click Here</a><br /> 
                            Service Wokers Near Me: <a href=" " target='_blank'>Click Here</a><br />
                            Parts Used / Needed:
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>
  
        </Container>
      </div>
    )
  }
  
  export default CommonIssues