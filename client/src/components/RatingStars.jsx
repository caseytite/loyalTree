import ReactStars from "react-rating-stars-component";
import React from "react";
import { render } from "react-dom";

const ratingChanged = (newRating) => {
  console.log(newRating);
  console.log("rating changed");
};

render(
  <ReactStars
    count={5}
    onChange={ratingChanged}
    size={50}
    isHalf={true}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    activeColor="#ffd700"
  />,

  document.getElementById("where-to-render")
);
