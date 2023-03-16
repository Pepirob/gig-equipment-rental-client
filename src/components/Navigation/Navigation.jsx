import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./Navigation.css";

function Navigation() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <header class="navigation-header">
      <Navbar bg="primary" as="nav">
        <Container as="ul">
          <Nav.Item as="li">
            <NavLink className={"nav-link"} to="/">
              Home
            </NavLink>
          </Nav.Item>
          {!isLoggedIn && (
            <>
              <Nav.Item as="li">
                <NavLink className={"nav-link"} to="/register">
                  Register
                </NavLink>
              </Nav.Item>
              <Nav.Item as="li">
                <NavLink className={"nav-link"} to="/login">
                  Login
                </NavLink>
              </Nav.Item>
            </>
          )}
          <Nav.Item as="li">
            <NavLink className={"nav-link"} to="/create-equipment">
              Publish your Equipment
            </NavLink>
          </Nav.Item>

          {isLoggedIn && (
            <>
              <Nav.Item as="li">
                <NavLink className={"nav-link"} to="/dashboard">
                  avatar lleva a dashboard
                </NavLink>
              </Nav.Item>
            </>
          )}
        </Container>
      </Navbar>
    </header>
  );
}

export default Navigation;
