import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';
import './StoreListItem.css';
import CreditCard from './CreditCard';
import LoggedInUser from '../context/AuthContext';
import { useParams } from 'react-router-dom';

function StoreListItem(props) {
  let navigate = useNavigate();
  const context = useContext(LoggedInUser);
  const params = useParams();

  const {
    storeID,
    storeName,
    description,
    address,
    category,
    photo,
    setAmount,
    showDetail,
    detail,
  } = props;

  const [card, setCard] = useState(false);
  // console.log(context.user.store_id);
  const currentStore = localStorage.getItem('store');

  const handletrans = () => {
    axios.get(`/transactions/${params.id}/${context.user.id}`).then((res) => {
      navigate(`/transactions/${params.id}/${context.user.id}`);
    });
  };
  return (
    <>
      <article
        className="store-list-item"
        onClick={() => navigate(`/stores/${storeID}`)}
      >
        <div className="store-list-top">
          <h1>{storeName}</h1>
          <h3>{address}</h3>
        </div>
        <div className="store-list-cont">
          <div>
            <img className="store-list-img" src={photo} alt={category} />
            <div className="store-description">
              <h2>About Us!</h2>
              <h3>{description}</h3>
            </div>
          </div>

          <div>
            {detail && <Button onClick={() => setCard(!card)}>Purchase</Button>}
          </div>
        </div>
        {+currentStore === storeID && detail && (
          <Button onClick={() => handletrans()}>check transactions</Button>
        )}
      </article>
      {card && <CreditCard open={card} closeCard={setCard} />}
    </>
  );
}

export default StoreListItem;
