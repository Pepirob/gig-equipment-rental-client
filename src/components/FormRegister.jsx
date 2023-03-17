import { useState } from "react";
import { Button, Form } from "react-bootstrap";
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
      case "location":
        setLocation(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        setUsername(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsFetching(true);

      await signupService({ email, username, location, phoneNumber, password });

      setIsFetching(false);
      redirect("/login");
    } catch (error) {
      setIsFetching(false);
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={handleInput}
            autoComplete="username"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleInput}
            autoComplete="email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="location">Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={location}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="phoneNumber">Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            pattern="^\+[1-9]\d{1,14}$"
            value={phoneNumber}
            onChange={handleInput}
            autoComplete="tel"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handleInput}
            autoComplete="new-password"
          />
        </Form.Group>

        {errorMessage.length ? <p>{errorMessage}</p> : null}
        <Button
          variant="success"
          size="lg"
          onClick={handleSubmit}
          disabled={isFetching}
        >
          SIGNUP
        </Button>
      </Form>
    </>
  );
}

export default FormRegister;
