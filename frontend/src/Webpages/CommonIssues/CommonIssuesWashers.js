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
                <a href="#">Won't Start</a>
              </li>
              <li class="list-group-item">
                <a href="#">Not Draining Properly</a>
              </li>
              <li class="list-group-item">
                <a href="#">Excessive Vibrations / Noise</a>
              </li>
              <li class="list-group-item">
                <a href="#">Not Spinning or Agitating</a>
              </li>
              <li class="list-group-item">
                <a href="#">Water Leaks</a>
              </li>
              <li class="list-group-item">
                <a href="#">Unusual Noises</a>
              </li>
              <li class="list-group-item">
                <a href="#">No Water</a>
              </li>
              <li class="list-group-item">
                <a href="#">Overflowing with Water</a>
              </li>
              <li class="list-group-item">
                <a href="#">Not Cleaning Properly</a>
              </li>
              <li class="list-group-item">
                <a href="#">Door Not Closing</a>
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
