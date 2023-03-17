import Form from "react-bootstrap/Form";

function SearchForm({ setSearchInput }) {
  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };
  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="searchInput"
            onChange={handleSearch}
            placeholder="search by location"
          />
        </Form.Group>
      </Form>
    </>
  );
}

export default SearchForm;
