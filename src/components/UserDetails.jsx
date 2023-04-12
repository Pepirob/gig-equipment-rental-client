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
  const [editableState, setEditableState] = useState(null);

  useEffect(() => {
    setEditableState({
      username: user.username,
      location: user.location,
    });
  }, []);

  const refsMap = new Map([
    ["username", usernameRef],
    ["location", locationRef],
  ]);

  const setLocationData = (editedData) => {
    const newLocation = { location: editedData };
    setEditableState({ ...editableState, ...newLocation });
    locationRef.current = editedData;
  };

  const setUsernameData = (editedData) => {
    const newUsername = { username: editedData };
    setEditableState({ ...editableState, ...newUsername });
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

      toast.error(error.response.data.errorMessage);
    }
  };

  return (
    <>
      {editableState?.username && (
        <>
          {user._id === loggedUser._id ? (
            <EditableData
              tagName="h1"
              initData={editableState?.username}
              setData={setUsernameData}
              onBlur={() => handleBlur("username")}
            />
          ) : (
            <h1>{editableState?.username}</h1>
          )}
        </>
      )}

      <section>
        <ImageStyles>
          {editableState?.username && (
            <Image
              thumbnail={true}
              src={user.img}
              alt={`${editableState?.username} profile pic`}
            />
          )}
        </ImageStyles>
        {editableState?.location && (
          <>
            {user._id === loggedUser._id ? (
              <EditableData
                tagName="h2"
                initData={capitalize(editableState?.location)}
                setData={setLocationData}
                onBlur={() => handleBlur("location")}
              />
            ) : (
              <h2>{capitalize(editableState?.location)}</h2>
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
