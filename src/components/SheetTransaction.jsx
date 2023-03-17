import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEquipmentDetailsService } from "../services/equipment.services";
import PulseLoader from "react-spinners/PulseLoader";
import { capitalize } from "../utils";
import { Col, Row, Button } from "react-bootstrap";

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
      {isFetching && (
        <PulseLoader aria-label="Loading Spinner" data-testid="loader" />
      )}
      {equipment && (
        <>
          <Row as="article">
            <Col xs={12} as="h1">
              {capitalize(transaction.equipment.name)}
            </Col>
            <Col xs={12} md={6}>
              <Col xs={12} md={6}>
                <img
                  className="custom-image"
                  src={transaction.equipment.img}
                  alt="equip"
                />
              </Col>
            </Col>
            <Col xs={12} md={6}>
              <p>Price per Day: {transaction.equipment.pricePerDay}</p>
              <p>Deposit: {transaction.equipment.deposit}</p>
              <h3>Current State: {capitalize(transaction.state)}</h3>
            </Col>
            <Col as="section" xs={12} md={6}>
              <p>
                Renting period:{" "}
                <span>
                  {transactionCreatedDay.getDate()}/
                  {transactionCreatedDay.getMonth() + 1}/
                  {transactionCreatedDay.getFullYear()} -{" "}
                  {lastDayRent.getDate()}/{lastDayRent.getMonth() + 1}/
                  {lastDayRent.getFullYear()}
                </span>
              </p>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default SheetTransaction;
