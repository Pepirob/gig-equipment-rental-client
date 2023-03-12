import ItemEquipment from "./ItemEquipment";

function ListEquipment({ equipment }) {
  return (
    <>
      {equipment.map((item) => {
        return <ItemEquipment key={item._id} item={item} />;
      })}
    </>
  );
}

export default ListEquipment;
