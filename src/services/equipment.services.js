import service from "./config.services";

const getAvailableEquipmentService = () => {
  return service.get("/equipment");
};

const getLocatedEquipmentService = (searchQuery) => {
  return service.get(`/equipment?location=${searchQuery}`);
};

const getMyEquipmentService = () => {
  return service.get("/equipment/my-equipment");
};

const getEquipmentDetailsService = (equipmentId) => {
  return service.get(`/equipment/${equipmentId}`);
};

const updateEquipmentService = (equipmentId, body) => {
  return service.patch(`equipment/${equipmentId}`, body);
};

const deleteEquipmentService = (equipmentId, ownerId) => {
  return service.delete(`equipment/${equipmentId}?ownerId=${ownerId}`);
};

export {
  getMyEquipmentService,
  getEquipmentDetailsService,
  updateEquipmentService,
  getAvailableEquipmentService,
  getLocatedEquipmentService,
  deleteEquipmentService,
};
