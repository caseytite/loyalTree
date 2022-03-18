import React from 'react'
import UserCardListItem from './UserCardListItem'
import SearchBar from './SearchBar'
import GiftCard from './GiftCard'
import Button from './Button'
import './UserCardList.css'

const UserCardList = () => {
  return (
    <div className='user-card-list'>
      <UserCardListItem/>
      <SearchBar/>
      <GiftCard/>
      <Button/>
    </div>
  )
}

export default UserCardList