import React, { useRef, useEffect } from "react";
import QRCode from "qrcode";

import "./CodeView.css";

const CodeView = (props) => {
  const { qrCode, setQrCode } = props;
  const codeEl = useRef(null);

  useEffect(() => {
    QRCode.toCanvas(codeEl.current, props.cardID, { width: 300 });
  }, [props.cardID]);

  return (
    <div className="modal" onClick={() => setQrCode(!qrCode)}>
      <div className="modal-content">
        <canvas ref={codeEl}></canvas>
      </div>
    </div>
  );
};

export default CodeView;
