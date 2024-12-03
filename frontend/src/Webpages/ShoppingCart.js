import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function ShoppingCart() {
  return (
    <div>
      <Container className="my-5">

        <div className="bgColor" style={{ backgroundColor: "var(--blue_a200_7f)", borderRadius: "16px", padding: "20px" }}>
          <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>Shopping Cart</h2>
          <p className="text-center mb-5">
            This section habits all of your items you with to purchase.
          </p>
        </div>

      </Container>
    </div>
  )
}

export default ShoppingCart
