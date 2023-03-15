import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListTransactions from "../components/ListTransactions";
import Navigation from "../components/Navigation";
import { AuthContext } from "../context/auth.context";
import { getTransactionsService } from "../services/transactions.services";

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
  const transactionsAsProvider = transactions.filter((transaction) => {
    return transaction.equipment.owner === loggedUser._id;
  });

  const transactionsAsClient = transactions.filter((transaction) => {
    return transaction.client === loggedUser._id;
  });

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <h2>MyTransactions</h2>
        {isFetching ? (
          <h1>...Buscando</h1>
        ) : (
          <ul>
            <ListTransactions
              transactionsAsProvider={transactionsAsProvider}
              transactionsAsClient={transactionsAsClient}
            />
          </ul>
        )}
      </main>
    </>
  );
}

export default MyTransactions;
