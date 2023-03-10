import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <Link style={{ marginRight: "1rem" }} to="/">
        Home
      </Link>
      <Link style={{ marginRight: "1rem" }} to="/register">
        Register
      </Link>
    </nav>
  );
}

export default Navigation;
