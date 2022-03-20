import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import StoreListItem from '../components/StoreListItem'

const StoreDetails = props => {
  const [store, setStore] = useState({})
  const params = useParams()

  // not working, backend not ready
  useEffect(() => {
    axios.get(`/stores/${params.id}`).then(res => {
      console.log(res.data)
      // setStore(res.data.data)
    })
  }, [params.id])

  return (
    <StoreListItem
      key={store.id}
      storeID={store.id}
      storeName={store.name}
      address={store.address}
      photo={store.photo_url}
      description={store.description}
      category={store.category}
      // setAmount={setAmount}
      // showDetail={showDetail}
      // detail={detail}
    />
  )
}

export default StoreDetails