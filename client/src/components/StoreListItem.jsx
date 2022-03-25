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

function StoreListItem(props) {
  let navigate = useNavigate();
  const context = useContext(LoggedInUser);
  const params = useParams();

  const { storeID, storeName, description, address, category, photo, detail } =
    props;
  console.log(detail);
  const [card, setCard] = useState(false);
  const [text, setText] = useState("Place Order");

  const articleClass = classNames("store-list-item", {
    "store-list-item--detail": detail,
  });
  console.log(context);
  const onPay = (email, amount) => {
    const id = context.userID;
    axios
      .post(`/cards/${id}`, {
        email,
        amount: amount,
        user_id: id,
        store_id: params.id,
      })
      .then((res) => {
        setText("Processing");
        setTimeout(() => {
          setText("Thanks KV!!!");
          setTimeout(() => {
            window.location = "/cards";
            // navigate("/cards");
          }, 2000);
        }, 2000);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <article className={articleClass}>
        <div className="store-list-top"></div>
        <div className="store-list-cont">
          <div className="img-about-cont">
            {detail && (
              <img
                className="store-list-img img-on-detail"
                src={photo}
                alt={category}
              />
            )}
            {!detail && (
              <div
                className="text-container"
                onClick={() => navigate(`/stores/${storeID}`)}
              >
                <img className="store-list-img" src={photo} alt={category} />
              </div>
            )}
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

      {detail && (
        <div className="purchase">
          <Button onClick={() => setCard(!card)}>Purchase</Button>
        </div>
      )}

      {detail && (
        <div className="detail-page-about">
          <div className="store-description">
            <h2>About {storeName}</h2>
            <hr></hr>
            <h3>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{description}. Lorem ipsum dolor
              sitamet consectetur adipisicing elit. Incidunt laboriosam saepe
              illo temporibus, iusto amet voluptates, accusamus delectus
              laudantium at quo fuga non numquam. Voluptas aliquam ipsa dolores
              incidunt aspernatur. Eius aliquam ab, animi voluptas, quis iusto,
              mollitia repellendus cumque praesentium dolores fugiat eum commodi
              similique placeat illum. Velit eum nam quas. Dignissimos odio
              aperiam praesentium modi iusto ab provident. Nulla, nostrum?
              Repellendus ex dolores deserunt autem adipisci obcaecati
              exercitationem quisquam ab, dolorum deleniti hic delectus unde
              odit mollitia quia ea iure inventore pariatur neque natus, fugiat
              in voluptatum.
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
