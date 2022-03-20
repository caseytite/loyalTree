import React from 'react'
import Button from './Button'
import './StoreListItem.css'

function StoreListItem(props) {
  const {
    storeName,
    description,
    address,
    category,
    photo,
    setAmount,
  } = props
  const onAdd = (e) => {
    const amount = e.target.innerHTML
    setAmount(amount)
  }

  return (
    <article className="store-list-item">
      <div className="store-list-top">
        <h1>{storeName}</h1>
        <h3>{address}</h3>
      </div>
      <div className="store-list-cont">
        <div>
          <img
            className="store-list-img"
            src={photo}
            alt={category}
          />
          <div className="store-description">
            <h2>About Us!</h2>
            <h3>{description}</h3>
          </div>
        </div>
      </div>
      <footer className="store-list-foot">
        <Button className="store-list-btn" onClick={onAdd}>
          10
        </Button>
        <Button className="store-list-btn" onClick={onAdd}>
          20
        </Button>
        <Button className="store-list-btn" onClick={onAdd}>
          30
        </Button>
        <Button className="store-list-btn" onClick={onAdd}>
          40
        </Button>
      </footer>
    </article>
  )
}

export default StoreListItem
