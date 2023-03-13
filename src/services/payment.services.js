import service from "./config.services";

const createPaymentIntentService = (productId) => {
  return service.post("/transaction/create-payment-intent", productId);
};

const updatePaymentIntentService = (paymentIntentInfo) => {
  return service.patch("/transaction/update-payment-intent", paymentIntentInfo);
};

export { createPaymentIntentService, updatePaymentIntentService };
