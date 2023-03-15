import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEquipmentDetailsService } from "../services/equipment.services";

function SheetTransaction({ transaction }) {
  const redirect = useNavigate();
  const [equipment, setEquipment] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const transactionCreatedDay = new Date(transaction.updatedAt);

  const lastDayRent = new Date(
    transactionCreatedDay.getTime() +
      transaction.daysRented * 24 * 60 * 60 * 1000
  );

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await getEquipmentDetailsService(
        transaction.equipment._id
      );
      setEquipment(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <>
      <h1>{transaction.equipment.name}</h1>
      <img src={transaction.equipment.img} width="100" />
      <p>Price per Day: {transaction.equipment.pricePerDay}</p>
      <p>Deposit: {transaction.equipment.deposit}</p>
      {!isFetching && <Link to="">{equipment.owner.username}</Link>}

      <p>
        Periodo de alquiler:
        <span>
          {transactionCreatedDay.getDate()}/
          {transactionCreatedDay.getMonth() + 1}/
          {transactionCreatedDay.getFullYear()} - {lastDayRent.getDate()}/
          {lastDayRent.getMonth() + 1}/{lastDayRent.getFullYear()}
        </span>
      </p>
    </>
  );
}

export default SheetTransaction;
