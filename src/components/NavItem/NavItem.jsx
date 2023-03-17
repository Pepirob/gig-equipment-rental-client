import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "./NavItem.css";

function NavItem({ path, children }) {
  return (
    <Nav.Item as="li">
      <NavLink className={"nav-link"} to={path}>
        {children}
      </NavLink>
    </Nav.Item>
  );
}

export default NavItem;
