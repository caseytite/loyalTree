import React from "react";

const LoyaltreeComponent = (props) => {
  return (
    <div className="card gift-card">
      <h2>Gift Card</h2>
      <p>{props.text}</p>
      <button>Click here or else!</button>
    </div>
  );
};

export default LoyaltreeComponent;
