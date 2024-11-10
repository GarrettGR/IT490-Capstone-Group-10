import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';

function CommonIssuesMicro() {
  return (
    <div style={{ backgroundColor: "var(--gray_50)" }}>
      
      <Container className="my-5">
        <div className="bgColor" style={{ backgroundColor: "var(--blue_a200_7f)", borderRadius: "16px", padding: "5px" }}>
          <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>Common Issues: <u>Microwaves</u></h2>
          <p className="text-center mb-5">Here are a list of possible issues for your Microwave</p>
        </div>

        <Row className="mb-4">

          <Col md={4} className="mb-3">
            <ul class="list-group">
              <li class="list-group-item">
                <a href="ApplianceParts">Not Heating</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Buttons Not Working</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Plate Not Spinning</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Makes Strange Noises</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Door Won't Close</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Sparks Inside the Microwave</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Light Not Working</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Display Not Working</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Keeps Blowing Fuses</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Won't Turn On</a>
              </li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <Card>
              <Card.Img variant="top" src="https://pngimg.com/d/microwave_PNG15734.png" alt="Values" />
            </Card>
          </Col>
          
        </Row>

      </Container>
    </div>
  )
}

export default CommonIssuesMicro
