import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import "./StoreListItem.css";
import CreditCard from "./CreditCard";
import LoggedInUser from "../context/AuthContext";
import { useParams, Link } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactStars from "react-rating-stars-component";

function StoreListItem(props) {
  let navigate = useNavigate();
  const context = useContext(LoggedInUser);
  const params = useParams();
  const { storeID, storeName, description, address, category, photo, detail } =
    props;

  const [card, setCard] = useState(false);
  const [text, setText] = useState("Place Order");
  const [redeem, setRedeem] = useState(false);
  const [rating, setRating] = useState(Math.ceil(Math.random() * 3 + 2));

  const articleClass = classNames("store-list-item", {
    "store-list-item--detail": detail,
  });

  const onPay = (email, amount) => {
    // const id = context.userID;
    axios
      .post(`/cards/${params.id}`, {
        email,
        amount: amount,
        // user_id: ${id,
        // store_id: params.id,
      })
      .then((res) => {
        setText("Processing");
        setTimeout(() => {
          setText("Thanks KV!!!");
          setTimeout(() => {
            window.location = "/cards";
          }, 1000);
        }, 1000);
      })
      .catch((err) => console.log(err.message));
  };

  const onRedeem = (email, amount) => {
    const id = context.userID;
    axios
      .post(`/stores/${params.id}/redeem/`, {
        email,
        amount: amount,
        user_id: id,
        store_id: params.id,
      })
      .then((res) => {
        console.log(res.data.data);
        setText("Processing");
        setTimeout(() => {
          setText("Thanks KV!!!");
          setTimeout(() => {
            window.location = "/cards";
          }, 1000);
        }, 1000);
      })
      .catch((err) => console.log(err.message));
  };

  const rateStore = (e) => {
    setRating(e);
  };

  return (
    <>
      <div className="stores-list">
        <article
          className={articleClass}
          onClick={() => navigate(`/stores/${storeID}`)}
        >
          <img className="store-list-img" src={photo} alt={category} />
        </article>
      </div>

      {card && (
        <CreditCard
          header="For you or a friend"
          text={text}
          setText={setText}
          open={card}
          closeCard={setCard}
          onPay={onPay}
        />
      )}
      {redeem && (
        <CreditCard
          header="Redeem your points"
          text={text}
          setText={setText}
          open={redeem}
          closeCard={setRedeem}
          onPay={onRedeem}
        />
      )}

      {detail && (
        <div className="purchase">
          <Button onClick={() => setCard(!card)}>Purchase</Button>
        </div>
      )}
      {detail && (
        <div className="purchase">
          <Button onClick={() => setRedeem(!redeem)}>Redeem with Points</Button>
        </div>
      )}

      {detail && (
        <div className="detail-page-about">
          <div className="store-description">
            <div className="about-header">
              <h2>About {storeName}</h2>
              <ReactStars
                className="stars"
                value={storeName === "Lighthouse Labs" ? 5 : rating}
                onChange={(e) => rateStore(e)}
                size={20}
                isHalf={true}
                emptyIcon={<FontAwesomeIcon icon="fa-regular fa-star" />}
                halfIcon={
                  <FontAwesomeIcon icon="fa-solid fa-star-half-stroke" />
                }
                fullIcon={<FontAwesomeIcon icon="fa-solid fa-star" />}
                activeColor="#ffd700"
              />
            </div>
            <hr></hr>
            <h3>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>{description}</p>
            </h3>
            <div className="socials">
              <p className="icon">
                <FontAwesomeIcon icon="fa-brands fa-twitter" />
              </p>
              <p className="icon">
                <FontAwesomeIcon icon="fa-brands fa-facebook" />
              </p>
              <p className="icon">
                <FontAwesomeIcon icon="fa-brands fa-instagram" />
              </p>
            </div>
            <Link className="stores-link" to="/stores">
              Back to Stores
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default StoreListItem;
