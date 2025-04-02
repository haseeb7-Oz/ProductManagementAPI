import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import logo from "../../assets/img/LargeLogo.svg";
import vectorIcon from "../../assets/icon/Vector.png";


const LeftBar  = () => {
  return (
  
   
        <aside
      className="sidebar bg-dark text-white p-3 d-flex flex-column"
      style={{ width: "250px", height: "110vh" }}
    >
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="Logo"
          className="img-fluid"
          style={{ maxWidth: "150px" }}
        />
      </div>
      <nav>
        <ul className="list-unstyled">
          <li className="mb-3 d-flex align-items-center">
            <img
              src={vectorIcon}
              alt="Plan Icon"
              style={{ width: "20px", marginRight: "10px" }}
            />
            <Link className="text-white text-decoration-none" to="/plan-management">
              Plan Management
            </Link>
          </li>
        </ul>
      </nav>
    </aside>

      
  );
 
};

export default LeftBar ;