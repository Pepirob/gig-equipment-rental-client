
import SheetTransaction from "../components/SheetTransaction";
import LinkContact from "../components/LinkContact";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import PulseLoader from "react-spinners/PulseLoader";
import { usePaymentIntent } from "../hooks/usePaymentIntent";

const PaymentSuccess = () => {
  const { transaction, isFetching } = usePaymentIntent

  if (isFetching) {
    return <PulseLoader aria-label="Loading Spinner" data-testid="loader" />;
  }
  return (
    <>
      <>
        <NavBar></NavBar>
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
