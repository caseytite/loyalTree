import React from "react";

const LoggedInUser = React.createContext({
  user: {},
  isLoggedIn: false,
});

export default LoggedInUser;
