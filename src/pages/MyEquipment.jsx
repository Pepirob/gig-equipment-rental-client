import ListEquipment from "../components/ListEquipment";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import NavigationCta from "../components/NavigationCta";
import NavigationAvatar from "../components/NavigationAvatar";
import PulseLoader from "react-spinners/PulseLoader";
import { DATA_TYPE, useEquipmentData } from "../hooks/useEquipmentData";

function MyEquipment() {
  const { equipment, isFetching, user } = useEquipmentData({
    type: DATA_TYPE.MY_EQUIPMENT,
  });

  return (
    <>
      <NavBar>
        <NavigationCta />
        {user && <NavigationAvatar user={user} />}
      </NavBar>
      <Layout>
        <h2>My Equipment</h2>
        {isFetching ? (
          <PulseLoader aria-label="Loading Spinner" data-testid="loader" />
        ) : (
          <>
            {equipment.length ? (
              <ListEquipment equipment={equipment} />
            ) : (
              <h2>You have no equipment</h2>
            )}
          </>
        )}
      </Layout>
    </>
  );
}

export default MyEquipment;
