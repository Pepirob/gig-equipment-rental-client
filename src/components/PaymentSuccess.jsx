import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { updatePaymentIntentService } from "../services/payment.services";
import SheetTransaction from "./SheetTransaction";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [transaction, setTransaction] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    handleUseEffect();
  }, []);

  const handleUseEffect = async () => {
    const clientSecret = new URLSearchParams(location.search).get(
      "payment_intent_client_secret"
    );
    const paymentIntentId = new URLSearchParams(location.search).get(
      "payment_intent"
    );

    const paymentIntentInfo = {
      clientSecret: clientSecret,
      paymentIntentId: paymentIntentId,
    };

    try {
      const response = await updatePaymentIntentService(paymentIntentInfo);
      console.log(response);
      setIsFetching(false);
      setTransaction(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching) {
    return <h3>... updating payment</h3>;
  }

  return (
    <>
      {/* // todo redirect to owner */}
      <>
        <header>
          <h1>Thank you for your order!</h1>
          <Link to={"/"}>Go back to Home</Link>
        </header>
        <main>
          <h3>Details:</h3>
          <SheetTransaction transaction={transaction} />
        </main>
      </>
    </>
  );
};

export default PaymentSuccess;
