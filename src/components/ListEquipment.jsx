import ItemEquipment from "./ItemEquipment";

function ListEquipment({ equipment }) {
  return (
    <>
      {equipment.map((item) => {
        return (
          <li key={item._id}>
            <ItemEquipment key={item._id} item={item} />
          </li>
        );
      })}
    </>
  );
}

export default ListEquipment;
