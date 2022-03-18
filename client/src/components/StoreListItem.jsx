import React from 'react'
import Button from './Button'

function StoreListItem(props) {
  return (
    <div>
      {/* {Storedata} */}
      <Button>Details</Button>
      <Button>Add to Cart</Button>
    </div>
  )
}

export default StoreListItem