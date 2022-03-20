import { useState, useEffect } from "react";
import SignInForm from "../components/SignInForm";
import axios from "axios";

const Signin = () => {
  const [login, setLogin] = useState({});
  console.log("login", login);
  const { email, password } = login;
  // ,{params: {login}}
  useEffect(() => {
    axios
      .get("/login", { params: login })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div>
      <h1>SignInForm</h1>
      <SignInForm setLogin={setLogin} />
    </div>
  );
};

export default Signin;
