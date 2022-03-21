import React, { useRef } from "react";

import QrScanner from "qr-scanner";
import Button from "./Button";
import "./Scanner.css";

const Scanner = (props) => {
  const previewEl = useRef(null);

  let qrScanner = null;

  function scanCode(e) {
    //event listener function
    e.preventDefault();
    qrScanner = new QrScanner(previewEl.current, (result) => {
      if (result) {
        console.log("decoded qr code:", result);
        // qrScanner.stop()
        qrScanner.destroy();
        // make select query
      }
    });
    qrScanner.start();
  }

  return (
    <div className="scanner">
      <h2>Scan QR Code Below</h2>
      <Button onClick={(e) => scanCode(e)} children={"Click to scan"} />
      <video ref={previewEl}></video>
    </div>
  );
};

export default Scanner;
