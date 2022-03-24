import axios from "axios";
import React, { useEffect, useState } from "react";
import { bubble as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

import "./Sidebar.css";

export default function Sidebar(props) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (props.user) {
      axios.get("/user").then((res) => {
        const currentUser = res.data.user;
        setUser(...currentUser);
      });
    }
  }, []);

  return (
    <Menu right>
      {props.user && <h3>Hello {user.first_name} </h3>}

      <Link to="/"></Link>
      {!props.user && <Link to="/signin">Login</Link>}
      {props.user && (
        <Link to="/" onClick={props.handleLogout}>
          Logout link
        </Link>
      )}
      {!props.user && <Link to="/register">Register</Link>}
      {props.user && <Link to="/cards">My Cards</Link>}
      <Link to="/stores">Stores</Link>
      {user.isstoreowner && <Link to="/dashboard">Dashboard</Link>}
      <span>About Us</span>
      <span>Contact Us</span>
      <span>Careers</span>
      <span>Join our Community</span>
      <span>Investor Experience</span>
      <span>Nasdaq Ticker LYLT</span>
    </Menu>
  );
}
