import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SheetTransaction from "../components/SheetTransaction";
import { getTransactionDetailsService } from "../services/transactions.services";

function TransactionDetails() {
  const redirect = useNavigate();
  const params = useParams();
  const { transactionId } = params;
  const [transaction, setTransaction] = useState();
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

  return (
    <>
      <header>
        <Link to="/">Home</Link> <Link to="/dashboard">Dashboard</Link>
      </header>
      <main>
        {!isFetching && <SheetTransaction transaction={transaction} />}
      </main>
    </>
  );
}

export default TransactionDetails;
