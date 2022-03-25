import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import "./StoreListItem.css";
import CreditCard from "./CreditCard";
import LoggedInUser from "../context/AuthContext";
import { useParams } from "react-router-dom";
import classNames from "classnames";

function StoreListItem(props) {
  let navigate = useNavigate();
  const context = useContext(LoggedInUser);
  const params = useParams();

  const { storeID, storeName, description, address, category, photo, detail } =
    props;

  const [card, setCard] = useState(false);
  const [text, setText] = useState("Place Order");
  const currentStore = localStorage.getItem("store");

  const articleClass = classNames("store-list-item", {
    "store-list-item--center": detail,
  });

  const checkTransactions = () => {
    axios.get(`/transactions/${params.id}/${context.user.id}`).then((res) => {
      navigate(`/transactions/${params.id}/${context.user.id}`);
    });
  };
  const onPay = (email, amount) => {
    const id = context.userID;
    axios
      .post(`/cards/${id}`, {
        email,
        balance: amount,
        user_id: id,
        store_id: params.id,
      })
      .then((res) => {
        setText("Processing");
        setTimeout(() => {
          setText("Thanks KV!!!");
          setTimeout(() => {
            navigate("/cards");
          }, 2000);
        }, 2000);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <article className={articleClass}>
        <div className="store-list-top">
          <h1>{storeName}</h1>
          {/* <h3 className="store-list-address">{address}</h3> */}
        </div>
        <div className="store-list-cont">
          <div className="img-about-cont">
            {detail && (
              <img className="store-list-img" src={photo} alt={category} />
            )}
            {!detail && (
              <div
                className="text-container"
                onClick={() => navigate(`/stores/${storeID}`)}
              >
                <img className="store-list-img" src={photo} alt={category} />
                <div className="overlay">
                  <div className="text">
                    Click to Learn <i>More</i>
                  </div>
                </div>
              </div>
            )}
            {/* {!detail && (
              <div className="store-description">
                <h2>About Us!</h2>
                <h3>{description}</h3>
              </div>
            )} */}
          </div>
        </div>
      </article>

      {card && (
        <CreditCard
          text={text}
          setText={setText}
          open={card}
          closeCard={setCard}
          onPay={onPay}
        />
      )}
      <hr className="hr" />
      <div>
        {detail && (
          <div className="purchase">
            <Button onClick={() => setCard(!card)}>Purchase</Button>
          </div>
        )}
      </div>
      {detail && (
        <div className="detail-page-about">
          <div className="store-description">
            <h2>About Us!</h2>
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              laboriosam saepe illo temporibus, iusto amet voluptates, accusamus
              delectus laudantium at quo fuga non numquam. Voluptas aliquam ipsa
              dolores incidunt aspernatur. Eius aliquam ab, animi voluptas, quis
              iusto, mollitia repellendus cumque praesentium dolores fugiat eum
              commodi similique placeat illum. Velit eum nam quas. Dignissimos
              odio aperiam praesentium modi iusto ab provident. Nulla, nostrum?
              Repellendus ex dolores deserunt autem adipisci obcaecati
              exercitationem quisquam ab, dolorum deleniti hic delectus unde
              odit mollitia quia ea iure inventore pariatur neque natus, fugiat
              in voluptatum. Placeat? At esse voluptatem vitae atque rem qui
              tempore placeat rerum! Aperiam, non aliquid reiciendis, facere
              praesentium iusto facilis officiis ipsa dolores, sit repudiandae
              odio ut doloribus incidunt iste labore quis. Vitae debitis itaque
              iure sed a odit temporibus enim molestiae cupiditate, veniam alias
              et, eaque consequatur suscipit sapiente ratione doloribus quo
              quisquam? Labore necessitatibus numquam cum voluptates dolor
              veritatis sed.
            </h3>
          </div>
        </div>
      )}
    </>
  );
}

export default StoreListItem;
