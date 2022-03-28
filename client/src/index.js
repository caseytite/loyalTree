import React from "react";
// import ReactDOM from 'react-dom';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Stores from "./pages/stores";
import StoreDetails from "./pages/storeDetails";
import Cards from "./pages/cards";
import Dashboard from "./pages/dashboard";
import Signin from "./pages/signin";
import Register from "./pages/register";
import SingleGiftCard from "./pages/singleGiftCard";
import ScrollToTop from "./components/ScrollToTop";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Landing />} />
        <Route path="stores" element={<Stores />} />
        <Route path="stores/:id" element={<StoreDetails />} />
        <Route path="cards" element={<Cards />} />
        <Route path="cards/:id" element={<SingleGiftCard />} />
        <Route path="dashboard" element={<Dashboard />} />
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
