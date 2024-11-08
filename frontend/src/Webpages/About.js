import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function About () {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">About Us</h2>
      <p className="text-center mb-5">
        We are a team of dedicated professionals committed to providing the best services and solutions for our clients.
      </p>

      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/300" alt="Mission" />
            <Card.Body>
              <Card.Title>Our Mission</Card.Title>
              <Card.Text>
                Our mission is to deliver innovative solutions that empower our clients and drive their success.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/300" alt="Vision" />
            <Card.Body>
              <Card.Title>Our Vision</Card.Title>
              <Card.Text>
                We envision a world where our solutions help businesses to excel in their industry.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/300" alt="Values" />
            <Card.Body>
              <Card.Title>Our Values</Card.Title>
              <Card.Text>
                Integrity, innovation, and customer satisfaction are at the heart of everything we do.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="text-center">
        <Col>
          <h4>Meet Our Team</h4>
          <p>Our team consists of experts in various fields who bring their skills and experience to the table.</p>
        </Col>
      </Row>

      <Row>
        {/* Example Team Member Cards */}
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Team Member" />
            <Card.Body>
              <Card.Title>John Doe</Card.Title>
              <Card.Text>CEO & Founder</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Team Member" />
            <Card.Body>
              <Card.Title>Jane Smith</Card.Title>
              <Card.Text>Head of Development</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Team Member" />
            <Card.Body>
              <Card.Title>Alex Brown</Card.Title>
              <Card.Text>Marketing Lead</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
