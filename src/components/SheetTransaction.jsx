function SheetTransaction({ transaction }) {
  const transactionCreatedDay = new Date(transaction.updatedAt);
  const lastDayRent = new Date(
    transactionCreatedDay.getTime() +
      transaction.daysRented * 24 * 60 * 60 * 1000
  );
  return (
    <>
      <h1>{transaction.equipment.name}</h1>
      <img src={transaction.equipment.img} width="100" />
      <p>{transaction.equipment.pricePerDay}</p>
      <p>{transaction.equipment.deposit}</p>
      <p>{transaction.equipment.owner}</p>

      <p>
        Periodo de alquiler:{" "}
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
