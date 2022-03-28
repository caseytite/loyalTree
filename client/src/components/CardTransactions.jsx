import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import "./Table.css";


const CardTransactions = (props) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`/cards/${props.cardID}/transactions`)
      .then((response) => setTransactions(response.data));
  }, [props.cardID]);

  return (
    <section className="transaction-container">
      <h2>Transaction History</h2>
      <Table tableData={transactions}/>
    </section>
  );
};

export default CardTransactions;
