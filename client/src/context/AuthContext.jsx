import React from 'react';

const LoggedInUser = React.createContext({
  user: {},
  userID: Number(document.cookie.slice(3)),
});

export default LoggedInUser;
