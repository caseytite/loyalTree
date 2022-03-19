import React from "react"

import GiftCardListItem from "../components/GiftCardListItem"

export default {
  title: "Loyaltree/GiftCardListItem",
  component: GiftCardListItem,
}

const giftCardArr = 
  {
    id: 1,
    user_id: 1,
    balance: 50,
    store_id: 8,
    created_at: "2022-03-18T18:20:29.973Z",
    edited_at: "2022-03-18T18:20:29.973Z",
    first_name: "Chris",
    last_name: "Bell",
    password: "password",
    email: "chris@example.com",
    isstoreowner: true,
    city: "Vancouver",
    owner_id: 10,
    name: "Pizza House",
    category: "Restaurant",
    description: "A Restaurant for all the pizzas and some random flavour text as a test to see if stuff fits into this div",
    photo_url:
      "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?cs=srgb&dl=pexels-narda-yescas-1566837.jpg&fm=jpg",
    address: "1432 store street",
  }


export const Primary = (props) => {

  const {first_name, name, balance,  description, photo_url} = giftCardArr


  return (
  <GiftCardListItem 
             storeName={name} 
             balance={balance} 
             description={description} 
             photo_url={photo_url} 
             firstName={first_name}
             />
  )
}
