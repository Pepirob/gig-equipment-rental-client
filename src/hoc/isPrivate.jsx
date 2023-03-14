import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context.js";

function IsPrivate(props) {
  const { isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default IsPrivate;
