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
import Button from "react-bootstrap/Button";
import PulseLoader from "react-spinners/PulseLoader";

function TransactionDetails() {
  const redirect = useNavigate();
  const params = useParams();
  const { loggedUser } = useContext(AuthContext);
  const { transactionId } = params;
  const [transaction, setTransaction] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isDelivered, setIsDelivered] = useState(true);
  const [isReturned, setIsReturned] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getTransactionDetailsService(transactionId);

      setIsFetching(false);

      setTransaction(response.data);

      if (response.data.state === "succeeded") {
        setIsDelivered(false);
      } else {
        setIsDelivered(true);
      }
      if (response.data.state === "delivered") {
        setIsReturned(false);
      } else {
        setIsReturned(true);
      }
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
      setIsDelivered(!isDelivered);
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
      setIsReturned(!isReturned);
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <>
      <NavBar>
        <NavItem path="/dashboard">Dashboard</NavItem>
      </NavBar>
      <Layout>
        {isFetching ? (
          <PulseLoader aria-label="Loading Spinner" data-testid="loader" />
        ) : (
          <>
            <SheetTransaction transaction={transaction} />
            {loggedUser._id === transaction.client &&
              transaction.state !== "returned" && (
                <>
                  <h4>PLEASE INFORM US ABOUT THE STATE OF YOUR RENTAL</h4>
                  <Button
                    variant={isDelivered ? "danger" : "success"}
                    onClick={handleDeliveredState}
                  >
                    {isDelivered
                      ? "Mark as non delivered"
                      : "Mark as delivered"}
                  </Button>
                </>
              )}
            {loggedUser._id === transaction.equipment.owner && (
              <>
                <h4>PLEASE INFORM US ABOUT THE STATE OF YOUR RENTAL</h4>
                <Button
                  variant={isReturned ? "danger" : "success"}
                  onClick={handleReturnedState}
                >
                  {isReturned ? "Mark as non returned" : "Mark as returned"}
                </Button>
              </>
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
