import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';

function CommonIssuesWashers() {
  return (
    <div style={{ backgroundColor: "var(--gray_50)" }}>
      
      <Container className="my-5">
        <div className="bgColor" style={{ backgroundColor: "var(--blue_a200_7f)", borderRadius: "16px", padding: "5px" }}>
          <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>Common Issues: <u>Washers</u></h2>
          <p className="text-center mb-5">Here are a list of possible issues for your washers</p>
        </div>

        <Row className="mb-4">

          <Col md={4} className="mb-3">
            <ul class="list-group">
              <li class="list-group-item">
                <a href="ApplianceParts">Won't Start</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Not Draining Properly</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Excessive Vibrations / Noise</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Not Spinning or Agitating</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Water Leaks</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Unusual Noises</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">No Water</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Overflowing with Water</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Not Cleaning Properly</a>
              </li>
              <li class="list-group-item">
                <a href="ApplianceParts">Door Not Closing</a>
              </li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <Card>
              <Card.Img variant="top" src="https://png.pngtree.com/png-vector/20240403/ourmid/pngtree-washing-machine-isolated-on-transparent-background-png-image_12260985.png" alt="Values" />
            </Card>
          </Col>
          
        </Row>

      </Container>
    </div>
  )
}

export default CommonIssuesWashers
