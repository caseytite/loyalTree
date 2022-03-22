import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LoggedInUser from '../context/AuthContext';

import GiftCardListItem from '../components/GiftCardListItem';

const Cards = () => {
  const [cards, setCards] = useState([]);
  // const params = useParams();
  const context = useContext(LoggedInUser);

  useEffect(() => {
    axios.get(`/cards`).then((res) => {
      setCards(res.data.data);
    });
  }, []);
  const cardList = cards.map((card) => {
    return <GiftCardListItem key={card.giftcard_id} {...card} />;
  });

  return (
    <>
      <h2>List of user's cards</h2>
      <div className="card-list">{cardList}</div>
    </>
  );
};

export default Cards;
