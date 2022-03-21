import React from "react";
import GiftCardListItem from "./GiftCarListItem";
import "./GiftCardList.css";

const GiftCardList = (props) => {
  return (
    <div className="gift-card-list">
      <GiftCardListItem />
    </div>
  );
};

export default GiftCardList;
