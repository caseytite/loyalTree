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
    console.log('in cards get', context);
    axios.get(`/cards`, { params: { id: context.user.id } }).then((res) => {
      console.log(res.data.data);
      setCards(res.data.data);
    });
  }, []);

  const cardList = cards.map((card) => {
    return <GiftCardListItem key={card.card_id} {...card} />;
  });

  return (
    <>
      <h2>List of user's cards</h2>
      <div className="card-list">{cardList}</div>
    </>
  );
};

export default Cards;
