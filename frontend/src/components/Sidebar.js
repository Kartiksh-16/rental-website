import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const dashboardItems = [
    { icon: "❤️", label: "Saved Properties", path: "/dashboard/saved",   badge: 4  },
    { icon: "🏠", label: "Manage Listings",  path: "/dashboard/listings", badge: 2  },
    { icon: "💬", label: "Messages",         path: "/dashboard/messages", badge: 3  },
  ];

  return (
    <div className="sidebar">

      {/* User Dashboard */}
      <div className="sidebar-card">
        <h4>🧑‍💼 User Dashboard</h4>
        <ul className="sidebar-menu">
          {dashboardItems.map((item) => (
            <li key={item.label} onClick={() => navigate(item.path)}
              style={{ justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className="menu-icon">{item.icon}</span>
                {item.label}
              </div>
              {item.badge > 0 && (
                <span style={{
                  background: "#f5a623", color: "#fff",
                  borderRadius: "12px", padding: "1px 8px",
                  fontSize: "0.74rem", fontWeight: 700,
                }}>{item.badge}</span>
              )}
            </li>
          ))}
        </ul>
        <div className="contact-info">
          <div className="contact-row">
            <span className="c-icon">📧</span>
            <span>info@rentalwebsite.com</span>
          </div>
          <div className="contact-row">
            <span className="c-icon">📞</span>
            <span>+91 9876543210</span>
          </div>
        </div>
        <button className="btn-send-msg" onClick={() => navigate("/contact")}>
          💬 Send Message
        </button>
      </div>

      {/* About Our Website */}
      <div className="sidebar-card">
        <h4>🏡 About Our Website</h4>
        <div className="sidebar-about">
          <p>
            We provide a platform for users to easily find, list and manage
            rental properties, ensuring a seamless rental experience.
          </p>
          <div className="social-links">
            <a className="social-btn" href="#!" title="Email">✉</a>
            <a className="social-btn" href="#!" title="Facebook">f</a>
            <a className="social-btn" href="#!" title="Instagram">📸</a>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Sidebar;
