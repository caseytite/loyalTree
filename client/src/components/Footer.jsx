import React from "react";
import "./Footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = (props) => {
  return (
    <footer id="main-footer">
      <div className="footer-links">
        <div className="footer-column">
          <h2>Social</h2>
          <a href="https://twitter.com">
            <FontAwesomeIcon icon="fa-brands fa-twitter" /> Twitter
          </a>
          <a href="https://facebook.com">
            <FontAwesomeIcon icon="fa-brands fa-facebook" /> Facebook
          </a>
          <a href="https://instagram.com">
            <FontAwesomeIcon icon="fa-brands fa-instagram" /> Instagram
          </a>
        </div>
        <div className="footer-column">
          <h2>About Us</h2>
          <a href="/">Who we are</a>
          <a href="/">Program Info</a>
        </div>
        <div className="footer-column">
          <h2>Creators</h2>
          <a href="https://github.com/caseytite">
            <FontAwesomeIcon icon="fa-brands fa-github" />{" "}
            Casey Tite
          </a>
          <a href="https://github.com/CBBell99">
            <FontAwesomeIcon icon="fa-brands fa-github" />{" "}
            Chris Bell
          </a>
          <a href="https://github.com/loganwoolf">
            <FontAwesomeIcon icon="fa-brands fa-github" />{" "}
            Logan Woolf
          </a>
        </div>
      </div>
      <div className="thank-you">
        <p>
          A very special thank you to our families who supported us all the way
          through and helped with ideas and graphics for this project.
        </p>
        <p>
          Another special thanks to all of the instructors, mentors, and staff
          at Lighthouse Labs! You are amazing and have changed our lives!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
