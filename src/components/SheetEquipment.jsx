import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { deleteEquipmentService } from "../services/equipment.services";
import { deleteTransactionsByEquipmentService } from "../services/transactions.services";

function SheetEquipment({ item }) {
  const redirect = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    try {
      await deleteEquipmentService(item._id, item.owner);
      await deleteTransactionsByEquipmentService(item._id);
      redirect("/dashboard");
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  return (
    <>
      <h1>{item.name}</h1>
      <img src={item.img} alt="equip" width="100" />
      <p>{item.description}</p>
      <p>Price per day: {item.pricePerDay}€</p>
      <p>Deposit: {item.deposit}€</p>
      {item.isAvailable ? (
        <p style={{ color: "green" }}>Available</p>
      ) : (
        <>
          <p style={{ color: "red" }}>Rented</p>
        </>
      )}
      {/* // TODO: move to tools component */}
      {loggedUser?._id === item.owner ? (
        <>
          <Link to={`/equipment/${item._id}/edit`}>Edit</Link>
          <button onClick={handleDelete}>DELETE</button>
          {errorMessage && <p>{errorMessage}</p>}
        </>
      ) : null}
    </>
  );
}

export default SheetEquipment;
