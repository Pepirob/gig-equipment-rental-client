import service from "./config.services";

const getAvailableEquipmentService = () => {
  return service.get("/equipment");
};

const getLocatedEquipmentService = (searchQuery) => {
  return service.get(`/equipment?location=${searchQuery}`);
};

const myEquipmentService = () => {
  return service.get("/equipment/my-equipment");
};

const equipmentDetailsService = (equipmentId) => {
  return service.get(`/equipment/${equipmentId}`);
};

const updateEquipmentService = (equipmentId, body) => {
  return service.patch(`equipment/${equipmentId}`, body);
};

export {
  myEquipmentService,
  equipmentDetailsService,
  updateEquipmentService,
  getAvailableEquipmentService,
  getLocatedEquipmentService,
};
