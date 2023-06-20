import { createContext } from "react";

import { useAuthenticateUser } from "../hooks/useAuthenticateUser";

const AuthContext = createContext();

function AuthWrapper(props) {
  const { authenticateUser, isLoggedIn, loggedUser } = useAuthenticateUser();
  return (
    <AuthContext.Provider value={{ authenticateUser, isLoggedIn, loggedUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
