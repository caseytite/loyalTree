import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Link, Outlet } from 'react-router-dom';
import LoggedInUser from './context/AuthContext';
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="App" id="outer-container">
      <LoggedInUser.Provider
        value={{
          user: localStorage.getItem('user'),
          // userID: Number(document.cookie.slice(3)),
        }}
      >
        <Navigation />
        <div className="top-links">
          <Link to="/stores">All Stores</Link> |{' '}
          <Link to="/cards">My Cards</Link> | <Link to="/scan">Scanner</Link>
        </div>
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id="page-wrap">
          <Outlet />
        </div>
        <Footer />
      </LoggedInUser.Provider>
    </div>
  );
}

export default App;
