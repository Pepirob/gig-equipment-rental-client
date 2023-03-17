import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <section>
        <h1>{transaction.equipment.name}</h1>
        <img src={transaction.equipment.img} />
        <div>
          <p>Price per Day: {transaction.equipment.pricePerDay}</p>
          <p>Deposit: {transaction.equipment.deposit}</p>
        </div>
      </section>
      <section>
        <p>
          Renting period:{" "}
          <span>
            {transactionCreatedDay.getDate()}/
            {transactionCreatedDay.getMonth() + 1}/
            {transactionCreatedDay.getFullYear()} - {lastDayRent.getDate()}/
            {lastDayRent.getMonth() + 1}/{lastDayRent.getFullYear()}
          </span>
        </p>
      </section>
    </>
  );
}

export default SheetTransaction;
