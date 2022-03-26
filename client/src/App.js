import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import LoggedInUser from "./context/AuthContext";
import Sidebar from "./Sidebar";
import Footer from "./components/Footer";
import Cookies from "universal-cookie";

import axios from "axios";

import "./App.css";

// fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from '@fortawesome/free-solid-svg-icons'
// import the next line into each file fontawesome is needed
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(fab, fas);

function App() {
  const context = useContext(LoggedInUser);
  // gets the session cookie
  const cookies = new Cookies();
  let user = document.cookie;
  const navigate = useNavigate();
  const handleLogout = () => {
    cookies.remove("id", { path: "/" });
    context.user = {};
    localStorage.clear();

    axios.post("/logout");

    return navigate("/");
  };

  // handles the login button click redirect
  const handleLogin = () => {
    return navigate("/signin");
  };

  const handleRegister = () => {
    return navigate("/register");
  };

  return (
    <div className="App" id="outer-container">
      <LoggedInUser.Provider
        value={{
          user: localStorage.getItem("user"),
          userID: Number(document.cookie.slice(3)),
        }}
      >
        <Sidebar
          handleRegister={handleRegister}
          user={user}
          handleLogout={handleLogout}
          handleLogin={handleLogin}
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
        />

        <div id="page-wrap">
          <header>
            <img src="/loyaltree-large.svg" alt="loyaltree logo" />
          </header>
          <Outlet />
          <Footer />
        </div>
      </LoggedInUser.Provider>
    </div>
  );
}

export default App;
