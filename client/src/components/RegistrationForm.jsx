import React, { useState } from "react";
import Button from "./Button";
import "./StoreRegistration.css";

function RegistrationForm(props) {
  const { setRegister } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmission = (e) => {
    e.preventDefault();
    setRegister({ firstName, lastName, city, email, password });
  };

  return (
    <div className="reg-container">
      <h2>Register!</h2>
      <form onSubmit={onFormSubmission}>
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={(e) => onFormSubmission(e)}>Register</Button>
      </form>
    </div>
  );
}

export default RegistrationForm;
