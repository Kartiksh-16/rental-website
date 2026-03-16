import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const SAVED = [
  { id: "1", title: "Modern 2BHK Apartment",  city: "Mumbai",    price: 20000, type: "Apartment", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80" },
  { id: "2", title: "Cozy Family Home",        city: "Bangalore", price: 45000, type: "House",     img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80" },
  { id: "3", title: "Luxury Beach Villa",      city: "Goa",       price: 80000, type: "Villa",     img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80" },
  { id: "4", title: "Studio Near IT Park",     city: "Pune",      price: 15000, type: "Room",      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80" },
];

function SavedProperties() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(SAVED);

  const handleRemove = (id) => {
    setSaved(saved.filter((p) => p.id !== id));
  };

  return (
    <div>
      <Navbar />

      {/* Page Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a3c6e 0%, #2a5298 100%)",
        padding: "50px 20px", color: "#fff", animation: "fadeInDown 0.6s ease",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <span style={{ fontSize: "2rem" }}>❤️</span>
            <h1 style={{ fontSize: "2rem", fontWeight: 900 }}>Saved Properties</h1>
          </div>
          <p style={{ opacity: 0.8 }}>Properties you've saved for later — {saved.length} total</p>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 20px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: "8px", fontSize: "0.88rem", color: "#888", marginBottom: "28px" }}>
          <span style={{ cursor: "pointer", color: "#1a3c6e" }} onClick={() => navigate("/")}>🏠 Home</span>
          <span>›</span>
          <span style={{ color: "#333", fontWeight: 600 }}>Saved Properties</span>
        </div>

        {saved.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", background: "#fff", borderRadius: "16px", boxShadow: "0 2px 14px rgba(0,0,0,0.07)" }}>
            <div style={{ fontSize: "4rem", marginBottom: "16px" }}>💔</div>
            <h3 style={{ color: "#1a3c6e", marginBottom: "8px" }}>No saved properties yet</h3>
            <p style={{ color: "#888", marginBottom: "22px" }}>Browse listings and click the heart to save properties</p>
            <button className="btn-nav-add" onClick={() => navigate("/")}>Browse Properties</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "22px" }}>
            {saved.map((p, i) => (
              <div key={p.id} className="property-card" style={{ animationDelay: `${i * 0.1}s`, position: "relative" }}>
                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(p.id)}
                  style={{
                    position: "absolute", top: "10px", right: "10px", zIndex: 2,
                    background: "rgba(255,255,255,0.92)", border: "none",
                    borderRadius: "50%", width: "34px", height: "34px",
                    cursor: "pointer", fontSize: "1rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    transition: "all 0.2s ease",
                  }}
                  title="Remove from saved"
                >❤️</button>

                <div style={{ overflow: "hidden" }}>
                  <img src={p.img} alt={p.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                </div>
                <div className="card-body">
                  <span style={{ background: "#e8f0fe", color: "#1a3c6e", fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: "12px", display: "inline-block", marginBottom: "8px" }}>
                    {p.type}
                  </span>
                  <h5>{p.title}</h5>
                  <div className="card-price">₹ {p.price.toLocaleString("en-IN")} / month</div>
                  <div className="card-city">📍 {p.city}</div>
                  <button className="btn-view" onClick={() => navigate(`/property/${p.id}`)}>
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="footer" style={{ marginTop: "60px" }}>
        <div className="footer-inner">
          <div className="footer-bottom" style={{ justifyContent: "center" }}>
            <span>© 2024 RentalWebsite. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SavedProperties;
