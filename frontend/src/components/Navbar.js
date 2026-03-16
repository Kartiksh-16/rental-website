import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home",     path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Blog",     path: "/blog" },
    { label: "Contact",  path: "/contact" },
  ];

  return (
    <nav className="navbar" style={{ boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.15)" : undefined }}>
      <div className="container">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <span className="brand-icon">🏠</span>
          <span><span className="highlight">Rental</span> Website</span>
        </div>

        <ul className="navbar-nav">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className={`nav-item${location.pathname === link.path ? " active" : ""}`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </li>
          ))}
          <li>
            <button className="btn-nav-login" onClick={() => navigate("/login")}>
              Login
            </button>
          </li>
          <li>
            <button className="btn-nav-add" onClick={() => navigate("/add")}>
              + Add Property
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
