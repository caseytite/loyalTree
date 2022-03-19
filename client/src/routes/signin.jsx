import { useState } from "react";
import SignInForm from "../components/SignInForm";

const Signin = () => {

  const [login,setLogin] = useState({})

  return (
    <div>
      <h1>SignInForm</h1>
      <SignInForm setLogin={setLogin}/>
    </div>
  );
};

export default Signin;
