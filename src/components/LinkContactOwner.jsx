import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function LinkContactOwner({ ownerId }) {
  const { loggedUser } = useContext(AuthContext);
  console.log(ownerId);

  const isSomeoneElseEquipment = loggedUser?._id !== ownerId;

  return (
    <>
      {isSomeoneElseEquipment ? (
        <Link to={"/"}>Contact Equipment's Owner</Link>
      ) : null}
    </>
  );
}

export default LinkContactOwner;
