import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";
import Scanner from "../components/Scanner";
import { useNavigate } from "react-router-dom";
import TransactionListItem from "../components/TransactionListItem";
import "./dashboard.css";

const Dashboard = (props) => {
  const [storeInfo, setStoreInfo] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const promiseOne = axios.get("/dashboard");
    const promiseTwo = axios.get("/dashboard/transactions");
    Promise.all([promiseOne, promiseTwo]).then((values) => {
      setStoreInfo(values[0].data);
      setTransactions(values[1].data.data);
    });
    console.log(storeInfo);
  }, []);
  
  console.log(transactions);
  // while building dashboard
  // console.log(storeInfo);

  return (
    <>
      <div className="dashboard">
        <h2>{`Dashboard » ${storeInfo.name}`}</h2>
        <Scanner />
      </div>
      {transactions.length> 1 ? <section className="transactions-table">
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Transaction Number</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {transactions.map((transaction) => (
            <TransactionListItem
              key={transaction.id}
              id={transaction.id}
              amount={Math.abs(transaction.amount)}
              storeId={transaction.store_id}
              date={transaction.created_at}
            />
          ))}
          </tbody>
        </table>
      </section>: <h2>No transaction history</h2>}
    </>
  );
};

export default Dashboard;
