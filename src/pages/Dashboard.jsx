import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavItem";
function Dashboard() {
  const redirect = useNavigate();
  const { authenticateUser, loggedUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    authenticateUser();

    redirect("/");
  };

  return (
    <>
      <NavBar>
        <NavItem path="/">Home</NavItem>
        <span style={{ color: "red" }} onClick={handleLogout}>
          Logout
        </span>
      </NavBar>
      <Layout>
        <h1>Dashboard</h1>
        <h2>{loggedUser.username}</h2>
        <section>
          <Link to="/my-equipment">Equipment</Link>
          <br />
          <br />
          <Link to="/my-transactions">Transactions</Link>
          <br />
          <br />
          <Link to="/profile">Profile</Link>
        </section>
      </Layout>
    </>
  );
}

export default Dashboard;
