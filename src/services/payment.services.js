import service from "./config.services";

const createPaymentIntentService = (productId) => {
  return service.post("/payment/create-payment-intent", productId);
};

export { createPaymentIntentService };
