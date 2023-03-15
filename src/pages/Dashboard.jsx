import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

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
      <header>
        <Link to="/">Home</Link>
        <span style={{ color: "red" }} onClick={handleLogout}>
          Logout
        </span>
      </header>
      <main>
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
      </main>
    </>
  );
}

export default Dashboard;
