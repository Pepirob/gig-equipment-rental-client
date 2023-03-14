import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntentService } from "../services/payment.services";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function PaymentIntent(props) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    handleUseEffect();
  }, []);

  const handleUseEffect = async () => {
    const response = await createPaymentIntentService(
      props.productDetails,
      props.totalDays
    );
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
          {props.children}
        </Elements>
      )}
    </div>
  );
}

export default PaymentIntent;
