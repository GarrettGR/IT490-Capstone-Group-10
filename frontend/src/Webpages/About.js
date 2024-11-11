import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., sending to a server or logging it
    console.log('Form submitted', formData);
  };

  return (
    <div style={{ backgroundColor: "var(--gray_50)" }}>
      <Container className="my-5">
        <div className="bgColor" style={{ backgroundColor: "var(--blue_a200_7f)", borderRadius: "16px", padding: "20px" }}>
          <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>About Us</h2>
          <p className="text-center mb-5">
            We are a team of dedicated professionals committed to providing the best services and solutions for our clients.
          </p>
        </div>

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
            <div style={{ backgroundColor: "var(--blue_a200_7f)", borderRadius: "16px", padding: "20px" }}>
              <h4 style={{ fontWeight: "bold" }}>Meet Our Team</h4>
              <p>Our team consists of experts in various fields who bring their skills and experience to the table.</p>
            </div>
          </Col>
        </Row>

        <Row>
          {/* Team Member Cards */}
          <Col md={3} className="mb-3">
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Team Member" />
              <Card.Body>
                <Card.Title>Garrett Gonzalez-Rivas</Card.Title>
                <Card.Text>Backend</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} className="mb-3">
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Team Member" />
              <Card.Body>
                <Card.Title>Shakawath Hussain</Card.Title>
                <Card.Text>Frontend</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} className="mb-3">
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Team Member" />
              <Card.Body>
                <Card.Title>Yashi Rastogi</Card.Title>
                <Card.Text>RabbitMQ</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} className="mb-3">
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Team Member" />
              <Card.Body>
                <Card.Title>Jasmin Rutter</Card.Title>
                <Card.Text>Database</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Contact Form Section */}
        <Row className="my-5">
          <Col>
            <div style={{ backgroundColor: "var(--blue_a200_7f)", borderRadius: "16px", padding: "20px" }}>
              <h4 className="text-center" style={{ fontWeight: "bold" }}>Contact Us</h4>
              <p className="text-center">Have any questions? We'd love to hear from you!</p>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        backgroundColor: "#f4f6f9", // Light gray background for inputs
                        borderColor: "#5c6bc0", // Darker blue border
                        borderRadius: "8px", // Rounded corners for inputs
                      }}
                    />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        backgroundColor: "#f4f6f9", // Light gray background for inputs
                        borderColor: "#5c6bc0", // Darker blue border
                        borderRadius: "8px", // Rounded corners for inputs
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      style={{
                        backgroundColor: "#f4f6f9", // Light gray background for inputs
                        borderColor: "#5c6bc0", // Darker blue border
                        borderRadius: "8px", // Rounded corners for inputs
                      }}
                    />
                  </Col>
                </Row>

                <Button
                  variant="dark"
                  type="submit"
                  className="w-100 mt-3"
                  style={{
                    backgroundColor: "#5c6bc0", // Custom background color for the submit button
                    border: "none",
                    borderRadius: "8px", // Rounded corners
                    padding: "10px", // Add padding to the button
                  }}
                >
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
