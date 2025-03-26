import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import Navbar from "./components/NavBar/Navbar";
import "./App.css";


const App = () => (
  <BrowserRouter>
    <Navbar />
    <AppRoutes />
  </BrowserRouter>
);

export default App;
