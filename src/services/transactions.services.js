import service from "./config.services";

const deleteTransactionsByEquipmentService = (equipmentId) => {
  return service.delete(`/transaction/${equipmentId}`);
};

const deleteTransactionsByUserService = (userId) => {
  return service.delete(`/transaction/user/${userId}`);
};

export {
  deleteTransactionsByEquipmentService,
  deleteTransactionsByUserService,
};
