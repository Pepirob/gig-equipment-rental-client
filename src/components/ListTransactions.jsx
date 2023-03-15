import ItemTransaction from "./ItemTransaction";

function ListTransactions({ transactions }) {
  return (
    <ul>
      {transactions.map((item) => {
        return <ItemTransaction key={item._id} item={item} />;
      })}
    </ul>
  );
}

export default ListTransactions;
