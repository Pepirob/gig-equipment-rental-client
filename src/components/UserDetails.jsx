import { useState, useRef, useEffect, useContext } from "react";
import { capitalize } from "../utils";
import { AuthContext } from "../context/auth.context";
import { updateUserService } from "../services/user.services";
import Icon from "./Icon";
import Form from "react-bootstrap/Form";
import { redirect } from "react-router-dom";

function UserDetails({ user }) {
  const inputRef = useRef(null);
  const { loggedUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [onInput, setOnInput] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setUsername(user.username);
  }, []);

  useEffect(() => {
    if (inputRef.current && onInput) {
      inputRef.current.focus();
    }
  }, [onInput]);

  const handleClickText = (event) => {
    if (user._id === loggedUser._id) {
      event.stopPropagation();
      setOnInput(true);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(username);
    }
  };

  const handleInputBlur = () => {
    if (!isFetching) {
      handleSubmit(username);
    }
  };

  const handleSubmit = async (inputData) => {
    try {
      setIsFetching(true);

      await updateUserService(user._id, { username: inputData });

      setIsFetching(false);
      setOnInput(false);
    } catch (error) {
      redirect("/error");
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
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onBlur={handleInputBlur}
              ref={inputRef}
            />
          </Form.Group>
        </Form>
      ) : (
        <>
          <h1 onClick={handleClickText}>
            {username}'s Profile{" "}
            {user._id === loggedUser._id && (
              <Icon
                iconName="Pencil"
                color="green"
                size={24}
                title="Click for username editing"
              />
            )}
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
