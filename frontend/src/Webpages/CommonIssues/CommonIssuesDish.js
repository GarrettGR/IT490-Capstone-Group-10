import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';

function CommonIssuesDish() {
  return (
    <div style={{ backgroundColor: "var(--gray_50)" }}>
      
      <Container className="my-5">
        <div className="bgColor" style={{ backgroundColor: "var(--blue_a200_7f)", borderRadius: "16px", padding: "5px" }}>
          <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>Common Issues: <u>Dishwashers</u></h2>
          <p className="text-center mb-5">Here are a list of possible issues for your Dishwasher</p>
        </div>

        <Row className="mb-4">

          <Col md={4} className="mb-3">
            <ul class="list-group">
              <li class="list-group-item">
                <a href="ApplianceParts">Not Draining Water</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Dishes not Cleaning</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Not Starting</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Leaking Water</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Not Filling with Water</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Unusual Noises</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Not Drying Dishes Properly</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Bad Smells</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Detergent Not Dispensing</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Dishwasher Door Won't Close</a>
              </li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <Card>
              <Card.Img variant="top" src="https://png.pngtree.com/png-clipart/20231104/original/pngtree-realistic-dishwasher-png-image_13504893.png" alt="Values" />
            </Card>
          </Col>
          
        </Row>

      </Container>
    </div>
  )
}

export default CommonIssuesDish
