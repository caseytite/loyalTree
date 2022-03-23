import React, { useRef, useState } from "react";

import axios from "axios";
import QrScanner from "qr-scanner";
import Button from "./Button";
import "./Scanner.css";

const Scanner = (props) => {
  const previewEl = useRef(null);
  const outputEl = useRef(null);
  const [cardAmount, setCardAmount] = useState(null);
  const [error, setError] = useState(null);

  let qrScanner;

  const scanCode = () => {
    setError(null);
    setCardAmount(null);
    qrScanner = new QrScanner(previewEl.current, (result) => {
      console.log("decoded qr code:", result);
      qrScanner.destroy();
      qrScanner = null;

      // make select query
      axios
        .get("/dashboard/redeem", { params: { cardID: result } })
        .then((response) => {
          console.log(response.data);
          return response.data.error
            ? setError(response.data.error)
            : setCardAmount(response.data.balance);
        });
    });
    qrScanner.start();
  };

  return (
    <div className="scanner">
      <h2>Redeem from Gift Card</h2>
      <label htmlFor="redeem-amount">
        Transaction Amount: <input id="redeem-amount" />
      </label>
      <p ref={outputEl} id="card-amount">{`Card Amount: $${
        cardAmount / 100 || "--"
      }`}</p>
      {cardAmount && <Button children={"Accept transaction"} />}
      {error && <p>{error}</p>}
      <Button onClick={() => scanCode()} children={"Click to scan"} />
      <video ref={previewEl}></video>
    </div>
  );
};

export default Scanner;
