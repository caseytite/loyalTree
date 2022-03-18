import React from 'react'
import SearchBar from './SearchBar'
import StoreListItem from './StoreListItem'

function StoreList(props) {
  return (
    <div>
      <SearchBar/>
      <StoreListItem/>
    </div>
  )
}

export default StoreList