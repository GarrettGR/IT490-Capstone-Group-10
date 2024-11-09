import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';

function CommonIssuesFridge() {
  return (
    <div style={{ backgroundColor: "var(--gray_50)" }}>
      
      <Container className="my-5">
        <div className="bgColor" style={{ backgroundColor: "var(--blue_a200_7f)", borderRadius: "16px", padding: "5px" }}>
          <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>Common Issues: <u>Refrigerators</u></h2>
          <p className="text-center mb-5">Here are a list of possible issues for your Refrigerator</p>
        </div>

        <Row className="mb-4">

          <Col md={4} className="mb-3">
            <ul class="list-group">
              <li class="list-group-item">
                <a href="#">Fridge Not Cooling</a>
              </li>
              <li class="list-group-item">
                <a href="#">Freezer Not Freezing</a>
              </li>
              <li class="list-group-item">
                <a href="#">Water Leakage</a>
              </li>
              <li class="list-group-item">
                <a href="#">Excessive Frost Build-Up</a>
              </li>
              <li class="list-group-item">
                <a href="#">Strange Noises</a>
              </li>
              <li class="list-group-item">
                <a href="#">Ice Maker Not Working</a>
              </li>
              <li class="list-group-item">
                <a href="#">Water Dispensor Not Working</a>
              </li>
              <li class="list-group-item">
                <a href="#">Inconsistant Temperature</a>
              </li>
              <li class="list-group-item">
                <a href="#">Doors Not Sealing Properly</a>
              </li>
              <li class="list-group-item">
                <a href="#">Interior Light Not Working</a>
              </li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <Card>
              <Card.Img variant="top" src="https://i.pinimg.com/originals/83/1c/03/831c0321a1f22eb4a37a36145493a909.png" alt="Values" />
            </Card>
          </Col>
          
        </Row>

      </Container>
    </div>
  )
}

export default CommonIssuesFridge
