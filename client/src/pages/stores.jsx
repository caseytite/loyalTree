import { useEffect, useState } from "react";
import axios from "axios";
import StoreListItem from "../components/StoreListItem";

const Stores = props => {
  const [stores, setStores] = useState([]);
  const [amount, setAmount] = useState(0);
  const [detail, showDetail] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    axios.get("/stores").then(res => {
      setStores(res.data.data);
    });
  }, []);

  // shows all the stores if showDetail is falsey
  const storesArr = stores
    .filter(store => {
      const regex = new RegExp(nameFilter, "gi");
      return regex.test(store.name);
    })
    .map(store => {
      return (
        <StoreListItem
          key={store.id}
          storeID={store.id}
          storeName={store.name}
          address={store.address}
          photo={store.photo_url}
          description={store.description}
          category={store.category}
          setAmount={setAmount} // what is this?
          showDetail={showDetail}
          detail={detail}
        />
      );
    });

  return (
    <div className="stores-list">
      <label htmlFor="name-filter">Filter by Name:</label>
      <input
        id="name-filter"
        value={nameFilter}
        onChange={e => {
          setNameFilter(e.target.value);
        }}
      />
      {storesArr}
    </div>
  );
};

export default Stores;
