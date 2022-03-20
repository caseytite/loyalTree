import React, { useRef, useEffect } from 'react'
import QRCode from 'qrcode'

import './CodeView.css'

const CodeView = props => {
  const codeEl = useRef()

  useEffect(() => {
    QRCode.toCanvas(codeEl.current, props.cardID, { width: 400 })
  }, [props.cardID])
  
  return <canvas ref={codeEl}></canvas>
}

export default CodeView
