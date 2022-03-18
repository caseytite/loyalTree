import React from 'react'
import Button from './Button'

function RegistrationForm(props) {
  return (
    <div>
      <h2>SignUpForm</h2>
        <form action="">
          First Name: <input type="text" />
          Last Name: <input type="text" />
          Email: <input type="text" />
          Password: <input type="text" />
          City: <input type="text" />
          <Button />
        </form>
    </div>
  )
}

export default RegistrationForm