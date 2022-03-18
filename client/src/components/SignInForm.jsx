import React from 'react'
import Button from './Button'
import './SignInForm.css'

const SignInForm = props => {
  return (
    <form className='sign-in'>
      <input>email</input>
      <input>password</input>
      <Button>Sign in</Button>
    </form>
  )
}



export default SignInForm