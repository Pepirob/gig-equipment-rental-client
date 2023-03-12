import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function DetailsEquipment({ equipment, handleEditButton }) {
  const { loggedUser } = useContext(AuthContext);
  console.log(loggedUser);
  return (
    <>
      <h2>{equipment.name}</h2>
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
      {loggedUser._id === equipment.owner && (
        <>
          <button onClick={handleEditButton}>Edit</button>
          <button>Delete</button>
        </>
      )}
    </>
  );
}

export default DetailsEquipment;
