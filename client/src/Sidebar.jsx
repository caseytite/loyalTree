import React from 'react';
import { bubble as Menu } from 'react-burger-menu';
import "./Sidebar.css";

// import LoggedInUser from '../context/AuthContext';

export default function Sidebar(props)  {

  


  return (
    <Menu right>
      <a className="menu-item" href="/">
        Home
      </a>
      {!props.user &&<a className="menu-item" href='/signin'>
        Log In
      </a>}
      {props.user &&<a className="menu-item" href='/' onClick={props.handleLogout}>
        Log Out
      </a>}
      
      {!props.user &&<a className="menu-item" href="/register">
        Register
      </a>}
      {props.user && <a className="menu-item" href="/cards">My Cards</a>} 
      <a className="menu-item" href="/stores">Browse Stores</a>
      {props.user.isStoreOwner && <a className="menu-item" href="/dashboard">Dashboard</a>}
      
    </Menu>
  );
}; 
