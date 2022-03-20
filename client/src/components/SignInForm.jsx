import React, { useState } from "react";
import Button from "./Button";
import "./SignInForm.css";

const SignInForm = (props) => {
  const { setLogin } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmission = (e) => {
    e.preventDefault();
    setLogin({ email, password });
  };

  return (
    <form action="" onSubmit={onFormSubmission}>
      <div className="form-container">
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
      </div>
    </form>
  );
};

export default SignInForm;
