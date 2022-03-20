import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import Logo from './Logo'

const Navigation = (props) => {
  return (
    <nav className="nav">
        <Link to={{ pathname: "/" }}>
          <Logo />
        </Link>
      <div className="header-logins">
        <Link
          className="nav-text"
          to={{ pathname: '/signin' }}
        >
          Log in
        </Link>
        <Link
          className="nav-text"
          to={{ pathname: '/register' }}
        >
          Register
        </Link>
      </div>
    </nav>
  )
}

export default Navigation
