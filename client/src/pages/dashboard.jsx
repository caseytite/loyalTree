import { useState, useEffect } from "react";
import axios from "axios";
import Scanner from "../components/Scanner";
// import TransactionListItem from "../components/TransactionListItem";
import "./dashboard.css";
import Button from "../components/Button";
import Table from "../components/Table";
import "../components/Table.css";

const Dashboard = (props) => {
  const [storeInfo, setStoreInfo] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [view, setView] = useState({ redeem: false, transactions: false });

  useEffect(() => {
    const promiseOne = axios.get("/dashboard");
    const promiseTwo = axios.get("/dashboard/transactions");
    Promise.all([promiseOne, promiseTwo]).then((values) => {
      setStoreInfo(values[0].data);
      setTransactions(values[1].data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleView = (e) => {
    if (e.target.innerText === "Redeem a Card") {
      setView((prev) => {
        return { ...view, redeem: !prev.redeem };
      });
    }
    if (e.target.innerText === "View Transaction History") {
      setView((prev) => {
        return { ...view, transactions: !prev.transactions };
      });
    }
  };
 

  return (
    <div className="dashboard">
      <img src={storeInfo.photo_url} alt="" className="store-list-img" />
      <h2>{`Dashboard » ${storeInfo.name}`}</h2>
      <Button onClick={toggleView} children="Redeem a Card" />
      {view.redeem && <Scanner />}
      <Button onClick={toggleView} children="View Transaction History" />

      {view.transactions ? transactions.length ? (
        <section className="transaction-container">
          <h2>Transaction History</h2>
          <Table tableData={transactions} />
          {/* <table>
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
          </table> */}
        </section>
      ) : (
        <h2>No transaction history</h2>
      ) : undefined}
    </div>
  );
};

export default Dashboard;
