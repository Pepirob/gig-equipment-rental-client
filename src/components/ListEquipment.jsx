import ItemEquipment from "./ItemEquipment";

function ListEquipment({ equipment }) {
  return (
    <ul>
      {equipment.map((item) => {
        return <ItemEquipment key={item._id} item={item} />;
      })}
    </ul>
  );
}

export default ListEquipment;
