import { useState } from "react";
import { loginService } from "../services/auth.services";

function FormLogin() {
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

  const handleSubmit = async () => {
    try {
      setIsFetching(true);
      await loginService({ identifier, password });
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      setErrorMessage(error.response.data.errorMessage);
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
        <button onClick={handleSubmit} disabled={isFetching}>
          LOGIN
        </button>
      </form>
    </>
  );
}

export default FormLogin;
