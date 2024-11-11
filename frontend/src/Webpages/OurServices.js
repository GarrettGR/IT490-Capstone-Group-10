import React, { useState } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function OurServices() {
  const navigate = useNavigate();

  // Initialize 'services' with an array of services
  const [services, setServices] = useState([
    { id: 1, name: 'Washers', image: 'https://png.pngtree.com/png-vector/20240403/ourmid/pngtree-washing-machine-isolated-on-transparent-background-png-image_12260985.png' },
    { id: 2, name: 'Dryers', image: 'https://www.pngall.com/wp-content/uploads/12/Clothes-Dryer-Machine-PNG-Photo.png' },
    { id: 3, name: 'Refrigerators', image: 'https://i.pinimg.com/originals/83/1c/03/831c0321a1f22eb4a37a36145493a909.png' },
    { id: 4, name: 'Dishwashers', image: 'https://png.pngtree.com/png-clipart/20231104/original/pngtree-realistic-dishwasher-png-image_13504893.png' },
    { id: 5, name: 'Microwaves', image: 'https://pngimg.com/d/microwave_PNG15734.png' },
    { id: 6, name: 'Ovens', image: 'https://www.fulgor-milano.com/sites/default/files/styles/product_grid_320x320_/public/2022-12/F6PDF364GS1%20-%20Product%20Grid.png?itok=YAPNiVYv' },
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
    navigate(`CommonIssues.js`); // Navigate to the service's common issues page with service name as a parameter
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
