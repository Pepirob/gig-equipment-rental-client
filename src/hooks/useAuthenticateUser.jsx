import { useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";
import { Spinner } from "react-bootstrap";

export function useAuthenticateUser() {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const authenticateUser = async () => {
    setIsFetching(true);
    try {
      const response = await verifyService();
      setIsloggedIn(true);
      setLoggedUser(response.data);
      setIsFetching(false);
    } catch (error) {
      setIsloggedIn(false);
      setLoggedUser(null);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  if (isFetching === true) {
    return (
      <div className="App">
        <h2>
          {" "}
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </h2>
      </div>
    );
  }

  return { authenticateUser, isLoggedIn, loggedUser };
}
