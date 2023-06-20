import { useState } from "react";
import ListEquipment from "../components/ListEquipment";
import NavigationMain from "../components/NavigationMain";
import SearchForm from "../components/SearchForm";
import Layout from "../components/Layout/Layout";
import Row from "react-bootstrap/Row";
import PulseLoader from "react-spinners/PulseLoader";
import HomeLogo from "../components/HomeLogo/HomeLogo";
import { useHomeEquipmentData } from "../hooks/useHomeEquipment";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const { availableEquipment, isFetching } = useHomeEquipmentData({
    searchInput,
  });

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
