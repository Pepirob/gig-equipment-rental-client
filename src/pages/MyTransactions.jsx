import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListTransactions from "../components/ListTransactions";
import NavigationMain from "../components/NavigationMain";
import { AuthContext } from "../context/auth.context";
import { getTransactionsService } from "../services/transactions.services";
import Layout from "../components/Layout/Layout";
import Row from "react-bootstrap/Row";
import PulseLoader from "react-spinners/PulseLoader";

function MyTransactions() {
  const redirect = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await getTransactionsService();
      setTransactions(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  const transactionsAsOwner = transactions.filter((transaction) => {
    return transaction.equipment.owner === loggedUser._id;
  });

  const transactionsAsClient = transactions.filter((transaction) => {
    return transaction.client === loggedUser._id;
  });

  return (
    <>
      <NavigationMain />
      <Layout>
        <h1>My Transactions</h1>
        {isFetching ? (
          <PulseLoader aria-label="Loading Spinner" data-testid="loader" />
        ) : (
          <>
            {transactions.length ? (
              <>
                {transactionsAsOwner.length ? (
                  <Row as="section">
                    <h2>As Owner</h2>
                    <ListTransactions transactions={transactionsAsOwner} />
                  </Row>
                ) : null}
                {transactionsAsClient.length ? (
                  <Row as="section">
                    <h2>As Client</h2>
                    <ListTransactions transactions={transactionsAsClient} />
                  </Row>
                ) : null}
              </>
            ) : (
              <h2>You have no transactions</h2>
            )}
          </>
        )}
      </Layout>
    </>
  );
}

export default MyTransactions;
