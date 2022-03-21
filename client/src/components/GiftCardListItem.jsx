import React from "react";
// import Button from  './Button'
import "./GiftCardListItem.css";

function GiftCardListItem(props) {
  return (
    <div className="GiftCardListItem-card">
      <ul>
        <li>{props.firstName}'s Gift Card</li>
        <li>{props.storeName}</li>
        <li>
          <img
            className="giftcard-img"
            src={props.photo_url}
            alt={props.storeName}
          />
        </li>
      </ul>
      <div className="giftCard-description">
        <li>{props.description}</li>
        <li className="gc-balance">${props.balance}</li>
      </div>
    </div>
  );
}

export default GiftCardListItem;
