import React from "react";

import GiftCardListItem from "../components/GiftCardListItem";

export default {
  title: "Loyaltree/GiftCardListItem",
  component: GiftCardListItem,
};

const props = {
  address: "1432 Road Street",
  balance: 5525,
  category: "Restaurant",
  description:
    "A Restaurant for all the pizzas and some random flavour text as a test to see if stuff fits into this div",
  city: "Vancouver",
  photo_url:
    "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?cs=srgb&dl=pexels-narda-yescas-1566837.jpg&fm=jpg",
  point_balance: 3,
  redeem_at: 10,
  store_id: 8,
  store_name: "Pizza House",
  user_id: 1,
  card_id: 36,
};

export const Primary = () => {
  const props = {
    address: "1432 Road Street",
    balance: 5525,
    category: "Restaurant",
    description:
      "A Restaurant for all the pizzas and some random flavour text as a test to see if stuff fits into this div",
    city: "Vancouver",
    photo_url:
      "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?cs=srgb&dl=pexels-narda-yescas-1566837.jpg&fm=jpg",
    point_balance: 3,
    redeem_at: 10,
    store_id: 8,
    store_name: "Pizza House",
    user_id: 1,
    card_id: 36,
  };
  return <GiftCardListItem key={props.card_id} {...props} />;
};

export const Second = () => {
  const props = {
    address: "665 Westminster Interior Avenue",
    balance: 5525,
    category: "Restaurant",
    description:
      "A Restaurant for all the pizzas and some random flavour text as a test to see if stuff fits into this div",
    city: "Vancouver",
    photo_url:
      "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?cs=srgb&dl=pexels-narda-yescas-1566837.jpg&fm=jpg",
    point_balance: 0,
    redeem_at: 0,
    store_id: 8,
    store_name: "Pizza House",
    user_id: 1,
    card_id: 36,
  };
  return <GiftCardListItem key={props.card_id} {...props} />;
};