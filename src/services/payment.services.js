import service from "./config.services";

const createPaymentIntentService = (productId, totalDays) => {
  return service.post(
    `/transaction/create-payment-intent?totalDays=${totalDays}`,
    productId
  );
};

const updatePaymentIntentService = (paymentIntentInfo) => {
  return service.patch("/transaction/update-payment-intent", paymentIntentInfo);
};

export { createPaymentIntentService, updatePaymentIntentService };
