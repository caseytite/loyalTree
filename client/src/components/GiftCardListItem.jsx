import axios from 'axios';
import React from 'react';
// import Button from  './Button'
import './GiftCardListItem.css';

function GiftCardListItem(props) {
  const {
    address,
    balance,
    category,
    description,
    city,
    photo_url,
    point_balance,
    redeem_at,
    store_id,
    store_name,
    user_id,
    card_id,
    id,
    gift_card_id,
  } = props;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const getCard = (id) => {
    console.log(id);
    axios
      .get('/card', { params: { id } })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  };

  return (
    <div onClick={() => getCard(gift_card_id)}>
      <p className="store-name">{store_name}</p>
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
  );
}

export default GiftCardListItem;
