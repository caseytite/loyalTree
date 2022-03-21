import React from "react";
import "./Button.css";

function Button(props) {
  const { children } = props;

  return (
    <button onClick={props.onClick} className="button-confirm">
      {children}
    </button>
  );
}

export default Button;
