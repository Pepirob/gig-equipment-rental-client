import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListEquipment from "../components/ListEquipment";
import NavigationMain from "../components/NavigationMain";
import SearchForm from "../components/SearchForm";
import useDebounce from "../hooks/useDebounce";
import {
  getLocatedEquipmentService,
  getAvailableEquipmentService,
} from "../services/equipment.services";
import Layout from "../components/Layout/Layout";
import Row from "react-bootstrap/Row";
import PulseLoader from "react-spinners/PulseLoader";
import HomeLogo from "../components/HomeLogo/HomeLogo";
function Home() {
  const redirect = useNavigate();
  const [availableEquipment, setAvailableEquipment] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useDebounce(searchInput, 500, () => getData());

  const getData = async () => {
    try {
      const response = await (searchInput
        ? getLocatedEquipmentService(searchInput)
        : getAvailableEquipmentService());

      setAvailableEquipment(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("error");
    }
  };

  return (
    <>
      <NavigationMain />
      <Layout>
        <>
          <HomeLogo />
          <Row style={{ textAlign: "center" }} as="section">
            <h1>Wellcome to coverGig!</h1>
            <h2>
              Start renting equipment near your venue from other musicians like
              you
            </h2>
          </Row>
          <Row as="section">
            <SearchForm setSearchInput={setSearchInput} />
          </Row>
          <Row as="section">
            {isFetching && (
              <PulseLoader aria-label="Loading Spinner" data-testid="loader" />
            )}
            {!isFetching && <ListEquipment equipment={availableEquipment} />}
            {!isFetching && availableEquipment.length === 0 && (
              <h2>No results</h2>
            )}
          </Row>
        </>
      </Layout>
    </>
  );
}

export default Home;
