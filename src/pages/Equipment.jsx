import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DetailsEquipment from "../components/DetailsEquipment";
import { equipmentDetailsService } from "../services/equipment.services";

function Equipment() {
  const redirect = useNavigate();
  const params = useParams();
  const { equipmentId } = params;
  const [equipmentDetails, setEquipmentDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await equipmentDetailsService(equipmentId);
      setEquipmentDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <>
      <header>
        <Link to="/">Home</Link> <Link to="/dashboard">Dashboard</Link>{" "}
      </header>
      <main>
        <h2>Details</h2>
        {isFetching === true ? (
          <h2>...Buscando</h2>
        ) : (
          <>
            <DetailsEquipment equipment={equipmentDetails} />
          </>
        )}
      </main>
    </>
  );
}

export default Equipment;
