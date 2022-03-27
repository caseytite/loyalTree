import React from "react";
import Button from "./Button";
import "./StoreRegistration.css";

function StoreRegistration(props) {
  const onFormSubmission = (e) => {
  };

  return (
    <div className="reg-container">
      <form action="" onSubmit={onFormSubmission}>
        <label>Store Name</label>
        <input type="text" />
        <label>Category</label>
        <input type="text" />
        <label>Photo Url</label>
        <input type="text" />
        <label>Address</label>
        <input type="text" />
        <label>Description</label>
        <textarea className="reg-text-area" type="text" />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}

export default StoreRegistration;
