import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import "./Sidebar.css";

// import LoggedInUser from '../context/AuthContext';

export default function Sidebar(props)  {

  


  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      {!props.user &&<a className="menu-item" href='/signin'>
        Log In
      </a>}
      {props.user &&<a className="menu-item" href='/' onClick={props.handleLogout}>
        Log Out
      </a>}
      
      <a className="menu-item" href="/register">
        Register
      </a>
      <a className="menu-item" href="/desserts">
        Desserts
      </a>
    </Menu>
  );
}; 
