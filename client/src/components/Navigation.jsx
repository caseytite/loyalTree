import React from 'react'
import './Navigation.css'
import { Link } from 'react-router-dom'

const Navigation = (props) => {
  return (
    <nav className="nav">
      <div className="header-logo">
        <Link to={{ pathname: '/' }}>
          <h2 className="nav-text">LoyalTree</h2>
        </Link>
      </div>
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
