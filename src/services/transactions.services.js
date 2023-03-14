import service from "./config.services";

const deleteTransactionsByEquipmentService = (equipmentId) => {
  return service.delete(`/transaction/${equipmentId}`);
};

export { deleteTransactionsByEquipmentService };
