import { Link } from "react-router-dom";
import { capitalize } from "../../utils/index";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import "./ItemEquipment.css";

function ItemEquipment({ item }) {
  return (
    <Col as="li" xs={12} md={4} lg={3}>
      <Card className="item-equipment-card">
        <Link to={`/equipment/${item._id}`}>
          <Card.Img
            className="item-equipment-image"
            variant="top"
            src={item.img}
            alt={`A pic of ${item.name}`}
          />
          <Card.Body>
            <Card.Title as="h3">{capitalize(item.name)}</Card.Title>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
}

export default ItemEquipment;
