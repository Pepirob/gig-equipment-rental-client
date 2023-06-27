
import { Link, } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import { useLogout } from "../hooks/useLogout";

function Dashboard() {
  const { loggedUser, handleLogout } = useLogout()

  return (
    <>
      <NavBar>
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
