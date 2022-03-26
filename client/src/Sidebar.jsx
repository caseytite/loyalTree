import axios from "axios";
import React, { useEffect, useState } from "react";
import { bubble as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

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
      {props.user && <span>Hello, {user.first_name}</span>}
      {props.user && <span>LoyalTree Points: {user.points}</span>}

      {!props.user && (
        <span onClick={closeMenu}>
          <Link to="/signin">Login</Link>
        </span>
      )}

      {!props.user && (
        <span onClick={closeMenu}>
          <Link to="/register">Register</Link>
        </span>
      )}
      <span onClick={closeMenu}>
        <Link to="/stores">Stores</Link>
      </span>
      {props.user && (
        <span onClick={closeMenu}>
          <Link to="/cards">My Cards</Link>
        </span>
      )}
      {props.user && (
        <span onClick={closeMenu}>
          <Link to="/dashboard">Dashboard</Link>
        </span>
      )}
      <span onClick={closeMenu}>
        <a href="#">About Us</a>
      </span>
      <span onClick={closeMenu}>
        <a href="#">Contact Us</a>
      </span>
      <span onClick={closeMenu}>
        <a href="#">Careers</a>
      </span>
      <span onClick={closeMenu}>
        <a href="#">Join our Community</a>
      </span>
      <span onClick={closeMenu}>
        <a href="#">Investor Experience</a>
      </span>
      <span onClick={closeMenu}>
        <a href="#">Nasdaq Ticker LYLT</a>
      </span>
      {props.user && (
        <span onClick={closeMenu}>
          <Link to="/" onClick={props.handleLogout}>
            Logout
          </Link>
        </span>
      )}
    </Menu>
  );
}
