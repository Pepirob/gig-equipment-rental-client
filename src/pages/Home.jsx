import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListEquipment from "../components/ListEquipment";
import Navigation from "../components/Navigation";
import { availableEquipmentService } from "../services/equipment.services";

function Home() {
  const redirect = useNavigate();
  const [availableEquipment, setAvailableEquipment] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await availableEquipmentService();
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
        {!isFetching && <ListEquipment equipment={availableEquipment} />}
      </main>
    </>
  );
}

export default Home;
