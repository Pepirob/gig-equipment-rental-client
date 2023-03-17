import ItemTransaction from "./ItemTransaction";
import Row from "react-bootstrap/Row";

function ListTransactions({ transactions }) {
  return (
    <Row as="ul">
      {transactions.map((item) => {
        return <ItemTransaction key={item._id} item={item} />;
      })}
    </Row>
  );
}

export default ListTransactions;
