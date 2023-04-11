import { useState, useRef, useContext, useEffect } from "react";
import { capitalize } from "../utils";
import { AuthContext } from "../context/auth.context";
import { updateUserService } from "../services/user.services";
import EditableData from "./EditableData";
import ImageStyles from "./ImageStyles";
import Image from "react-bootstrap/Image";
import { toast } from "sonner";

function UserDetails({ user }) {
  const usernameRef = useRef("");
  const locationRef = useRef("");
  const { loggedUser } = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    setUsername(user.username);
    setLocation(user.location);
  }, []);

  const refsMap = new Map([
    ["username", usernameRef],
    ["location", locationRef],
  ]);

  const setLocationData = (editedData) => {
    locationRef.current = editedData;
  };

  const setUsernameData = (editedData) => {
    setErrorMessage("");
    usernameRef.current = editedData;
  };

  const getRefCurrent = (refName) => {
    return refsMap.get(`${refName}`).current;
  };

  const getDescription = (refName) => {
    return `New ${refName} is ${getRefCurrent(refName)}`;
  };

  const getPatch = (refName) => {
    const isPrevData = getRefCurrent(refName) === user[refName];

    if (getRefCurrent(refName) && !isPrevData) {
      return {
        description: getDescription(refName),
        data: { [refName]: getRefCurrent(refName) },
      };
    }
  };

  const handleBlur = (refName) => {
    if (!isFetching && getPatch(refName)) {
      handleSubmit(getPatch(refName));
    }
  };

  const handleSubmit = async (patch) => {
    try {
      setIsFetching(true);

      await updateUserService(user._id, patch.data);

      setIsFetching(false);

      toast.success("User profile has been updated", {
        description: patch.description,
      });
    } catch (error) {
      setIsFetching(false);
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  return (
    <>
      {errorMessage.length ? <p>{errorMessage}</p> : null}

      {username && (
        <>
          {user._id === loggedUser._id ? (
            <EditableData
              tagName="h1"
              initData={username}
              setData={setUsernameData}
              onBlur={() => handleBlur("username")}
            />
          ) : (
            <h1>{username}</h1>
          )}
        </>
      )}

      <section>
        <ImageStyles>
          {username && (
            <Image
              thumbnail={true}
              src={user.img}
              alt={`${username} profile pic`}
            />
          )}
        </ImageStyles>
        {location && (
          <>
            {user._id === loggedUser._id ? (
              <EditableData
                tagName="h2"
                initData={capitalize(location)}
                setData={setLocationData}
                onBlur={() => handleBlur("location")}
              />
            ) : (
              <h2>{capitalize(location)}</h2>
            )}
          </>
        )}

        <h3>{user.email}</h3>
        <h3>{user.phoneNumber}</h3>
      </section>
    </>
  );
}

export default UserDetails;
