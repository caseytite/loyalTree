import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'
import Logo from './Logo'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import LoggedInUser from '../context/AuthContext'

const Navigation = (props) => {
  const context = useContext(LoggedInUser)
  // gets the session cookie
  const cookies = new Cookies()
  let user = document.cookie
  const navigate = useNavigate()
  // handles the login button click redirect
  const handleLogin = () => {
    return navigate('/signin')
  }
  // clears cookie on logout click and redirects
  // sets user context to state
  const handleLogout = () => {
    cookies.remove('id', { path: '/' })
    context.isLoggedIn = false
    context.user = {}
    return navigate('/')
  }

  return (
    <nav className="nav">
      <Link to={{ pathname: '/' }}>
        <Logo />
      </Link>
      <div className="header-logins">
        {user && (
          <Button onClick={handleLogout}>Log Out</Button>
        )}
        {!user && (
          <Button onClick={handleLogin}>Log in</Button>
        )}
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
