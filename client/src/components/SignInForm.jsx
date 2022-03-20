import React, { useState } from 'react'
import Button from './Button'
import axios from 'axios'
import './SignInForm.css'
import Cookies from 'universal-cookie'

const SignInForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const cookies = new Cookies()

  const onFormSubmission = (e) => {
    e.preventDefault()
    axios
      .get('/login', { params: { email, password } })
      .then((res) => {
        cookies.set('id', res.data.sessionId, { path: '/' })
      })
      .catch((err) => console.log(err.message))
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
