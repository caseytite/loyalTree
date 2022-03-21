import "./CreditCard.css";

//*****//    Design by: http://collectui.com/designers/pattiewaffle/checkout */

const Checkout = (props) => (
  <div className="checkout">
    <div className="checkout-container">
      <h3 className="heading-3">Credit card checkout</h3>
      <Input label="Cardholder's Name" type="text" name="name" />
      <Input
        label="Card Number"
        type="number"
        name="card_number"
        imgSrc="https://seeklogo.com/images/V/visa-logo-6F4057663D-seeklogo.com.png"
      />
      <div className="card-params">
        <Input label="Email" type="email" name="email" />
        <Input label="Amount" type="amount" name="amount" />
      </div>
      <div className="card-row">
        <Input label="Expiration Date" type="month" name="exp_date" />
        <Input label="CVV" type="number" name="cvv" />
      </div>
      <Button text="Place order" />
    </div>
  </div>
);

const Input = (props) => (
  <div className="input">
    <label>{props.label}</label>
    <div className="input-field">
      <input type={props.type} name={props.name} />
      <img src={props.imgSrc} />
    </div>
  </div>
);

const Button = (props) => (
  <button
    onClick={() => console.log("click")}
    className="checkout-btn"
    type="button"
  >
    {props.text}
  </button>
);

export default Checkout;
