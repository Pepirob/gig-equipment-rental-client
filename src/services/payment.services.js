import service from "./config.services";

const createPaymentIntentService = (productId) => {
  return service.post("/transaction/create-payment-intent", productId);
};

export { createPaymentIntentService };
