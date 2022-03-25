import React, { useRef, useState, } from "react";

import axios from "axios";
import QrScanner from "qr-scanner";
import Button from "./Button";
import "./Scanner.css";

const Scanner = (props) => {
  const previewEl = useRef(null);
  const outputEl = useRef(null);
  const [cardAmt, setCardAmt] = useState(null);
  const [error, setError] = useState(null);
  const [transAmt, setTransAmt] = useState("");
  const [cardID, setCardID] = useState(null);
  const [transaction, setTransaction] = useState();
  const [day, setDay] = useState();

  let qrScanner;

  const scanCode = () => {
    setError(null);
    setCardAmt(null);
    qrScanner = new QrScanner(previewEl.current, (result) => {
      console.log("decoded qr code:", result);
      qrScanner.destroy();
      qrScanner = null;
      setCardID(result);
      // make select query
      axios
        .get("/dashboard/redeem", { params: { cardID: result } })
        .then((response) => {
          console.log(response.data);
          return response.data.error
            ? setError(response.data.error)
            : setCardAmt(response.data.balance);
        });
    });
    qrScanner.start();
  };

  const acceptTransaction = () => {
    axios
      .post("/dashboard/redeem", {
        cardID,
        transAmt,
        cardAmt,
      })
      .then((response) => {
        console.log("Success!");
          console.log("post response", response.data);
          setCardAmt(null);
          setError(null);
          setTransAmt("");
          setCardID(null);
          const time = new Date(response.data.created_at); 
          setDay(time.toLocaleString());
          setTransaction(response.data);
        });
      };
      // console.log("transaction", transaction);
 
  
  return (
    <div className="scanner">
      <h2>Redeem from Gift Card</h2>
      <label htmlFor="redeem-amount">
        Transaction Amount:{" "}
        <input
          value={transAmt}
          onChange={(e) => setTransAmt(e.target.value)}
          id="redeem-amount"
        />
      </label>
      <p ref={outputEl} id="card-amount">{`Card Amount: $${
        cardAmt / 100 || "--"
      }`}</p>
      <Button onClick={scanCode} children={"Click to scan"} />
      {cardAmt && (
        <Button onClick={acceptTransaction} children={"Accept transaction"} />
      )}
      {error && <p>{error}</p>}
      <video ref={previewEl}></video>
       {transaction && <div className="transaction-container">
        <h3>Transaction Details</h3>
          <div className="transaction-details">
            <table>
              <tr>
                  <th>Transaction #</th> 
                  <th>Date</th> 
                  <th>Amount</th>
              </tr>  
              <tr>
              <td>{transaction.id}</td>  
              <td>{day}</td>  
              <td>{transaction.amount /100 * -1}</td>  
              </tr>   
            </table>
            
          </div>
       </div>}
    </div>
  );
};

export default Scanner;
