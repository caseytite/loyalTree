import { useEffect, useState } from "react";
import axios from "axios";
import StoreListItem from "../components/StoreListItem";
import "../components/StoreListItem.css";

const Stores = (props) => {
  const [nameFilter, setNameFilter] = useState("");
  const [stores, setStores] = useState([]);
  const [amount, setAmount] = useState(0);
  const [detail, showDetail] = useState("");

  useEffect(() => {
    axios.get("/stores").then((res) => {
      setStores(res.data.data);
    });
  }, []);

  const storesArr = stores
    .filter((store) => {
      const regex = new RegExp(nameFilter, "gi");
      return regex.test(store.name) || regex.test(store.category);
    })
    .map((store) => {
      return (
        <StoreListItem
          key={store.id}
          storeID={store.id}
          storeName={store.name}
          address={store.address}
          photo={store.photo_url}
          description={store.description}
          category={store.category}
          detail={detail}
        />
      );
    });

  return (
    <div className="stores-list">
      <label htmlFor="name-filter">
        Find a card for <i>You</i>{" "}
      </label>
      <input
        id="name-filter"
        value={nameFilter}
        onChange={(e) => {
          setNameFilter(e.target.value);
        }}
      />
      {storesArr}
    </div>
  );
};

export default Stores;
