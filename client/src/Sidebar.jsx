import React, {useState} from 'react';
import { slide as Menu } from 'react-burger-menu';
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
// import LoggedInUser from '../context/AuthContext';
import axios from 'axios';

export default function Sidebar(props)  {

  const cookies = new Cookies();
  let user = document.cookie;


  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a  className="menu-item" href='/signin'>
        Log In
      </a>
      <a className="menu-item" href="/register">
        Register
      </a>
      <a className="menu-item" href="/desserts">
        Desserts
      </a>
    </Menu>
  );
}; 
