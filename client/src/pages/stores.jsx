import { useEffect, useState } from 'react'
import axios from 'axios'
import StoreListItem from '../components/StoreListItem'

const Stores = (props) => {
  const [stores, setStores] = useState([])
  const [amount, setAmount] = useState(0)
  const [detail, showDetail] = useState('')

  useEffect(() => {
    axios.get('/stores').then((res) => {
      setStores(res.data.data)
    })
  }, [])

  // shows a single store if showDetail truthy
  const storeDetails = stores.map((store) => {
    if (store.name === detail) {
      return (
        <StoreListItem
          key={store.id}
          storeName={store.name}
          address={store.address}
          photo={store.photo_url}
          description={store.description}
          category={store.category}
          setAmount={setAmount}
          showDetail={showDetail}
          detail={detail}
        />
      )
    }
  })
  // shows all the stores if showDetail is falsey
  const storesArr = stores.map((store) => {
    return (
      <StoreListItem
        key={store.id}
        storeName={store.name}
        address={store.address}
        photo={store.photo_url}
        description={store.description}
        category={store.category}
        setAmount={setAmount}
        showDetail={showDetail}
        detail={detail}
      />
    )
  })

  return <>{!detail ? storesArr : storeDetails}</>
}

export default Stores
