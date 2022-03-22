import './CreditCard.css';
import { useState, useContext } from 'react';
import LoggedInUser from '../context/AuthContext';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import X from './X';

//*****//    Design by: http://collectui.com/designers/pattiewaffle/checkout */

const Checkout = (props) => {
  const { closeCard } = props;
  const context = useContext(LoggedInUser);
  const navigate = useNavigate();
  const [name, setName] = useState(context.user.first_name);
  const [card, setCard] = useState('1234123412341234');
  const [email, setEmail] = useState(context.user.email);
  const [amount, setAmount] = useState('100');
  const [exp, setExp] = useState('');
  const [cvv, setCvv] = useState('123');
  const [text, setText] = useState('Place Order');
  const params = useParams();

  const handlePayment = () => {
    const id = context.user.id;
    axios
      .post(`/cards/${id}`, {
        email,
        balance: amount,
        user_id: id,
        store_id: params.id,
      })
      .then((res) => {
        console.log('in process');
        setText('Processing');
        setTimeout(() => {
          setAmount('');
          setName('');
          setCard('');
          setEmail('');
          setCvv('');
          setExp('');
          setText('Thank you for your purchase!');
          setTimeout(() => {
            navigate('/stores');
          }, 1000);
        }, 1000);
      })

      .catch((err) => console.log(err.message));
  };

  return (
    <div className="checkout">
      <div className="checkout-container">
        <button className="close-btn" onClick={() => closeCard(false)}>
          <X />
        </button>
        <h3 className="heading-3">Credit card checkout</h3>
        <Input
          value={name}
          setValue={setName}
          label="Cardholder's Name"
          type="text"
          name="name"
          placeHolder="Casey"
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
        <Button className="checkout-btn" onClick={handlePayment} text={text} />
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
        <img src={props.imgSrc} />
      </div>
    </div>
  );
};

const Button = (props) => (
  <button onClick={props.onClick} className="checkout-btn" type="button">
    {props.text}
  </button>
);

export default Checkout;
