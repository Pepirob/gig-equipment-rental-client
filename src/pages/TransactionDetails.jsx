import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SheetTransaction from "../components/SheetTransaction";
import {
  getTransactionDetailsService,
  updateTransactionStateService,
} from "../services/transactions.services";

function TransactionDetails() {
  const redirect = useNavigate();
  const params = useParams();
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

  return (
    <>
      <header>
        <Link to="/">Home</Link> <Link to="/dashboard">Dashboard</Link>
      </header>
      <main>
        {!isFetching && <SheetTransaction transaction={transaction} />}
        {!isFetching && transaction.state === "delivered" ? (
          <p>Equipment delivered</p>
        ) : (
          <button onClick={handleDeliveredState}>Mark as delivered</button>
        )}
      </main>
    </>
  );
}

export default TransactionDetails;
