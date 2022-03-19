import React from 'react'
import './Navigation.css'


const Navigation = (props) => {
  return (
    <nav className='nav'>
      <h2 className='header-logo'>LoyalTree</h2>
      <div className='header-logins'>
        <button>Login</button>
        <button>Register</button>
      </div>
    </nav>
  )
}

export default Navigation;