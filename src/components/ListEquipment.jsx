import { Link } from "react-router-dom";

function ListEquipment({ equipment }) {
  return (
    <>
      {equipment.map((equip) => {
        return (
          <li key={equip._id}>
            <img src={equip.img} alt="equip" width="100" />
            <Link to={`/equipment/${equip._id}`}>
              <h3>{equip.name} </h3>
            </Link>
          </li>
        );
      })}
    </>
  );
}

export default ListEquipment;
