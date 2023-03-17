import { Form } from "react-bootstrap";

function FormTotalPrice({ pricePerDay, deposit, setTotalDays, totalDays }) {
  const handleInput = (event) => {
    setTotalDays(event.target.value);
  };
  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="totalDays">Days: </Form.Label>
          <Form.Control
            type="number"
            min={1}
            name="totalDays"
            value={totalDays}
            onChange={handleInput}
          />
        </Form.Group>

        <h2>Total Price: {pricePerDay * totalDays + deposit}€</h2>
      </Form>
    </>
  );
}

export default FormTotalPrice;
