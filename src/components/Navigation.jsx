import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navigation() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <nav>
      <Link style={{ marginRight: "1rem" }} to="/">
        Home
      </Link>
      {!isLoggedIn && (
        <>
          <Link style={{ marginRight: "1rem" }} to="/register">
            Register
          </Link>
          <Link style={{ marginRight: "1rem" }} to="/login">
            Login
          </Link>
        </>
      )}

      {isLoggedIn && (
        <>
          <Link style={{ marginRight: "1rem" }} to="/dashboard">
            Dashboard
          </Link>
          <Link style={{ marginRight: "1rem" }} to="/create-equipment">
            Publish your gear
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navigation;
