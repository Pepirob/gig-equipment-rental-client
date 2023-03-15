import ItemTransaction from "./ItemTransaction";

function ListTransactions({ transactionsAsProvider, transactionsAsClient }) {
  return (
    <>
      <h2>My equipment</h2>
      {transactionsAsProvider.map((item) => {
        return <ItemTransaction key={item._id} item={item} />;
      })}

      <h2>Rented equipment</h2>
      {transactionsAsClient.map((item) => {
        return <ItemTransaction key={item._id} item={item} />;
      })}
    </>
  );
}

export default ListTransactions;
