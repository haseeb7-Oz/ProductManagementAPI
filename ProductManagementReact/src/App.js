import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import AppRoutes from "./routes";
import Login from "./components/Auth/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/img/LargeLogo.svg";
import vectorIcon from "./assets/icon/Vector.png";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <div className="d-flex">
        {/* Left Sidebar */}
        {isAuthenticated && (
          <aside className="sidebar bg-dark text-white p-3 d-flex flex-column" style={{ width: "250px", height: "140vh" }}>
            <div className="text-center mb-4">
              <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: "150px" }} />
            </div>
            <nav>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-center">
                  <img src={vectorIcon} alt="Plan Icon" style={{ width: "20px", marginRight: "10px" }} />
                  <Link className="text-white text-decoration-none" to="/plan-management">Plan Management</Link>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <img src={vectorIcon} alt="Plan Icon" style={{ width: "20px", marginRight: "10px" }} />
                  <Link className="text-white text-decoration-none" to="/customers">Customers</Link>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <img src={vectorIcon} alt="Plan Icon" style={{ width: "20px", marginRight: "10px" }} />
                  <Link className="text-white text-decoration-none" to="/products">Products</Link>
                </li>
              </ul>
            </nav>
          </aside>
        )}

        <div className="flex-grow-1">
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-3">
            <div className="container-fluid">
              <h5 className="mb-0 text-black ">Marketing Admin</h5>
              <div className="d-flex align-items-center">
                <input type="text" className="form-control me-2" placeholder="Search anything..." style={{ maxWidth: "200px" }} />
                <button className="btn btn-outline-secondary me-3">🔍</button>
                {isAuthenticated ? (
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                ) : (
                  <Link className="btn btn-primary" to="/login">Login</Link>
                )}
              </div>
            </div>
          </nav>

          {/* Routes */}
          <div className="p-4">
            <Routes>
              {!isAuthenticated ? (
                <>
                  <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                  <Route path="*" element={<Navigate to="/login" />} />
                </>
              ) : (
                <>
                  <Route path="/*" element={<AppRoutes isAuthenticated={isAuthenticated} />} />
                  <Route path="/" element={<Navigate to="/plan-management" />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
