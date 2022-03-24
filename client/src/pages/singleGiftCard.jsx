import "../components/GiftCardListItem.css";
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CodeView from "../components/CodeView";
import Button from "../components/Button";
import CreditCard from "../components/CreditCard";
import axios from "axios";
import LoggedInUser from "../context/AuthContext";

const SingleGiftCard = (props) => {
  const { state } = useLocation();
  const {
    name,
    photo_url,
    point_balance,
    redeem_at,
    balance,
    address,
    city,
    gift_card_id,
    store_id,
  } = state;

  const [card, setCard] = useState(false);
  const [text, setText] = useState("Place Order");
  const [qrCode, setQrCode] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const context = useContext(LoggedInUser);
  let navigate = useNavigate();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const onPay = (email, amount) => {
    const id = context.userID;
    axios
      .post(`/cards/${id}`, {
        email,
        balance: amount,
        user_id: id,
        store_id,
      })
      .then((res) => {
        setText("Processing");
        setTimeout(() => {
          setText("Thanks KV!!!");
          setTimeout(() => {
            navigate("/stores");
          }, 2000);
        }, 2000);
      })

      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    axios
      .get(`/cards/${state.gift_card_id}/transactions`)
      .then((response) => setTransactions(response.data));
  }, [state.gift_card_id]);

  // map to render transaction table rows
  const transactionTable = transactions.map((data) => {
    const formattedDate = new Date(data.created_at);
    return (
      <tr>
        <td>{formatter.format(data.amount / 100)}</td>
        <td>{formattedDate.toLocaleString()}</td>
      </tr>
    );
  });

  return (
    <div className="single-card-content">
      {!qrCode && (
        <div>
          <p className="store-name">{name}</p>
          <article
            className="gift-card"
            style={{
              backgroundImage: `url(${photo_url})`,
            }}
          >
            <header>
              {redeem_at > 0 && (
                <>
                  <div className="points">
                    <p>{point_balance}</p>
                    <div className="points-total">
                      {/* <p>/</p> */}
                      <p>/ {redeem_at}</p>
                    </div>
                  </div>
                </>
              )}
              {balance > 0 && (
                <div className="card-balance">
                  <p>{formatter.format(balance / 100)}</p>
                </div>
              )}
            </header>
            <footer>
              <p>{address}</p>
              <p>{city}</p>
            </footer>
          </article>
        </div>
      )}
      {qrCode && (
        <CodeView
          setQrCode={setQrCode}
          qrCode={qrCode}
          cardID={gift_card_id.toString()}
        />
      )}
      {!qrCode && (
        <Button onClick={() => setQrCode(!qrCode)}>See QR Code</Button>
      )}
      {!qrCode && <Button onClick={() => setCard(!card)}>Buy More</Button>}
      {card && (
        <CreditCard
          className="single-card-checkout"
          text={text}
          setText={setText}
          closeCard={setCard}
          open={card}
          onPay={onPay}
        />
      )}
      <div className="transaction-list">
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{transactionTable}</tbody>
        </table>
      </div>
    </div>
  );
};
// open={card} closeCard={setCard} onPay={onPay}
export default SingleGiftCard;
