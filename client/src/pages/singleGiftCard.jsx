import "../components/GiftCardListItem.css";
import { useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CodeView from "../components/CodeView";
import Button from "../components/Button";
import CreditCard from "../components/CreditCard";
import axios from "axios";
import LoggedInUser from "../context/AuthContext";
import CardTransactions from "../components/CardTransactions";

const SingleGiftCard = (props) => {
  let params = useParams();
  
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
      <CardTransactions key={params.id} cardID={params.id} />
    </div>
  );
};
// open={card} closeCard={setCard} onPay={onPay}
export default SingleGiftCard;
