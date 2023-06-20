import { useParams } from "react-router-dom";
import FormEditEquipment from "../components/FormEditEquipment";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavItem";
import PulseLoader from "react-spinners/PulseLoader";
import { DATA_TYPE, useEquipmentData } from "../hooks/useEquipmentData";

function EquipmentEdit() {
  const params = useParams();
  const { equipmentId } = params;
  const { equipment, isFetching } = useEquipmentData({
    query: equipmentId,
    type: DATA_TYPE.EQUIPMENT_DETAILS,
  });

  return (
    <>
      <NavBar>
        <NavItem path={`/equipment/${equipmentId}`}>Back</NavItem>
      </NavBar>
      <Layout>
        {isFetching ? (
          <PulseLoader aria-label="Loading Spinner" data-testid="loader" />
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
