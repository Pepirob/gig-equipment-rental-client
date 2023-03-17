import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { capitalize } from "../../utils";
import "./ItemTransaction.css";

function ItemTransaction({ item }) {
  const currentDay = new Date();
  const transactionCreatedDay = new Date(item.updatedAt);
  const lastDayRent = transactionCreatedDay.setDate(
    transactionCreatedDay.getDate() + item.daysRented
  );
  const timeDiff = Math.abs(lastDayRent - currentDay.getTime());
  const remainingDays = Math.round(timeDiff / (1000 * 3600 * 24));

  return (
    <Col as="li" xs={12} md={4} lg={3}>
      <Card className="item-transaction-card">
        <Link to={`/transaction/${item._id}`}>
          <Card.Img
            className="item-transaction-image"
            variant="top"
            src={item.equipment.img}
            alt={`A pic of ${item.equipment.name}`}
          />
          <Card.Body>
            <Card.Title as="h3">{capitalize(item.equipment.name)}</Card.Title>
            <p className="item-transaction-text">
              State: {capitalize(item.state)}
            </p>
            <p className="item-transaction-text">
              Remaining Days:{remainingDays}
            </p>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
}

export default ItemTransaction;
