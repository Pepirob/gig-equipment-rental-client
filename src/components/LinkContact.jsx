import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function LinkContactOwner({ owner, client }) {
  const { loggedUser } = useContext(AuthContext);

  const isSomeoneElseEquipment = loggedUser?._id !== owner;

  return (
    <>
      {isSomeoneElseEquipment ? (
        <Link to={`/user/${owner}`}>Contact Equipment's Owner</Link>
      ) : (
        <Link to={`/user/${client}`}>Contact Client</Link>
      )}
    </>
  );
}

export default LinkContactOwner;
