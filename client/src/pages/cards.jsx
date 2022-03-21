import {
  useState, useEffect
} from "react";
import axios from "axios";

import GiftCardListItem from "../components/GiftCardListItem";

const Cards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get("/cards").then((res) => {
      console.log(res.data.data);
      setCards(res.data.data);
    });
  }, [])

  const cardList = cards.map((card) => {
    return <GiftCardListItem />;
  });

  return (
    <>
      <h2>List of user's cards</h2>
      {cardList}
    </>
  );
};

export default Cards;
