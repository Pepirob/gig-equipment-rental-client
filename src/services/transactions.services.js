import service from "./config.services";

const deleteTransactionsByEquipmentService = (equipmentId) => {
  return service.delete(`/transaction/${equipmentId}`);
};

const getTransactionDetailsService = (transactionId) => {
  return service.get(`/transaction/${transactionId}`);
};

const getTransactionsService = () => {
  return service.get("/transaction");
};

const deleteTransactionsByUserService = (userId) => {
  return service.delete(`/transaction/user/${userId}`);
};

export {
  deleteTransactionsByEquipmentService,
  getTransactionsService,
  getTransactionDetailsService,
  deleteTransactionsByUserService,
};
