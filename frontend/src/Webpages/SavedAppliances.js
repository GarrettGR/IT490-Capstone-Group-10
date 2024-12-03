import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function SavedAppliances() {
  return (
    <div>
      <Container className="my-5">

        <div className="bgColor" style={{ backgroundColor: "var(--blue_a200_7f)", borderRadius: "16px", padding: "20px" }}>
          <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>Saved Appliances</h2>
          <p className="text-center mb-5">
            This section habits all of your saved appliances.
          </p>
        </div>

      </Container>
    </div>
  )
}

export default SavedAppliances
