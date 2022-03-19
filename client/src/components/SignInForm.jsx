import React from 'react'
import Button from './Button'
import './SignInForm.css'

const SignInForm = props => {
  const onFormSubmission = (e) => {
    console.log(e.target.value)
  }


  return (
    <form action="" onSubmit={onFormSubmission}>
      <div className='form-container'>
      <label htmlFor="email">email</label>
      <input type="text" />
      <label htmlFor="password">password</label>
      <input type="text"/>
      <Button type="submit">Sign in</Button>
    </div>
    </form>
  )
}



export default SignInForm