import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import "./SignInForm.css";
import Cookies from "universal-cookie";
import LoggedInUser from "../context/AuthContext";

const SignInForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  const navigate = useNavigate();

  const context = useContext(LoggedInUser);

  const onFormSubmission = (e) => {
    e.preventDefault();
    if (email && password) {
      axios
        .post("/login", { email, password })
        .then((res) => {
          cookies.set("id", res.data.user.id, { path: "/" });
          context.user = res.data.user;
          // context.userID = res.data.user.id;
          context.user = res.data.user;
        })
        .then((response) => {
          console.log(context.user);
          navigate("/stores");
        })
        .catch((err) => console.log("Login Error:", err.message));
    }
    navigate("/signin");
  };

  return (
    <div className="form-container">
      <form action="" onSubmit={onFormSubmission}>
        <label htmlFor="email">email</label>
        <input
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button onClick={(e) => onFormSubmission(e)}>Sign in</Button>
      </form>
    </div>
  );
};

export default SignInForm;
