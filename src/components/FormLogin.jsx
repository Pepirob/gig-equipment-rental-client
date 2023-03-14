import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { loginService } from "../services/auth.services";

function FormLogin() {
  const redirect = useNavigate();

  const { authenticateUser } = useContext(AuthContext);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleInput = (event) => {
    if (event.target.name === "identifier") {
      setIdentifier(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setIsFetching(true);
      const response = await loginService({ identifier, password });

      localStorage.setItem("authToken", response.data.authToken);

      authenticateUser();

      setIsFetching(false);
      redirect("/");
    } catch (error) {
      setIsFetching(false);

      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        redirect("/error");
      }
    }
  };
  return (
    <>
      <form>
        <label htmlFor="identifier">Email / Username</label>
        <input
          type="text"
          name="identifier"
          value={identifier}
          onChange={handleInput}
          autoComplete="username"
        />
        <br />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInput}
          autoComplete="current-password"
        />
        <br />
        <br />

        {errorMessage.length ? <p>{errorMessage}</p> : null}
        <button onClick={handleLogin} disabled={isFetching}>
          LOGIN
        </button>
      </form>
    </>
  );
}

export default FormLogin;
