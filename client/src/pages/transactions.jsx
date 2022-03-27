import { useContext, useEffect, useState } from "react";
import axios from "axios";
import TransactionListItem from "../components/TransactionListItem";
import LoggedInUser from "../context/AuthContext";

const Transactions = (props) => {
  const [transactions, setTransactions] = useState([]);
  const context = useContext(LoggedInUser);

  useEffect(() => {
    axios.get("/transactions").then((res) => {
      setTransactions(res.data.data);
    });
  }, []);
  const currentStore = localStorage.getItem("store");
  console.log(+currentStore);
  const transactionsArr = transactions.map((transaction) => {
    return (
      transaction.store_id === +currentStore && (
        <TransactionListItem
          key={transaction.id}
          amount={transaction.amount}
          storeId={transaction.store_id}
          date={transaction.created_at}
        />
      )
    );
  });

  return (
    <>
      <h1>Transactions</h1>
      {transactionsArr}
    </>
  );
};

export default Transactions;
