import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';

function CommonIssuesOven() {
  return (
    <div style={{ backgroundColor: "var(--gray_50)" }}>
      
      <Container className="my-5">
        <div className="bgColor" style={{ backgroundColor: "var(--blue_a200_7f)", borderRadius: "16px", padding: "5px" }}>
          <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>Common Issues: <u>Ovens</u></h2>
          <p className="text-center mb-5">Here are a list of possible issues for your Oven</p>
        </div>

        <Row className="mb-4">

          <Col md={4} className="mb-3">
            <ul class="list-group">
              <li class="list-group-item">
                <a href="ApplianceParts">Not Heating</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Uneven Cooking</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Won't Turn On</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Temperature Not Accurate</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Door Won't Close</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Light Not Working</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Making Unusual Noises</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Burning Smell During Operation</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Gas Oven Won't Ignite</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Shuts Off Mid Use</a>
              </li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <Card>
              <Card.Img variant="top" src="https://www.fulgor-milano.com/sites/default/files/styles/product_grid_320x320_/public/2022-12/F6PDF364GS1%20-%20Product%20Grid.png?itok=YAPNiVYv" alt="Values" />
            </Card>
          </Col>
          
        </Row>

      </Container>
    </div>
  )
}

export default CommonIssuesOven
