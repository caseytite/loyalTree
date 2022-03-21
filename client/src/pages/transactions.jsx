import { useEffect, useState } from "react";
import axios from "axios";
import TransactionListItem from "../components/TransactionListItem";

const Transactions = (props) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("/transactions").then((res) => {
      setTransactions(res.data.data);
    });
  }, []);

  const transactionsArr = transactions.map((transaction) => {
    return (
      <TransactionListItem
        key={transaction.id}
        amount={transaction.amount}
        storeId={transaction.store_id}
        date={transaction.created_at}
      />
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
