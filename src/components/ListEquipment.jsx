import ItemEquipment from "./ItemEquipment";
import Row from "react-bootstrap/Row";

function ListEquipment({ equipment }) {
  return (
    <Row as="ul">
      {equipment.map((item) => {
        return <ItemEquipment key={item._id} item={item} />;
      })}
    </Row>
  );
}

export default ListEquipment;
