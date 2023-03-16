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

function TransactionDetails() {
  const redirect = useNavigate();
  const params = useParams();
  const { loggedUser } = useContext(AuthContext);
  const { transactionId } = params;
  const [transaction, setTransaction] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isDelivered, setIsDelivered] = useState(false);
  const [isReturned, setIsReturned] = useState(false);

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

      const state = isDelivered ? "succeeded" : "delivered";

      const response = await updateTransactionStateService(transactionId, {
        state,
      });

      setIsFetching(false);
      setTransaction(response.data);
      setIsDelivered(response.data.state === "delivered");
    } catch (error) {
      redirect("/error");
    }
  };

  const handleReturnedState = async () => {
    try {
      setIsFetching(true);

      const state = isReturned ? "delivered" : "returned";

      const response = await updateTransactionStateService(transactionId, {
        state,
      });

      if (state === "returned") {
        await updateEquipmentService(transaction.equipment._id, {
          isAvailable: true,
        });
      } else {
        await updateEquipmentService(transaction.equipment._id, {
          isAvailable: false,
        });
      }

      setIsFetching(false);
      setTransaction(response.data);
      setIsReturned(response.data.state === "returned");
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
        {isFetching ? (
          <h2>...buscando</h2>
        ) : (
          <>
            <SheetTransaction transaction={transaction} />
            {loggedUser._id === transaction.client && (
              <button onClick={handleDeliveredState}>
                {isDelivered ? "Mark as succeeded" : "Mark as delivered"}
              </button>
            )}
            {loggedUser._id === transaction.equipment.owner && (
              <button onClick={handleReturnedState}>
                {isReturned ? "Mark as delivered" : "Mark as returned"}
              </button>
            )}
            <br />
            <br />
            <LinkContact
              owner={transaction.equipment.owner}
              client={transaction.client}
            />
          </>
        )}
      </main>
    </>
  );
}

export default TransactionDetails;
