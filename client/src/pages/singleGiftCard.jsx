import "../components/GiftCardListItem.css";
import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import CodeView from "../components/CodeView";
import Button from "../components/Button";
import CreditCard from "../components/CreditCard";
import axios from "axios";
import LoggedInUser from "../context/AuthContext";
import GiftCardListItem from "../components/GiftCardListItem";

const SingleGiftCard = () => {
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
  const [transferForm, showTransferForm] = useState();
  const context = useContext(LoggedInUser);
  let navigate = useNavigate();
  const params = useParams();

  // const formatter = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });
  const onPay = (email, amount) => {
    const id = params.id;
    axios
      .put(`/cards/${id}/topup`, {
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
            navigate("/cards");
          }, 2000);
        }, 2000);
      })

      .catch((err) => console.log(err.message));
  };

  const onTransfer = (email, amount) => {
    const id = params.id;
    axios.put(`/cards/${id}`, { amount, email }).then((res) => {
      setText("Processing");
      setTimeout(() => {
        setText("Thanks KV!!!");
        setTimeout(() => {
          navigate("/cards");
        }, 2000);
      }, 2000);
    });
  };

  return (
    <div className="single-card-content">
      {!qrCode && (
        <div>
          <p className="store-name">{name}</p>
          <GiftCardListItem
            photo_url={photo_url}
            address={address}
            balance={balance}
            city={city}
            redeem_at={redeem_at}
            point_balance={point_balance}
          />
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
      <Button onClick={() => showTransferForm(!transferForm)}>Transfer</Button>
      {!qrCode && <Button onClick={() => setCard(!card)}>Top up</Button>}
      {transferForm && (
        <CreditCard
          closeCard={showTransferForm}
          onPay={onTransfer}
          text={text}
          setText={setText}
        />
      )}
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
    </div>
  );
};
export default SingleGiftCard;
