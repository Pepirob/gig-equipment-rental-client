import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./NavBar.css";

function NavBar(props) {
  return (
    <header class="navbar-header">
      <Navbar bg="primary" as="nav">
        <Container as="ul">{props.children}</Container>
      </Navbar>
    </header>
  );
}

export default NavBar;
