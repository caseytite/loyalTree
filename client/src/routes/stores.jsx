import  { useEffect, useState } from "react"
import axios from 'axios'
import StoreListItem from "../components/StoreListItem"

const Stores = (props) => {
  const [stores, setStores] = useState([])
  const [amount,setAmount] = useState(0)

    useEffect(() => {
     axios.get('/stores')
      .then(res => {
        setStores(res.data.data)
      })
  },[])


  const storesArr = stores.map(store => {
    return (
      <StoreListItem
        key={store.id}
        storeName={store.name}
        address={store.address}
        photo={store.photo_url}
        description={store.description}
        category={store.category}
        setAmount={setAmount}
      />
    )
  })

  return(
    <>
      {storesArr}
    </>
  )

}

export default Stores
