import { Link } from "react-router-dom";
import { capitalize } from "../utils/index";
import ImageStyles from "./ImageStyles";

function ItemEquipment({ item }) {
  return (
    <li>
      <img src={item.img} alt="equip" />

      <Link to={`/equipment/${item._id}`}>
        <h3>{capitalize(item.name)} </h3>
      </Link>
    </li>
  );
}

export default ItemEquipment;
