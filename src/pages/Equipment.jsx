import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DetailsEquipment from "../components/DetailsEquipment";
import FormEditEquipment from "../components/FormEditEquipment";
import { equipmentDetailsService } from "../services/equipment.services";

function Equipment() {
  const redirect = useNavigate();
  const params = useParams();
  const { equipmentId } = params;
  const [equipmentDetails, setEquipmentDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isEditShowing, setIsEditShowing] = useState(false);

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

  console.log(equipmentDetails);

  const handleEditButton = () => {
    setIsEditShowing(true);
  };
  console.log(isEditShowing);
  return (
    <>
      {!isEditShowing ? (
        <>
          <header>
            <Link to="/my-equipment">Back</Link>{" "}
          </header>
          <main>
            <h2>Details</h2>
            {isFetching === true ? (
              <h2>...Buscando</h2>
            ) : (
              <>
                <DetailsEquipment
                  equipment={equipmentDetails}
                  handleEditButton={handleEditButton}
                />
              </>
            )}
          </main>
        </>
      ) : (
        <FormEditEquipment equipmentDetails={equipmentDetails} />
      )}
    </>
  );
}

export default Equipment;
