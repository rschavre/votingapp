// import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useLogoutMutation } from "../slices/usersApiSlice";
// import { logout } from "../slices/authSlice";

const Header = () => {
  //   const { userInfo } = useSelector((state) => state.auth);

  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  //   const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      //   await logoutApiCall().unwrap();
      //   dispatch(logout());
      //   navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  const userInfo = { name: "name" };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <NavLink to="/">
            <Navbar.Brand>Voting</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <NavLink to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </NavLink>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <NavLink to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </NavLink>
                  <NavLink to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </NavLink>
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
