import "./CreditCard.css";
import { useState } from "react";
import X from "./X";

//*****//    Design by: http://collectui.com/designers/pattiewaffle/checkout */

const Checkout = (props) => {
  const { closeCard, onPay, text, header } = props;
  const firstName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const [name, setName] = useState(firstName);
  const [card, setCard] = useState("4111111111111111");
  const [email, setEmail] = useState(userEmail);
  const [amount, setAmount] = useState("100");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("123");

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="checkout">
          <div className="checkout-container">
            <button className="close-btn" onClick={() => closeCard(!card)}>
              <X />
            </button>
            <h3>{header}</h3>
            <Input
              value={name}
              setValue={setName}
              label="Cardholder's Name"
              type="text"
              name="name"
            />
            <Input
              value={card}
              setValue={setCard}
              label="Card Number"
              type="number"
              name="card_number"
              imgSrc="https://seeklogo.com/images/V/visa-logo-6F4057663D-seeklogo.com.png"
            />
            <Input
              value={email}
              setValue={setEmail}
              label="Email"
              type="email"
              name="email"
            />
            <Input
              value={amount}
              setValue={setAmount}
              label="Amount"
              type="amount"
              name="amount"
            />
            <Input
              value={exp}
              setValue={setExp}
              label="Expiration Date"
              type="month"
              name="exp_date"
            />
            <Input
              value={cvv}
              setValue={setCvv}
              label="CVV"
              type="number"
              name="cvv"
            />
            <Button
              className="checkout-btn"
              onClick={() => onPay(email, amount)}
              text={text}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = (props) => {
  return (
    <div className="input">
      <label>{props.label}</label>
      <div className="input-field">
        <input
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
          type={props.type}
          name={props.name}
        />
        <img src={props.imgSrc} alt="" />
      </div>
    </div>
  );
};

const Button = (props) => {
  return (
    <button onClick={props.onClick} className="checkout-btn" type="button">
      {props.text}
    </button>
  );
};

export default Checkout;
