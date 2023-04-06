import { useState, useRef, useContext } from "react";
import { capitalize } from "../utils";
import { AuthContext } from "../context/auth.context";
import { updateUserService } from "../services/user.services";
import EditableData from "./EditableData";
import ImageStyles from "./ImageStyles";
import Image from "react-bootstrap/Image";

function UserDetails({ user }) {
  const usernameRef = useRef("");
  const locationRef = useRef("");
  const { loggedUser } = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const propertiesMap = new Map([
    ["username", usernameRef],
    ["location", locationRef],
  ]);

  const setLocationRef = (editedData) => {
    locationRef.current = editedData;
  };

  const setUsernameRef = (editedData) => {
    usernameRef.current = editedData;
  };

  const handleLocationBlur = () => {
    if (!isFetching && locationRef.current.length) {
      handleSubmit("location");
    }
  };

  const handleUsernameBlur = () => {
    if (!isFetching && usernameRef.current.length) {
      handleSubmit("username");
    }
  };

  const handleSubmit = async (key) => {
    const patch = {
      [key]: propertiesMap.get(`${key}`).current,
    };

    try {
      setIsFetching(true);

      await updateUserService(user._id, patch);

      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  return (
    <>
      {errorMessage.length ? <p>{errorMessage}</p> : null}
      {user._id === loggedUser._id ? (
        <>
          <EditableData
            tagName="h1"
            initData={user.username}
            setData={setUsernameRef}
            onBlur={handleUsernameBlur}
          />
        </>
      ) : (
        <h1>{user.username}</h1>
      )}

      <section>
        <ImageStyles>
          <Image
            thumbnail={true}
            src={user.img}
            alt={`${user.username} profile pic`}
          />
        </ImageStyles>

        {user._id === loggedUser._id ? (
          <EditableData
            tagName="h2"
            initData={capitalize(user.location)}
            setData={setLocationRef}
            onBlur={handleLocationBlur}
          />
        ) : (
          <h2>{capitalize(user.location)}</h2>
        )}
        <h3>{user.email}</h3>
        <h3>{user.phoneNumber}</h3>
      </section>
    </>
  );
}

export default UserDetails;
