import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import axios from 'axios'
import './SignInForm.css'
import Cookies from 'universal-cookie'
import LoggedInUser from '../context/AuthContext'

//react cookies wont work when the fucntion is declared everything crashses

const SignInForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const cookies = new Cookies()
  const navigate = useNavigate()

  const context = useContext(LoggedInUser)

  const onFormSubmission = (e) => {
    e.preventDefault()
    if (email && password) {
      axios
        .get('/login', { params: { email, password } })
        .then((res) => {
          cookies.set('id', res.data.user.id, { path: '/' })
          context.isLoggedIn = true
          context.user = res.data.user
        })
        .then(() => {
          navigate('/stores')
        })
        .catch((err) => console.log(err.message))
    }
    navigate('/signin')
  }
  return (
    <form action="" onSubmit={onFormSubmission}>
      <div className="form-container">
        <label htmlFor="email">email</label>
        <input
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button onClick={(e) => onFormSubmission(e)}>
          Sign in
        </Button>
      </div>
    </form>
  )
}

export default SignInForm
