import React, { useState } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function OurServices() {
  const navigate = useNavigate();

  // Initialize 'services' with an array of services
  const [services, setServices] = useState([
    { id: 1, name: 'Washers', image: '/images/WasherIMG.png' },
    { id: 2, name: 'Dryers', image: '/images/DryerIMG.png' },
    { id: 3, name: 'Refrigerators', image: '/images/FridgeIMG.png' },
    { id: 4, name: 'Dishwashers', image: '/images/DishWashIMG.png' },
    { id: 5, name: 'Microwaves', image: '/images/MicroIMG.png' },
    { id: 6, name: 'Ovens', image: '/images/OvenIMG.png' },
  ]);

  const [filteredServices, setFilteredServices] = useState(services); // State for filtered services

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = services.filter(service =>
      service.name.toLowerCase().includes(query)
    );
    setFilteredServices(filtered);
  };

  const handleCardClick = (serviceName) => {
    navigate(`/CommonIssues`); // Navigate to the service's common issues page with service name as a parameter
  };

  return (
    <Container>
      {/* Search Bar */}
      <Row className="my-4" style={{backgroundColor: "var(--blue_a200_7f)", padding: "30px", borderRadius: "20px"}}>
        <Col md={{ span: 8 }}>
          <Form.Control
            type="text"
            placeholder="What services are you looking for?"
            onChange={handleSearch} // Handle search input change
            style={{ border: '2px solid black', padding: "10px", borderRadius: "5px", backgroundColor: "white" }}
          />
        </Col>
      </Row>

      {/* Render filtered services */}
      <Row>
        {filteredServices.map(service => (
          <Col key={service.id} md={4} className="mb-4">
            <Card onClick={() => handleCardClick(service.name)} style={{ cursor: 'pointer' }}>
              <Card.Img variant="top" src={service.image} alt={service.name} />
              <Card.Body>
                <center>
                  <Card.Title>{service.name}</Card.Title>
                </center>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default OurServices;
