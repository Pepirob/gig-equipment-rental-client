import service from "./config.services";

const deleteTransactionsByEquipmentService = (equipmentId) => {
  return service.delete(`/transaction/${equipmentId}`);
};

const getTransactionsService = () => {
  return service.get("/transaction");
};

export { deleteTransactionsByEquipmentService, getTransactionsService };
