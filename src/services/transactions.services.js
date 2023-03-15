import service from "./config.services";

const getTransactionDetailsService = (transactionId) => {
  return service.get(`/transaction/${transactionId}`);
};

const getTransactionsService = () => {
  return service.get("/transaction");
};

const updateTransactionStateService = (transactionId, body) => {
  return service.patch(`/transaction/${transactionId}`, body);
};

const deleteTransactionsByEquipmentService = (equipmentId) => {
  return service.delete(`/transaction/${equipmentId}`);
};

const deleteTransactionsByUserService = (userId) => {
  return service.delete(`/transaction/user/${userId}`);
};

export {
  deleteTransactionsByEquipmentService,
  getTransactionsService,
  getTransactionDetailsService,
  deleteTransactionsByUserService,
  updateTransactionStateService,
};
