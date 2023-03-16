import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SheetTransaction from "../components/SheetTransaction";
import { AuthContext } from "../context/auth.context";
import {
  getTransactionDetailsService,
  updateTransactionStateService,
} from "../services/transactions.services";
import LinkContact from "../components/LinkContact";
import { updateEquipmentService } from "../services/equipment.services";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavItem";

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

      const newState = isDelivered ? "succeeded" : "delivered";

      const response = await updateTransactionStateService(transactionId, {
        state: newState,
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

      const newState = isReturned ? "delivered" : "returned";

      const response = await updateTransactionStateService(transactionId, {
        state: newState,
      });

      if (newState === "returned") {
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
      <NavBar>
        <NavItem path="/">Home</NavItem>{" "}
        <NavItem path="/dashboard">Dashboard</NavItem>
      </NavBar>
      <Layout>
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
      </Layout>
    </>
  );
}

export default TransactionDetails;
