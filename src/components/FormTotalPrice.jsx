function FormTotalPrice({ setTotalDays, totalDays }) {
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
      </form>
    </>
  );
}

export default FormTotalPrice;
