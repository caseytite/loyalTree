import React from "react";
import "./App.css";
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { Link, Outlet } from "react-router-dom";
import HomePage from './components/HomePage'

function App() {

  return (
    <>
      <div className="App">
        <Navigation/>
        <div>
          <Link to="/stores">All Stores</Link> | {" "}
          <Link to="/transactions">All Transactions</Link> | {" "}
          <Link to="/scan">Scanner</Link>
          {/* <HomePage/> */}
          <Outlet />
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default App;
