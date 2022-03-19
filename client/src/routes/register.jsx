import { useState } from 'react'
import RegistrationForm from '../components/RegistrationForm'


const Register = () => {

  const [register,setRegister] = useState({})
  console.log(register);
  return (
    <RegistrationForm register={setRegister}/>
  )
}

export default Register
