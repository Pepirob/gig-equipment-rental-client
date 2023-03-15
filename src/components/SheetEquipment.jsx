import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { deleteSingleEquipmentService } from "../services/equipment.services";
import { deleteTransactionsByEquipmentService } from "../services/transactions.services";

function SheetEquipment({ equipment }) {
  const redirect = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const { _id, owner } = equipment;
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    try {
      await deleteSingleEquipmentService(_id, owner);
      await deleteTransactionsByEquipmentService(_id);
      redirect("/dashboard");
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  return (
    <>
      <h1>{equipment.name}</h1>
      <img src={equipment.img} alt="equip" width="100" />
      <p>{equipment.description}</p>
      <p>Price per day: {equipment.pricePerDay}€</p>
      <p>Deposit: {equipment.deposit}€</p>
      {equipment.isAvailable ? (
        <p style={{ color: "green" }}>Available</p>
      ) : (
        <>
          <p style={{ color: "red" }}>Rented</p>
        </>
      )}
      {/* // TODO: move to tools component */}
      {loggedUser?._id === equipment.owner ? (
        <>
          <Link to={`/equipment/${equipment._id}/edit`}>Edit</Link>
          <button onClick={handleDelete}>DELETE</button>
          {errorMessage && <p>{errorMessage}</p>}
        </>
      ) : null}
    </>
  );
}

export default SheetEquipment;
