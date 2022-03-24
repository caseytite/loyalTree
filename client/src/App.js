import React, { useContext } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import { Outlet } from "react-router-dom";
import LoggedInUser from "./context/AuthContext";
import Sidebar from "./Sidebar";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
          // userID: Number(document.cookie.slice(3)),
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
          <Outlet />
        </div>
      </LoggedInUser.Provider>
    </div>
  );
}

export default App;
