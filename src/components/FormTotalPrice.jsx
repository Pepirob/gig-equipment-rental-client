function FormTotalPrice({ pricePerDay, deposit, setTotalDays, totalDays }) {
  const handleInput = (event) => {
    setTotalDays(event.target.value);
  };
  return (
    <>
      <form>
        <label htmlFor="totalDays">Days: </label>
        <input
          type="number"
          min={1}
          name="totalDays"
          value={totalDays}
          onChange={handleInput}
        />
        <br />
        <br />
        <h2>
          Total Price:
          {pricePerDay * totalDays + deposit}€
        </h2>
      </form>
    </>
  );
}

export default FormTotalPrice;
