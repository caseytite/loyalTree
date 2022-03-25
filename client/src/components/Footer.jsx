import React from "react";
import "./Footer.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = (props) => {
  return (
    <footer id="main-footer">
      <div className="footer-links">
        <div className="footer-column">
          <h2>Social</h2>
          <p><FontAwesomeIcon icon="fa-brands fa-twitter" /> Twitter</p>
          <p><FontAwesomeIcon icon="fa-brands fa-facebook" /> Facebook</p>
          <p><FontAwesomeIcon icon="fa-brands fa-instagram" /> Instagram</p>
        </div>
        <div className="footer-column">
          <h2>About Us</h2>
          <p>Who we are</p>
          <p>Program Info</p>
        </div>
        <div className="footer-column">
          <h2>Creators</h2>
          <p><FontAwesomeIcon icon="fa-brands fa-github" /> Casey Tite</p>
          <p><FontAwesomeIcon icon="fa-brands fa-github" /> Chris Bell</p>
          <p><FontAwesomeIcon icon="fa-brands fa-github" /> Logan Woolf</p>
        </div>
      </div>
      <p className="thank-you">
        A very special thank you to our families who supported us all the way
        through and helped with ideas and graphics for this project.
      </p>
      <p className="thank-you">
        Another special thanks to all of the instructors, mentors, and staff at
        Lighthouse Labs! You are amazing and have changed our lives!
      </p>
    </footer>
  );
};

export default Footer;
