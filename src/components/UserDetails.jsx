import { useState, useRef, useEffect } from "react";
import { capitalize } from "../utils";
import { Form } from "react-bootstrap";

function UserDetails({ user }) {
  const inputRef = useRef(null);
  const [username, setUsername] = useState("");
  const [isText, setIsText] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    if (inputRef.current && !isText) {
      inputRef.current.focus();
      setIsInputFocused(true);
    }

    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        isInputFocused
      ) {
        setIsText(true);
        setIsInputFocused(false);
        setUsername("");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isText, isInputFocused]);

  const handleTextClick = () => {
    setIsText(false);
  };

  const handleInput = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  return (
    <>
      {isText ? (
        <h1 onClick={handleTextClick}>{user.username}'s Profile</h1>
      ) : (
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={handleInput}
            ref={inputRef}
          />
        </Form.Group>
      )}

      <section>
        <img
          src={user.img}
          alt={`${user.username} profile image`}
          height={100}
        />
        <h2>{capitalize(user.location)}</h2>
        <h3>{user.email}</h3>
        <h3>{user.phoneNumber}</h3>
      </section>
    </>
  );
}

export default UserDetails;
