import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import "./Table.css";


const CardTransactions = (props) => {
  const [transactions, setTransactions] = useState([]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    axios
      .get(`/cards/${props.cardID}/transactions`)
      .then((response) => setTransactions(response.data));
  }, [props.cardID]);

  const transactionTable = transactions.map((data) => {
    const formattedDate = new Date(data.created_at);
    return (
      
      <tr key={data.id}> 
        <td>{data.id}</td>
        <td>{formatter.format(data.amount / 100)}</td>
        <td>{formattedDate.toDateString()}</td>
      </tr>
    );
    
  });
  return (
    <section className="transaction-container">
      <h2>Transaction History</h2>
      <Table tableData={transactions}/>
    </section>
  );
};

export default CardTransactions;
