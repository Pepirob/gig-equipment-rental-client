import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { updatePaymentIntentService } from "../services/payment.services";
import SheetTransaction from "../components/SheetTransaction";
import LinkContact from "../components/LinkContact";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavItem";

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
      <>
        <NavBar>
          <NavItem path={"/"}>Go back to Home</NavItem>
        </NavBar>
        <Layout>
          <h1>Thank you for your order!</h1>
          <h3>Details:</h3>
          <SheetTransaction transaction={transaction} />
          <LinkContact
            owner={transaction.equipment.owner}
            client={transaction.client}
          />
        </Layout>
      </>
    </>
  );
};

export default PaymentSuccess;
