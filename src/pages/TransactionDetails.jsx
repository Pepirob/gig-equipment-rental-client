import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SheetTransaction from "../components/SheetTransaction";
import { AuthContext } from "../context/auth.context";
import {
  getTransactionDetailsService,
  updateTransactionStateService,
} from "../services/transactions.services";

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
      <main>
        {!isFetching && <SheetTransaction transaction={transaction} />}
        {!isFetching && loggedUser._id === transaction.client && (
          <button
            hidden={transaction.state === "delivered"}
            onClick={handleDeliveredState}
          >
            Mark as delivered
          </button>
        )}
        {!isFetching && transaction.state === "delivered" && (
          <p>Product delivered</p>
        )}
        {!isFetching && loggedUser._id === transaction.equipment.owner && (
          <button
            hidden={transaction.state === "returned"}
            onClick={handleReturnedState}
          >
            Mark as returned
          </button>
        )}
        {!isFetching && transaction.state === "returned" && (
          <p>Product returned</p>
        )}
      </main>
    </>
  );
}

export default TransactionDetails;
