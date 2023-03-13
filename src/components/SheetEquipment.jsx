import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { deleteEquipmentService } from "../services/equipment.services";

function SheetEquipment({ equipment }) {
  const redirect = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const { _id, owner } = equipment;

  const handleDelete = async () => {
    try {
      await deleteEquipmentService(_id, owner);
      redirect("/dashboard");
    } catch (error) {
      redirect("/error");
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
        </>
      ) : null}
    </>
  );
}

export default SheetEquipment;
