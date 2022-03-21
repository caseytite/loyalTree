import { useState } from "react";
import RegistrationForm from "../components/RegistrationForm";

const Register = () => {
  const [register, setRegister] = useState({});

  return <RegistrationForm setRegister={setRegister} />;
};

export default Register;
