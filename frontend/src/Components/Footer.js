import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="footer bg-light py-3 mt-auto">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={2} className="mb-2">
            <a href="#" className="text-dark text-decoration-none">
              Help Center
            </a>
          </Col>
          <Col md={2} className="mb-2">
            <a href="#" className="text-dark text-decoration-none">
              Terms of Service
            </a>
          </Col>
          <Col md={2} className="mb-2">
            <a href="#" className="text-dark text-decoration-none">
              Privacy Policy
            </a>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center mt-2">
            <p className="mb-0 text-muted">
              &copy; {new Date().getFullYear()} IT490-Group-9. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
