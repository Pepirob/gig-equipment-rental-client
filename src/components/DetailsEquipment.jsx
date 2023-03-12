import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function DetailsEquipment({ equipment }) {
  const { loggedUser } = useContext(AuthContext);

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
      {loggedUser._id === equipment.owner ? (
        <>
          <Link to={`/equipment/${equipment._id}/edit`}>Edit</Link>
        </>
      ) : (
        <Link>Rent</Link>
      )}
    </>
  );
}

export default DetailsEquipment;
