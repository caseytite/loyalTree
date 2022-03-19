import React from 'react'
import './Button.css'

function Button(props) {

 const {children} = props

  return (
    <button className="button-confirm">{children}</button>
  )
}

export default Button