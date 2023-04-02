import { useState, useRef, useEffect, useContext } from "react";
import { capitalize } from "../utils";
import { AuthContext } from "../context/auth.context";
import { updateUserService } from "../services/user.services";
import Icon from "./Icon";
import Form from "react-bootstrap/Form";
import { redirect } from "react-router-dom";

function UserDetails({ user }) {
  const inputRef = useRef(null);
  const usernameRef = useRef(user.username);
  const { loggedUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [onInput, setOnInput] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setUsername(user.username);

    if (inputRef.current && onInput) {
      inputRef.current.focus();
    }

    document.addEventListener("click", handleClickOut);

    return () => {
      document.removeEventListener("click", handleClickOut);
    };
  }, [onInput]);

  useEffect(() => {
    usernameRef.current = username;
  }, [username]);

  const handleClickOut = (event) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target) &&
      !isFetching
    ) {
      handleSubmit(event);
    }
  };

  const handleClickText = (event) => {
    if (user._id === loggedUser._id) {
      event.stopPropagation();
      setOnInput(true);
    }
  };

  const handleInput = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleSubmit = async () => {
    if (username !== usernameRef.current) {
      try {
        setIsFetching(true);

        await updateUserService(user._id, { username: usernameRef.current });

        setIsFetching(false);
        setOnInput(false);
      } catch (error) {
        redirect("/error");
      }
    } else {
      setOnInput(false);
    }
  };

  return (
    <>
      {onInput ? (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="username">Edit your username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={handleInput}
              ref={inputRef}
            />
          </Form.Group>
        </Form>
      ) : (
        <>
          <h1 onClick={handleClickText}>
            {user.username}'s Profile{" "}
            <Icon
              iconName="Pencil"
              color="green"
              size={24}
              title="Click for username editing"
            />
          </h1>
        </>
      )}

      <section>
        <img src={user.img} alt={`${user.username} profile pic`} height={100} />
        <h2>{capitalize(user.location)}</h2>
        <h3>{user.email}</h3>
        <h3>{user.phoneNumber}</h3>
      </section>
    </>
  );
}

export default UserDetails;
