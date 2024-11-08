import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { FaShoppingCart, FaBookmark, FaUserCircle } from 'react-icons/fa';
import { Navbar, Nav, Button, Container, Badge } from 'react-bootstrap';

function Header() {
  const { user, logout } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]); // Cart state to store items added

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="HomePage">
          <img
            src="https://i.ibb.co/3RSppjG/android-chrome-192x192.png"
            alt="Applicareone"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />{' '}
          Applicareone
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="HomePage">Home</Nav.Link>
            <Nav.Link href="About">About</Nav.Link>
            <Nav.Link href="OurServices">Our Services</Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            {/* User login/logout */}
            {user ? (
              <Button variant="outline-primary" onClick={logout} className="me-3">
                <FaUserCircle size={20} className="me-2" />
                {user} (Logout)
              </Button>
            ) : (
              <Nav.Link href="LoginPage">
                <Button variant="outline-primary" className="me-3">
                  <FaUserCircle size={20} className="me-2" />
                  Sign In
                </Button>
              </Nav.Link>
            )}

            {/* Saved Appliances Icon */}
            <Nav.Link href="SavedAppliances">
              <FaBookmark size={25} className="text-dark me-3" />
            </Nav.Link>

            {/* Shopping Cart Icon */}
            <Nav.Link href="ShoppingCart" className="position-relative">
              <FaShoppingCart size={25} className="text-dark" />
              {cartItems.length > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartItems.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
