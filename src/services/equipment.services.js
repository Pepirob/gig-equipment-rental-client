import service from "./config.services";

const availableEquipmentService = (query, searchQuery) => {
  return service.get(`/equipment?${query}=${searchQuery}`);
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
  availableEquipmentService,
};
