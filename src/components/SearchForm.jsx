function SearchForm({ setSearchInput }) {
  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };
  return (
    <>
      <form>
        <label htmlFor="searchInput">SEARCH</label>
        <input
          type="text"
          name="searchInput"
          onChange={handleSearch}
          placeholder="search by location"
        />
      </form>
    </>
  );
}

export default SearchForm;
