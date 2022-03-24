import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import Logo from "./Logo";

const Navigation = (props) => {
  return (
    <nav className="nav">
      <Link to={{ pathname: "/stores" }}>
        <Logo />
      </Link>
    </nav>
  );
};

export default Navigation;
