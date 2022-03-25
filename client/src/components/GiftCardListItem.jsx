import axios from "axios";
import React from "react";
import "./GiftCardListItem.css";
import { useNavigate } from "react-router-dom";

function GiftCardListItem(props) {
  const {
    address,
    balance,
    city,
    photo_url,
    point_balance,
    redeem_at,
    store_id,
    name,
    gift_card_id,
  } = props;

  const navigate = useNavigate();

  const getCard = (id) => {
    axios
      .get(`/cards/${gift_card_id}`)
      .then((res) => {
        //navigates to card to show single card how to pass data?
        navigate(`/cards/${gift_card_id}`, {
          state: {
            name,
            photo_url,
            point_balance,
            redeem_at,
            balance,
            store_id,
            address,
            city,
            gift_card_id,
          },
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div key={gift_card_id} onClick={() => getCard(gift_card_id)}>
      <p className="store-name">{name}</p>
      <article
        className="gift-card"
        style={{
          backgroundImage: `url(${photo_url})`,
        }}
      >
      </article>
    </div>
  );
}

export default GiftCardListItem;
