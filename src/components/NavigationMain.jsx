import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import NavBar from "./NavBar/NavBar";
import NavItem from "./NavItem/NavItem";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const redirect = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const handlePublish = (event) => {
    event.preventDefault();
    redirect("/create-equipment");
  };

  return (
    <NavBar>
      <NavItem path="/">Home</NavItem>
      {!isLoggedIn && (
        <>
          <NavItem path="/register">Register</NavItem>
          <NavItem path="/login">Login</NavItem>
        </>
      )}
      <Nav.Item as="li">
        <Button as="NavLink" variant="success" onClick={handlePublish}>
          Rent your Equipment
        </Button>
      </Nav.Item>
      {isLoggedIn && (
        <>
          <NavItem path="/dashboard">avatar lleva a dashboard</NavItem>
        </>
      )}
    </NavBar>
  );
}

export default Navigation;
