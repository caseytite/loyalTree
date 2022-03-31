import "../components/GiftCardListItem.css";
import { useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CodeView from "../components/CodeView";
import Button from "../components/Button";
import CreditCard from "../components/CreditCard";
import axios from "axios";
import LoggedInUser from "../context/AuthContext";

import GiftCardListItem from "../components/GiftCardListItem";

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
  const [transferForm, showTransferForm] = useState();
  const context = useContext(LoggedInUser);
  let navigate = useNavigate();

  // const formatter = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

  const onPay = (email, amount) => {
    const id = params.id;
    axios
      .put(`/cards/${id}/topup`, {
        email,
        amount: amount,
        user_id: id,
        store_id,
      })
      .then((res) => {
        setText("Processing");
        setTimeout(() => {
          setText("Thanks KV!!!");
          setTimeout(() => {
            window.location = "/cards";
            // navigate("/cards");
          }, 1000);
        }, 1000);
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
        }, 1000);
      }, 1000);
    });
  };
  console.log(gift_card_id);
  return (
    <div className="single-card-content">
      {!qrCode && (
        <div>
          <p className="store-name">{name}</p>
          <div className="stores-list">
            <GiftCardListItem
              photo_url={photo_url}
              address={address}
              balance={balance}
              city={city}
              redeem_at={redeem_at}
              point_balance={point_balance}
              name={name}
            />
          </div>
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
      {!qrCode && (
        <Button onClick={() => showTransferForm(!transferForm)}>
          Transfer
        </Button>
      )}
      {!qrCode && <Button onClick={() => setCard(!card)}>Top up</Button>}
      {transferForm && (
        <CreditCard
          header="Transfer your balance to a friend"
          closeCard={showTransferForm}
          onPay={onTransfer}
          text={text}
          setText={setText}
        />
      )}
      {card && (
        <CreditCard
          header="Add to your balance"
          text={text}
          setText={setText}
          closeCard={setCard}
          open={card}
          onPay={onPay}
        />
      )}
      {!qrCode && <CardTransactions key={params.id} cardID={params.id} />}
    </div>
  );
};
export default SingleGiftCard;
