import { useContext, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { deleteSingleEquipmentService } from "../services/equipment.services";
import { deleteTransactionsByEquipmentService } from "../services/transactions.services";
import { capitalize } from "../utils";
import ImageStyles from "./ImageStyles";

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
      <Container fluid="md">
        <Row>
          <Col className="d-flex flex-column justify-content-center">
            <h1>{capitalize(item.name)}</h1>
            <ImageStyles>
              <img src={item.img} alt="equip" />
            </ImageStyles>
          </Col>
          <Col className="d-flex flex-column justify-content-center">
            <Card style={{ width: "18rem" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Price per day: {item.pricePerDay}€
                </ListGroup.Item>
                <ListGroup.Item>Deposit: {item.deposit}€</ListGroup.Item>
                <ListGroup.Item>
                  {item.isAvailable ? (
                    <p className="text-success">Available</p>
                  ) : (
                    <p className="text-danger">Rented</p>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card>

            {loggedUser?._id === item.owner._id ? (
              <>
                <Link
                  to={`/equipment/${item._id}/edit`}
                  className="btn btn-primary me-2"
                >
                  Edit
                </Link>
                <button onClick={handleDelete} className="btn btn-danger">
                  DELETE
                </button>
                {errorMessage && <p>{errorMessage}</p>}
              </>
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SheetEquipment;
