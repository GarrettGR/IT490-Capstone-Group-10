import React from 'react'
import { Button, Container, Row, Col, Carousel } from 'react-bootstrap'

function HomePage() {
  return (
    <div>
      <Container fluid className="home-page">
        <Row className="justify-content-center" style={{ backgroundColor: "var(--blue_a200_7f)", padding: "5px" }}>
          <Col xs={12} md={6} className="text-center py-5">

            <h1 className="display-4 mb-3" style={{fontWeight:"bold", marginTop:"60px"}}>Welcome to AppliCare</h1>
            <p className="lead mb-4">
              An application that allows maintenance for your household appliances.
            </p>

            <div className="d-flex justify-content-center mb-4">
              <a href="OurServices">
                <Button variant="dark" size="lg" className="me-3">
                  Get Started
                  <img
                    src="https://img.icons8.com/?size=100&id=39969&format=png&color=FFFFFF"
                    alt="Arrow Right"
                    className="arrow_right ms-2"
                  />
                </Button>
              </a>
              <a href="About">
                <Button variant="outline-teal" size="lg" style={{borderColor:"black"}}>
                  How it Works
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/664/664866.png"
                    alt="Arrow Right"
                    className="arrow_right ms-2"
                  />
                </Button>
              </a>
            </div>
          </Col>
          <Col xs={12} md={6} className="text-center py-5">
            <Carousel>
              <Carousel.Item>
                <img src="/images/WasherIMG.png" alt="WasherIMG" className="WasherIMG carousel-img" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="/images/DryerIMG.png" alt="DryerIMG" className="DryerIMG carousel-img" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="/images/FridgeIMG.png" alt="FridgeIMG" className="FridgeIMG carousel-img" />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>

        <Row className="bg-light py-5">
          <Col xs={12} className="text-center">
            <h2 className="h3">Manage your entire catalog of household appliances</h2>
            <p>What are you currently looking for?</p>
          </Col>
        </Row>

        <Row className="bottomCards">
          <Col xs={12} md={4} className="mb-4 text-center">
            <img src="/images/WorkersIMG.png" alt="Contact Workers" className="img-fluid mb-3 bottomCards-img" />
            <h3>Contact Local Workers</h3>
            <p>
              Our worker management software provides full access to contact any local workers.
            </p>
          </Col>
          <Col xs={12} md={4} className="mb-4 text-center">
            <img src="/images/LocaterIMG.png" alt="Parts Locator" className="img-fluid mb-3 bottomCards-img" />
            <h4>Parts Locator</h4>
            <p>
              Our system allows users to find the location of parts they are looking for.
            </p>
          </Col>
          <Col xs={12} md={4} className="mb-4 text-center">
            <img src="/images/CollabIMG.png" alt="Hands-on Instructions" className="img-fluid mb-3 bottomCards-img" />
            <h5>Hands-on Instructions</h5>
            <p>
              Our service also allows users to partake in fixing their appliance on their own.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HomePage
