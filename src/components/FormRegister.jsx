import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../services/auth.services";

function FormRegister() {
  const redirect = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "email":
        setEmail(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsFetching(true);

      await signupService({ email, username, location, phoneNumber, password });

      setIsFetching(false);
      redirect("/");
    } catch (error) {
      setIsFetching(false);
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  return (
    <>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleInput}
          autoComplete="email"
        />
        <br />
        <br />
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleInput}
          autoComplete="username"
        />
        <br />
        <br />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleInput}
        />
        <br />
        <br />
        <label htmlFor="phoneNumber">Phone</label>
        <input
          type="tel"
          name="phoneNumber"
          pattern="^\+[1-9]\d{1,14}$"
          value={phoneNumber}
          onChange={handleInput}
          autoComplete="tel"
        />
        <br />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInput}
          autoComplete="new-password"
        />
        <br />
        <br />
        {errorMessage.length ? <p>{errorMessage}</p> : null}
        <button onClick={handleSubmit} disabled={isFetching}>
          SUBMIT
        </button>
      </form>
    </>
  );
}

export default FormRegister;
