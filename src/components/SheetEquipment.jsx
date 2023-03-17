import { useContext, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { deleteSingleEquipmentService } from "../services/equipment.services";
import { deleteTransactionsByEquipmentService } from "../services/transactions.services";
import { capitalize } from "../utils";

function SheetEquipment({ item }) {
  const redirect = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const { _id, owner } = item;
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    try {
      await deleteSingleEquipmentService(_id, owner);
      await deleteTransactionsByEquipmentService(_id);

      redirect("/dashboard");
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  return (
    <>
      <Row as="article">
        <Col xs={12} as="h1">
          {capitalize(item.name)}
        </Col>
        <Col xs={12} md={6}>
          <img className="custom-image" src={item.img} alt="equip" />
        </Col>
        <Col xs={12} md={6}>
          <h3>Price per day: {item.pricePerDay}€</h3>
          <h3>Deposit: {item.deposit}€</h3>
          <h3>
            {item.isAvailable ? (
              <span className="text-success">Available</span>
            ) : (
              <span className="text-danger">Rented</span>
            )}
          </h3>
        </Col>
        <Col xs={12}>
          <p>{item.description}</p>
        </Col>
      </Row>

      {loggedUser?._id === item.owner._id ? (
        <Row as="section">
          <Col xs={3} lg={1}>
            <Link
              to={`/equipment/${item._id}/edit`}
              className="btn btn-primary"
            >
              Edit
            </Link>
          </Col>
          <Col xs={3} lg={1}>
            <Button variant="danger" onClick={handleDelete}>
              DELETE
            </Button>
          </Col>
          {errorMessage && <p>{errorMessage}</p>}
        </Row>
      ) : null}
    </>
  );
}

export default SheetEquipment;
