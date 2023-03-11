import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { myEquipmentService } from "../services/equipment.services";

function ListEquipment() {
  const redirect = useNavigate();
  const [myEquipment, setMyequipment] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await myEquipmentService();
      setMyequipment(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <>
      <header>
        <Link to="/dashboard">Back</Link>
      </header>
      <main>
        <h2>My equipment</h2>
        {isFetching === true ? (
          <h2>... Buscando</h2>
        ) : (
          myEquipment.map((equip) => {
            return (
              <>
                <img src={equip.img} alt="equip" width="100" />
                <Link to={`/equipment/${equip._id}`}>
                  <h3>{equip.name} </h3>
                </Link>
              </>
            );
          })
        )}
      </main>
    </>
  );
}

export default ListEquipment;
