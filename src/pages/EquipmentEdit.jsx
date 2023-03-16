import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormEditEquipment from "../components/FormEditEquipment";
import { getEquipmentDetailsService } from "../services/equipment.services";
import Layout from "../components/Layout/Layout";

function EquipmentEdit() {
  const redirect = useNavigate();
  const params = useParams();
  const { equipmentId } = params;
  const [equipment, setEquipment] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getEquipmentDetailsService(equipmentId);
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
      <Layout>
        {isFetching ? (
          <h2>...Buscando</h2>
        ) : (
          <>
            <h1>Edit Equipment: {equipment.name} </h1>
            <FormEditEquipment equipmentData={equipment} />
          </>
        )}
      </Layout>
    </>
  );
}

export default EquipmentEdit;
