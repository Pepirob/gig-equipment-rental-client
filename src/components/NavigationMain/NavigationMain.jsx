import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { getUserService } from "../../services/user.services";
import NavBar from "../NavBar/NavBar";
import NavItem from "../NavItem/NavItem";
import { useNavigate } from "react-router-dom";
import NavigationCta from "../NavigationCta";
import NavigationAvatar from "../NavigationAvatar";

function NavigationMain() {
  const redirect = useNavigate();
  const { isLoggedIn, loggedUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (loggedUser) {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      const response = await getUserService(loggedUser._id);
      setUser(response.data);
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <NavBar>
      {/* <NavItem path="/">Home</NavItem> */}
      {!isLoggedIn && (
        <>
          <NavItem path="/register">Register</NavItem>
          <NavItem path="/login">Login</NavItem>
        </>
      )}
      <NavigationCta />
      {isLoggedIn && user && <NavigationAvatar user={user} />}
    </NavBar>
  );
}

export default NavigationMain;
