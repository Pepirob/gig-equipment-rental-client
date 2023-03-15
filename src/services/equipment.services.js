import service from "./config.services";

const createEquipmentService = (body) => {
  return service.post("/equipment", body);
};

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

const deleteSingleEquipmentService = (equipmentId, ownerId) => {
  return service.delete(`equipment/${equipmentId}?ownerId=${ownerId}`);
};

const deleteAllEquipmentService = (ownerId) => {
  return service.delete(`equipment/all/${ownerId}`);
};

export {
  createEquipmentService,
  getMyEquipmentService,
  getEquipmentDetailsService,
  updateEquipmentService,
  getAvailableEquipmentService,
  getLocatedEquipmentService,
  deleteSingleEquipmentService,
  deleteAllEquipmentService,
};
