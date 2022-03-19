import React from 'react'
import Button from './Button'
import './StoreRegistration.css'

function RegistrationForm(props) {
  return (
    <div className='reg-container'>
      <h2>Register!</h2>
        <form action="">
        <label>First Name</label>
        <input type="text" />
        <label>Last Name</label>
        <input type="text" />
        <label>Email</label>
        <input type="text" />
        <label>City</label>
        <input type="text" />
        <label>Password</label>
        <input type="password" />
        <Button type="submit">Register</Button>
        </form>
    </div>
  )
}

export default RegistrationForm
