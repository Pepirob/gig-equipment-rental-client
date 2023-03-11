import service from "./config.services";

const myEquipmentService = () => {
  return service.get("/equipment/my-equipment");
};

export { myEquipmentService };
