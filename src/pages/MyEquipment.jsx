import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListEquipment from "../components/ListEquipment";
import { getMyEquipmentService } from "../services/equipment.services";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavItem";

function MyEquipment() {
  const redirect = useNavigate();
  const [myEquipment, setMyequipment] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getMyEquipmentService();
      setMyequipment(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <>
      <NavBar>
        <NavItem path="/dashboard">Dashboard</NavItem>
        <NavItem path="/create-equipment">Publish your Equipment</NavItem>
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
