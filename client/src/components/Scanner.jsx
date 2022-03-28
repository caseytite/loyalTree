import React, { useRef, useState, useEffect } from "react";

import axios from "axios";
import QrScanner from "qr-scanner";
import Button from "./Button";
import "./Scanner.css";
import Table from "./Table";
import "./Table.css"

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
      cancelScan();
      setCardID(result);
      axios
        .get("/dashboard/redeem", { params: { cardID: result } })
        .then((response) => {
          return response.data.error
            ? setError(response.data.error)
            : setCardAmt(response.data.balance);
        });
    });
  }, []);

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

  const scanButtonFunction = () => {
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
        setTransaction([response.data]);
      });
    setIsScanning(false);
    setScanBtnText("Click to Scan");
  };

  return (
    <>
    <div className="scanner">
      <p>Enter the total from the sale, then scan the customer's card.</p>
      <div className="amounts" >
        <p>Sale Amount</p>
        <label htmlFor="redeem-amount">{transAmt || "--"}</label>
        <input
          value={transAmt}
          onChange={(e) => setTransAmt(e.target.value)}
          id="redeem-amount"
        />
        <p>Card Balance</p>
        <p ref={outputEl}>{cardAmt / 100 || "--"}</p>
      </div>

      {error && <p>{error}</p>}
      <Button onClick={scanButtonFunction} children={scanBtnText} />
      {cardAmt && (
        <Button onClick={acceptTransaction} children={"Accept transaction"} />
      )}
      <video
        className={"" + (isScanning ? "" : "hide")}
        ref={previewEl}
      ></video>
            </div>
      {transaction && (
        <section className="transaction-container">
          <h2>Transaction Details</h2>
            <Table tableData={transaction}/>
        </section>
      )}
    </>
  );
};

export default Scanner;
