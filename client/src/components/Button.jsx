import React from 'react'

function Button(props) {

 const {children} = props

  return (
    <button >{children}</button>
  )
}

export default Button