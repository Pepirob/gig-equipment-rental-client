import { useState } from "react";

function FormRegister() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "email":
        setEmail(value);
        break;
      case "username":
        setUserName(value);
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
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={userName}
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
      </form>
    </>
  );
}

export default FormRegister;
