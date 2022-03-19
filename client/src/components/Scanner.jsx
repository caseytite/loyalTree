import React from "react";

import QrScanner from "qr-scanner";

const Scanner = (props) => {

  function scanCode(e) {
    e.preventDefault();
    const scanPreviewElement = document.querySelector("#qr-preview");
    const qrScanner = new QrScanner(scanPreviewElement, (result) => {
      if (result) {
        console.log("decoded qr code:", result)
        // qrScanner.stop()
        qrScanner.destroy()
        // make select query
      }
    }
    );
    qrScanner.start();
  }

  return (
    <div id="qr-test">
      <h2>Scan QR Code Below</h2>
      <button onClick={scanCode}>Click to scan</button>
      <video id="qr-preview"></video>
    </div>
  );
};

export default Scanner;
