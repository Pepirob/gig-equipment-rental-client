import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormEditEquipment from "../components/FormEditEquipment";
import { equipmentDetailsService } from "../services/equipment.services";

function EquipmentEdit() {
  const redirect = useNavigate();
  const params = useParams();
  const { equipmentId } = params;
  const [equipmentData, setEquipment] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await equipmentDetailsService(equipmentId);
      setEquipment(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <>
      <header>
        <Link to={`/equipment/${equipmentId}`}>Back</Link>
      </header>
      <main>
        {isFetching ? (
          <h2>...Buscando</h2>
        ) : (
          <>
            <h1>Edit Equipment</h1>
            <FormEditEquipment equipmentData={equipmentData} />
          </>
        )}
      </main>
    </>
  );
}

export default EquipmentEdit;
