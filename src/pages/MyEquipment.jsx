import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListEquipment from "../components/ListEquipment";
import { getMyEquipmentService } from "../services/equipment.services";
import Layout from "../components/Layout/Layout";

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
      <header>
        <Link style={{ marginRight: "1rem" }} to="/dashboard">
          Dashboard
        </Link>
        <Link style={{ marginRight: "1rem" }} to="/create-equipment">
          Publish your Equipment
        </Link>
      </header>
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
