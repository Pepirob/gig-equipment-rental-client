import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import NavBar from "./NavBar/NavBar";
import NavItem from "./NavItem/NavItem";

function Navigation() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <NavBar>
      <NavItem path="/">Home</NavItem>
      {!isLoggedIn && (
        <>
          <NavItem path="/register">Register</NavItem>
          <NavItem path="/login">Login</NavItem>
        </>
      )}
      <NavItem path="/create-equipment">Publish your Equipment</NavItem>
      {isLoggedIn && (
        <>
          <NavItem path="/dashboard">avatar lleva a dashboard</NavItem>
        </>
      )}
    </NavBar>
  );
}

export default Navigation;
