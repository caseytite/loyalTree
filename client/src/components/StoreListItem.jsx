import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import axios from 'axios'
import './StoreListItem.css'

function StoreListItem(props) {
  let navigate = useNavigate()

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
  } = props

  const onAdd = (e) => {
    const amount = e.target.innerHTML
    setAmount(amount)
  }

  const getStoreDetails = (name) => {
    showDetail(name)

    // we may not need this axios request it looks possible to do it just with state
    // just keeping this here incase it becomes needed

    // axios
    //   .get('/store/detail', { params: { name } })
    //   .then((res) => {
    //     console.log(res.data.data)
    //     // how do we do a redirect here to go to another page??
    //   })
    //   .catch((err) => console.log(err.message))
  }

  return (
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
      {detail && (
        <div>
          <h3>Enter an amount</h3>
          <input></input>
          <Button>Purchase</Button>
        </div>
      )}
      {/* <footer className="store-list-foot">
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
      </footer> */}
    </article>
  )
}

export default StoreListItem
