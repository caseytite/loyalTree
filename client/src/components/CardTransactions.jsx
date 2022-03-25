import { useEffect, useState } from "react";
import axios from "axios";

import './CardTransactions.css'

const CardTransactions = (props) => {
  const [transactions, setTransactions] = useState([]);
  console.log({transactions} )

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
      <tr>
        <td>{formatter.format(data.amount / 100)}</td>
        <td>{formattedDate.toDateString()}</td>
      </tr>
    );
  });

  return (
      <div className="transaction-list">
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{transactionTable}</tbody>
        </table>
      </div>
  );
};

export default CardTransactions;
