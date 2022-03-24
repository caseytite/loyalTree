import axios from "axios";
import React, { useEffect, useState } from "react";
import { bubble as Menu } from "react-burger-menu";
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
  console.log(user);
  return (
    <Menu right>
      {props.user && <h3>Hello {user.first_name} </h3>}
      <a className="menu-item" href="/">
        Home
      </a>
      {!props.user && (
        <a className="menu-item" href="/signin">
          Log In
        </a>
      )}
      {props.user && (
        <a className="menu-item" href="/" onClick={props.handleLogout}>
          Log Out
        </a>
      )}

      {!props.user && (
        <a className="menu-item" href="/register">
          Register
        </a>
      )}
      {props.user && (
        <a className="menu-item" href="/cards">
          My Cards
        </a>
      )}
      <a className="menu-item" href="/stores">
        Browse Stores
      </a>
      {user.isstoreowner && (
        <a className="menu-item" href="/dashboard">
          Dashboard
        </a>
      )}
    </Menu>
  );
}
