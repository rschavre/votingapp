import {  Link, useNavigate } from "react-router";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useEffect } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import useLogout from "../hooks/useLogout.jsx";
import { useAuth } from "../hooks/useAuth.jsx";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const { logout } = useLogout();

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            Voting
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <NavDropdown title={user.email} id="username">
                  {/* <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item> */}
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    <FaUserPlus /> Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
