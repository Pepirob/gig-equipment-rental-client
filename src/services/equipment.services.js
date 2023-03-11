import service from "./config.services";

const myEquipmentService = () => {
  return service.get("/equipment/my-equipment");
};

const equipmentDetailsService = (equipId) => {
  return service.get(`/equipment/${equipId}`);
};

export { myEquipmentService, equipmentDetailsService };
