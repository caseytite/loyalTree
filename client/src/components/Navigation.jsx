import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import Logo from "./Logo";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import LoggedInUser from "../context/AuthContext";
import axios from "axios";

const Navigation = (props) => {
  return (
    <nav className="nav">
      <Link to={{ pathname: "/stores" }}>
        <Logo />
      </Link>
      {/* <div className="header-logins">
        {props.user && <Button onClick={props.handleLogout}>Log Out</Button>}
        {!props.user && <Button onClick={props.handleLogin}>Log in</Button>}
        <Button className="nav-text" onClick={props.handleRegister}>
          Register
        </Button>
      </div> */}
    </nav>
  );
};

export default Navigation;
