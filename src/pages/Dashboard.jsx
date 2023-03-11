import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Dashboard() {
  const redirect = useNavigate();
  const { authenticateUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    authenticateUser();

    redirect("/");
  };

  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <span onClick={handleLogout}>Logout</span>
      </header>
      <main>
        <h1>Dashboard</h1>
        <Link to="/my-equipment">Equipment</Link>
      </main>
    </>
  );
}

export default Dashboard;
