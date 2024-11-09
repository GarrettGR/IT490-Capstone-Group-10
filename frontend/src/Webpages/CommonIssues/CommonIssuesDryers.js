import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';

function CommonIssuesDryers() {
  return (
    <div style={{ backgroundColor: "var(--gray_50)" }}>
      
      <Container className="my-5">
        <div className="bgColor" style={{ backgroundColor: "var(--blue_a200_7f)", borderRadius: "16px", padding: "5px" }}>
          <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>Common Issues: <u>Dryers</u></h2>
          <p className="text-center mb-5">Here are a list of possible issues for your dryer</p>
        </div>

        <Row className="mb-4">

          <Col md={4} className="mb-3">
            <ul class="list-group">
              <li class="list-group-item">
                <a href="#">Not Heating Up</a>
              </li>
              <li class="list-group-item">
                <a href="#">Takes Too Long to Dry</a>
              </li>
              <li class="list-group-item">
                <a href="#">Drum Not Spinning</a>
              </li>
              <li class="list-group-item">
                <a href="#">Won't Start</a>
              </li>
              <li class="list-group-item">
                <a href="#">Excessive Noise</a>
              </li>
              <li class="list-group-item">
                <a href="#">Overheating</a>
              </li>
              <li class="list-group-item">
                <a href="#">Shuts Off Mid-Cycle</a>
              </li>
              <li class="list-group-item">
                <a href="#">Burning Smell</a>
              </li>
              <li class="list-group-item">
                <a href="#">Clothes Come Out Wrinkled</a>
              </li>
              <li class="list-group-item">
                <a href="#">Won't Turn Off</a>
              </li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <Card>
              <Card.Img variant="top" src="https://www.pngall.com/wp-content/uploads/12/Clothes-Dryer-Machine-PNG-Photo.png" alt="Values" />
            </Card>
          </Col>
          
        </Row>

      </Container>
    </div>
  )
}

export default CommonIssuesDryers
