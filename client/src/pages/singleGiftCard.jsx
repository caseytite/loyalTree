import React, { useEffect, useState } from 'react';
import '../components/GiftCardListItem.css';
import GiftCardListItem from '../components/GiftCardListItem';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleGiftCard = () => {
  // const {
  //   address,
  //   balance,
  //   category,
  //   description,
  //   city,
  //   photo_url,
  //   point_balance,
  //   redeem_at,
  //   store_id,
  //   store_name,
  //   user_id,
  //   card_id,
  //   id,
  //   gift_card_id,
  // } = props;

  const params = useParams();
  console.log(params.id);
  const [card, setCard] = useState({});

  useEffect(() => {
    console.log('in effect');
    axios.get(`/gift_card/${params.id}`).then((res) => {
      const userCard = res.data.data[0];
      console.log(userCard);
      setCard(userCard);
    });
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div>
      <p className="store-name">{card.name}</p>
      <article
        className="gift-card"
        style={{
          backgroundImage: `url(${card.photo_url})`,
        }}
      >
        <header>
          {card.redeem_at > 0 && (
            <>
              <div className="points">
                <p>{card.point_balance}</p>
                <div className="points-total">
                  {/* <p>/</p> */}
                  <p>/ {card.redeem_at}</p>
                </div>
              </div>
            </>
          )}
          {card.balance > 0 && (
            <div className="card-balance">
              <p>{formatter.format(card.balance / 100)}</p>
            </div>
          )}
        </header>

        <footer>
          <p>{card.address}</p>
          <p>{card.city}</p>
        </footer>
      </article>
    </div>
  );
};

export default SingleGiftCard;
