import React, { useRef, useState, useEffect } from "react";

import axios from "axios";
import QrScanner from "qr-scanner";
import Button from "./Button";
import "./Scanner.css";

const Scanner = (props) => {
  const previewEl = useRef(null);
  const outputEl = useRef(null);
  const qrScanner = useRef(null);
  const [cardAmt, setCardAmt] = useState(null);
  const [error, setError] = useState(null);
  const [transAmt, setTransAmt] = useState("");
  const [cardID, setCardID] = useState(null);
  const [transaction, setTransaction] = useState();
  const [day, setDay] = useState();
  const [scanBtnText, setScanBtnText] = useState("Click to Scan");
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    qrScanner.current = new QrScanner(previewEl.current, (result) => {
      console.log("decoded qr code:", result);
      qrScanner.stop();
      setCardID(result);
      axios
        .get("/dashboard/redeem", { params: { cardID: result } })
        .then((response) => {
          console.log(response.data);
          return response.data.error
            ? setError(response.data.error)
            : setCardAmt(response.data.balance);
        });
    });
  }, []);

  const scanButtonFunction = () => {
    const cancelScan = () => {
      qrScanner.current.stop();
      setIsScanning(false);
      setScanBtnText("Click to Scan");
    };

    const startScan = () => {
      setScanBtnText("Cancel Scan");
      setIsScanning(true);
      setError(null);
      setCardAmt(null);
      qrScanner.current.start();
    };

    isScanning ? cancelScan() : startScan();
  };

  const acceptTransaction = () => {
    axios
      .post("/dashboard/redeem", {
        cardID,
        transAmt,
        cardAmt,
      })
      .then((response) => {
        console.log("Success! Axios response:", response.data);
        setCardAmt(null);
        setError(null);
        setTransAmt("");
        setCardID(null);
        const time = new Date(response.data.created_at);
        setDay(time.toDateString());
        setTransaction(response.data);
      });
  };

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
      <Button onClick={scanButtonFunction} children={scanBtnText} />
      {cardAmt && (
        <Button onClick={acceptTransaction} children={"Accept transaction"} />
      )}
      {error && <p>{error}</p>}
      <video className={"" + (isScanning ? "" : "hide")} ref={previewEl}></video>
      {transaction && (
        <div className="transaction-container">
          <h3>Transaction Details</h3>
          <div className="transaction-details">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{transaction.id}</td>
                  <td>${(transaction.amount / 100) * -1}</td>
                  <td>{day}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;
