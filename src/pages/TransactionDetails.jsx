import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SheetTransaction from "../components/SheetTransaction";
import { AuthContext } from "../context/auth.context";
import {
  getTransactionDetailsService,
  updateTransactionStateService,
} from "../services/transactions.services";
import LinkContact from "../components/LinkContact";
import { updateEquipmentService } from "../services/equipment.services";
import Layout from "../components/Layout/Layout";

function TransactionDetails() {
  const redirect = useNavigate();
  const params = useParams();
  const { loggedUser } = useContext(AuthContext);
  const { transactionId } = params;
  const [transaction, setTransaction] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getTransactionDetailsService(transactionId);
      setIsFetching(false);
      setTransaction(response.data);
    } catch (error) {
      redirect("/error");
    }
  };

  const handleDeliveredState = async () => {
    try {
      setIsFetching(true);

      const response = await updateTransactionStateService(transactionId, {
        state: "delivered",
      });

      setIsFetching(false);
      setTransaction(response.data);
    } catch (error) {
      redirect("/error");
    }
  };

  const handleReturnedState = async () => {
    try {
      setIsFetching(true);

      const response = await updateTransactionStateService(transactionId, {
        state: "returned",
      });

      await updateEquipmentService(transaction.equipment._id, {
        isAvailable: true,
      });

      setIsFetching(false);
      setTransaction(response.data);
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <>
      <header>
        <Link to="/">Home</Link> <Link to="/dashboard">Dashboard</Link>
      </header>
      <Layout>
        {isFetching ? (
          <h2>...buscando</h2>
        ) : (
          <>
            <SheetTransaction transaction={transaction} />
            {loggedUser._id === transaction.client && (
              <button
                hidden={transaction.state !== "succeeded"}
                onClick={handleDeliveredState}
              >
                Mark as delivered
              </button>
            )}
            {transaction.state === "delivered" && <p>Product delivered</p>}
            {loggedUser._id === transaction.equipment.owner && (
              <button
                hidden={transaction.state !== "delivered"}
                onClick={handleReturnedState}
              >
                Mark as returned
              </button>
            )}
            {transaction.state === "returned" && <p>Product returned</p>}
            <br />
            <br />
            <LinkContact
              owner={transaction.equipment.owner}
              client={transaction.client}
            />
          </>
        )}
      </Layout>
    </>
  );
}

export default TransactionDetails;
