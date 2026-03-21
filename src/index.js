import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Home from "./components/Home";

const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (token) {
  localStorage.setItem("token", token);
  // clean URL after saving token
  window.history.replaceState({}, document.title, "/");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={1500} theme="colored" />
    </BrowserRouter>
  </React.StrictMode>,
);
