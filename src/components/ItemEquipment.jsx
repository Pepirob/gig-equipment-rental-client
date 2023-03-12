import { Link } from "react-router-dom";

function ItemEquipment({ item }) {
  return (
    <>
      <img src={item.img} alt="equip" width="100" />
      <Link to={`/equipment/${item._id}`}>
        <h3>{item.name} </h3>
      </Link>
    </>
  );
}

export default ItemEquipment;
