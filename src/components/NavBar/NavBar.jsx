import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logoIcon from "./CoverGig_IconInv.png";
import "./NavBar.css";

function NavBar(props) {
  return (
    <header className="navbar-header bg-primary">
      <Navbar as="nav" className="container-sm">
        <NavLink className="navbar-homelink" to="/">
          <img
            height={32}
            width={32}
            src={logoIcon}
            alt="cogerGig icon"
            title="Navigate to HOme page"
          />
        </NavLink>
        <Container as="ul">{props.children}</Container>
      </Navbar>
    </header>
  );
}

export default NavBar;
