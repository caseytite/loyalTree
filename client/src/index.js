import React from "react";
// import ReactDOM from 'react-dom';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stores from "./pages/stores";
import StoreDetails from "./pages/storeDetails";
import Cards from "./pages/cards";
import Transactions from "./pages/transactions";
import Scan from "./pages/scan";
import Signin from "./pages/signin";
import Register from "./pages/register";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="stores" element={<Stores />} />
        <Route path="stores/:id" element={<StoreDetails />} />
        <Route path="cards" element={<Cards />} />
        <Route path="transactions/:store_id/:id" element={<Transactions />} />
        <Route path="scan" element={<Scan />} />
        <Route path="signin" element={<Signin />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
