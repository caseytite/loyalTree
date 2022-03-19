import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from 'react-dom'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Stores from './routes/stores';
import Transactions from './routes/transactions';
import Scan from './routes/scan';
import Signin from './routes/signin';
import Register from './routes/register';


const rootElement = document.getElementById('root')
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="stores" element={<Stores/>} />
        <Route path="transactions" element={<Transactions/>} />
        <Route path="scan" element={<Scan/>} />
        <Route path="signin" element={<Signin/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
    ,rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
