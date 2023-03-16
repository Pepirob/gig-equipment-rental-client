import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { getMyEquipmentService } from "../services/equipment.services";
import { getUserService } from "../services/user.services";
import { useNavigate } from "react-router-dom";
import ListEquipment from "../components/ListEquipment";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import NavigationCta from "../components/NavigationCta";
import NavigationAvatar from "../components/NavigationAvatar";

function MyEquipment() {
  const redirect = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const [myEquipment, setMyEquipment] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const equipmentResponse = await getMyEquipmentService();

      const userResponse = await getUserService(loggedUser._id);

      setMyEquipment(equipmentResponse.data);
      setUser(userResponse.data);
      setIsFetching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <>
      <NavBar>
        <NavigationCta />
        {user && <NavigationAvatar user={user} />}
      </NavBar>
      <Layout>
        <h2>My Equipment</h2>
        {isFetching ? (
          <h1>...Buscando</h1>
        ) : (
          <>
            {myEquipment.length ? (
              <ListEquipment equipment={myEquipment} />
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
