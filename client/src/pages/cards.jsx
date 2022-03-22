import { useState, useEffect } from "react";
import axios from "axios";

import GiftCardListItem from "../components/GiftCardListItem";

const Cards = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(`/cards`).then((res) => {
      setCards(res.data.data);
    });
  }, []);

  const cardList = cards
    .filter((card) => {
      const regex = new RegExp(nameFilter, "gi");
      return regex.test(card.name) || regex.test(card.category);
    })
    .map((card) => {
      return <GiftCardListItem key={card.gift_card_id} {...card} />;
    });

  return (
    <div className="cards-list">
      <h2>List of user's cards</h2>
      <label htmlFor="name-filter">Filter: </label>
      <input
        id="name-filter"
        value={nameFilter}
        onChange={(e) => {
          setNameFilter(e.target.value);
        }}
      />
      <div className="card-list">{cardList}</div>
    </div>
  );
};

export default Cards;
