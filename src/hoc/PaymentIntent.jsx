import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import FormCheckout from "../components/FormCheckout";
import { createPaymentIntentService } from "../services/payment.services";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function PaymentIntent({ productDetails }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    handleUseEffect();
  }, []);

  const handleUseEffect = async () => {
    //                   this is the product info sent to the backend with the product to purchase
    //                                                    |
    const response = await createPaymentIntentService(productDetails);
    setClientSecret(response.data.clientSecret);
  };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <FormCheckout />
        </Elements>
      )}
    </div>
  );
}

export default PaymentIntent;
