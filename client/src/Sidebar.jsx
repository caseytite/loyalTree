import axios from "axios";
import React, { useEffect, useState } from "react";
import { bubble as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Sidebar.css";

export default function Sidebar(props) {
  const [user, setUser] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleStateChange = (menuState) => {
    setMenuOpen(menuState.isOpen);
  };

  useEffect(() => {
    if (props.user) {
      axios.get("/user").then((res) => {
        const currentUser = res.data.user;
        setUser(...currentUser);
      });
    }
  }, [props.user]);

  return (
    <Menu
      isOpen={menuOpen}
      onStateChange={(state) => handleStateChange(state)}
      right
    >
      {props.user && (
        <span>
          <p>
            Hello, {user.first_name}!{" "}
            <FontAwesomeIcon icon="fa-solid fa-coins" /> {user.points}
          </p>
        </span>
      )}
      <hr />
      {!props.user && (
        <span onClick={closeMenu}>
          <Link to="/register">
            <FontAwesomeIcon icon="fa-solid fa-clipboard-user" />
            {" Register"}
          </Link>
        </span>
      )}

      <span onClick={closeMenu}>
        <Link to="/">
          <FontAwesomeIcon icon="fa-solid fa-house" />
          {" Home"}
        </Link>
      </span>

      <span onClick={closeMenu}>
        <Link to="/stores">
          <FontAwesomeIcon icon="fa-solid fa-shop" />
          {" Browse Stores"}
        </Link>
      </span>

      {props.user && (
        <span onClick={closeMenu}>
          <Link to="/cards">
            <FontAwesomeIcon icon="fa-solid fa-credit-card" />
            {" My Cards"}
          </Link>
        </span>
      )}

      {props.user && (
        <span onClick={closeMenu}>
          <Link to="/dashboard">
            <FontAwesomeIcon icon="fa-solid fa-cash-register" />
            {" My Business"}
          </Link>
        </span>
      )}
      <hr />

      <span onClick={closeMenu}>
        <a href="/">
          <FontAwesomeIcon icon="fa-solid fa-champagne-glasses" />
          {" Investor Experience"}
        </a>
      </span>

      <span onClick={closeMenu}>
        <a href="/">
          <FontAwesomeIcon icon="fa-solid fa-arrow-trend-up" />
          {" Nasdaq Ticker LYLT"}
        </a>
      </span>
      <hr />
      <span onClick={closeMenu}>
        <a href="/">
          <FontAwesomeIcon icon="fa-solid fa-briefcase" />
          {" Careers"}
        </a>
      </span>

      <span onClick={closeMenu}>
        <a href="/">
          <FontAwesomeIcon icon="fa-solid fa-at" />
          {" Contact Us"}
        </a>
      </span>

      <span onClick={closeMenu}>
        <a href="/">
          <FontAwesomeIcon icon="fa-solid fa-circle-info" />
          {" About Us"}
        </a>
      </span>

      <span onClick={closeMenu}>
        <a href="/">
          <FontAwesomeIcon icon="fa-solid fa-people-roof" />
          {" Join our Community"}
        </a>
      </span>
      <hr />
      {props.user && (
        <span onClick={closeMenu}>
          <Link to="/" onClick={props.handleLogout}>
            <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />
            {" Logout"}
          </Link>
        </span>
      )}

      {!props.user && (
        <span onClick={closeMenu}>
          <Link to="/signin">
            <FontAwesomeIcon icon="fa-solid fa-arrow-right-to-bracket" />
            {" Login"}
          </Link>
        </span>
      )}
    </Menu>
  );
}
