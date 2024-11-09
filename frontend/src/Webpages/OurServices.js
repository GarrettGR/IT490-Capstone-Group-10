import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function OurServices() {
  const navigate = useNavigate();

  // Initialize 'services' with an array of services (can be fetched from an API or predefined)
  const [services, setServices] = useState([
    { id: 1, name: 'Washers', description: 'Won\'t start, Not draining properly, Excessive vibration/noise', image: 'https://png.pngtree.com/png-vector/20240403/ourmid/pngtree-washing-machine-isolated-on-transparent-background-png-image_12260985.png', route: '/CommonIssuesWashers' },
    { id: 2, name: 'Dryers', description: 'Not heating up, Takes too long to dry, Drum not spinning', image: 'https://www.pngall.com/wp-content/uploads/12/Clothes-Dryer-Machine-PNG-Photo.png', route: '/CommonIssuesDryers' },
    { id: 3, name: 'Refrigerators', description: 'Not cooling properly, Leaking water, Ice maker not working', image: 'https://i.pinimg.com/originals/83/1c/03/831c0321a1f22eb4a37a36145493a909.png' },
    { id: 4, name: 'Dishwashers', description: 'Not cleaning dishes properly, Water not draining, Leaks during operation', image: 'https://png.pngtree.com/png-clipart/20231104/original/pngtree-realistic-dishwasher-png-image_13504893.png' },
    { id: 5, name: 'Microwaves', description: 'Not heating food, Display not working, Sparks inside the microwave', image: 'https://pngimg.com/d/microwave_PNG15734.png' },
    { id: 6, name: 'Ovens', description: 'Uneven cooking/baking, Oven not heating to the right temperature, Oven door won\'t close properly', image: 'https://www.fulgor-milano.com/sites/default/files/styles/product_grid_320x320_/public/2022-12/F6PDF364GS1%20-%20Product%20Grid.png?itok=YAPNiVYv' },
  ]);
  const [filteredServices, setFilteredServices] = useState(services); // State for filtered services

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = services.filter(service =>
      service.name.toLowerCase().includes(query)
    );
    setFilteredServices(filtered);
  };

  return (
    <Container>
      {/* Search Bar */}
      <Row className="my-4">
        <Col md={{ span: 8}}>
          <Form.Control
            type="text"
            placeholder="What services are you looking for?"
            onChange={handleSearch} // Handle search input change
            style={{ border: '2px solid black', padding: "10px", borderRadius: "5px" }}
          />
        </Col>
      </Row>

      {/* Render filtered services */}
      <Row>
        {filteredServices.map(service => (
          <Col key={service.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={service.image} alt={service.name} />
              <Card.Body>
                <Card.Title>{service.name}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
                <Button variant="outline-primary" onClick={() => navigate(service.route)}>Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default OurServices;
