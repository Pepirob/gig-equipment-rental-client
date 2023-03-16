import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { getUserService } from "../../services/user.services";
import NavBar from "../NavBar/NavBar";
import NavItem from "../NavItem/NavItem";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./NavigationMain.css";

function NavigationMain() {
  const redirect = useNavigate();
  const { isLoggedIn, loggedUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (loggedUser) {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      const response = await getUserService(loggedUser._id);
      setUser(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  const handlePublish = (event) => {
    event.preventDefault();
    redirect("/create-equipment");
  };

  return (
    <NavBar>
      <NavItem path="/">Home</NavItem>
      {!isLoggedIn && (
        <>
          <NavItem path="/register">Register</NavItem>
          <NavItem path="/login">Login</NavItem>
        </>
      )}
      <Nav.Item as="li">
        <Button as="a" variant="success" onClick={handlePublish}>
          Rent your Equipment
        </Button>
      </Nav.Item>
      {isLoggedIn && user && (
        <>
          <NavItem path="/dashboard">
            <div className="nav-avatar">
              {user && (
                <img
                  className="nav-avatar-pic"
                  src={user.img}
                  alt={`A pic of ${user.name}`}
                />
              )}
            </div>
          </NavItem>
        </>
      )}
    </NavBar>
  );
}

export default NavigationMain;
