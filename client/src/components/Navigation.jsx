import React from 'react'
import Logo from './Logo'
import './Navigation.css'



const Navigation = (props) => {

  const handleLoginClick = (e) => {
    console.log('login click');
  }
  const handleRegClick = (e) => {
    console.log('reg click');
  }


  return (
    <nav className='nav'>
      <Logo />
      <h2 className='header-logo'>LoyalTree</h2>
      <div className='header-logins'>
        <a href='./signin'>Login</a>
        <a href='./register'>Register</a>
      </div>
    </nav>
  )
}

export default Navigation;
