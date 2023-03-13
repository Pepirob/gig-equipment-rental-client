import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListEquipment from "../components/ListEquipment";
import Navigation from "../components/Navigation";
import SearchForm from "../components/SearchForm";
import useDebounce from "../hooks/useDebounce";
import { availableEquipmentService } from "../services/equipment.services";

function Home() {
  const redirect = useNavigate();
  const [availableEquipment, setAvailableEquipment] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useDebounce(searchInput, 500, () => getData());

  const getData = async () => {
    const query = searchInput ? searchInput : "";
    try {
      const response = await availableEquipmentService("location", query);
      setAvailableEquipment(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("error");
    }
  };

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <h1>Home</h1>
        <SearchForm setSearchInput={setSearchInput} />
        {!isFetching && <ListEquipment equipment={availableEquipment} />}
        {!isFetching && availableEquipment.length === 0 && <h2>No results</h2>}
      </main>
    </>
  );
}

export default Home;
