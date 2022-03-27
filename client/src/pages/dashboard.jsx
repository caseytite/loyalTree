import { useState, useEffect } from "react";
import axios from "axios";
import Scanner from "../components/Scanner";
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(storeInfo.photo_url )
  console.log(transactions);
  // while building dashboard
  // console.log(storeInfo);

  return (
    <div className="dashboard">
      <h2>{`Dashboard » ${storeInfo.name}`}</h2>
      <Scanner />
      {transactions.length ? (
        <section className="transactions-table">
          <h2>Transaction History</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
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
        </section>
      ) : (
        <h2>No transaction history</h2>
      )}
    </div>
  );
};

export default Dashboard;
