import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <div className="container">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <img src="/logo.png" alt="Logo" className="logo" />
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <header className="top-navbar">
            <button className="login-button">Login</button>
          </header>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;