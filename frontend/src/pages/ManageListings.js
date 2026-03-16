import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const INITIAL_LISTINGS = [
  { id: "1", title: "2BHK Apartment, Andheri",  city: "Mumbai",    price: 22000, type: "Apartment", status: "Active",  views: 148, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80" },
  { id: "2", title: "3BHK Independent House",   city: "Jaipur",    price: 35000, type: "House",     status: "Pending", views: 62,  img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80" },
];

const STATUS_COLOR = {
  Active:  { bg: "#e6f9ed", color: "#2e7d32" },
  Pending: { bg: "#fff8e1", color: "#f57f17" },
  Inactive:{ bg: "#fce4ec", color: "#c62828" },
};

function ManageListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDelete = (id) => {
    setListings(listings.filter((l) => l.id !== id));
    setConfirmDelete(null);
  };

  const toggleStatus = (id) => {
    setListings(listings.map((l) =>
      l.id === id ? { ...l, status: l.status === "Active" ? "Inactive" : "Active" } : l
    ));
  };

  return (
    <div>
      <Navbar />

      <div style={{
        background: "linear-gradient(135deg, #1a3c6e 0%, #2a5298 100%)",
        padding: "50px 20px", color: "#fff", animation: "fadeInDown 0.6s ease",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <span style={{ fontSize: "2rem" }}>🏠</span>
              <h1 style={{ fontSize: "2rem", fontWeight: 900 }}>Manage Listings</h1>
            </div>
            <p style={{ opacity: 0.8 }}>All your listed properties — {listings.length} total</p>
          </div>
          <button className="btn-cta" onClick={() => navigate("/add")}>+ Add New Property</button>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 20px" }}>

        <div style={{ display: "flex", gap: "8px", fontSize: "0.88rem", color: "#888", marginBottom: "28px" }}>
          <span style={{ cursor: "pointer", color: "#1a3c6e" }} onClick={() => navigate("/")}>🏠 Home</span>
          <span>›</span>
          <span style={{ color: "#333", fontWeight: 600 }}>Manage Listings</span>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
          {[
            { icon: "✅", label: "Active",   value: listings.filter(l => l.status === "Active").length,   color: "#2e7d32" },
            { icon: "⏳", label: "Pending",  value: listings.filter(l => l.status === "Pending").length,  color: "#f57f17" },
            { icon: "👁️", label: "Total Views", value: listings.reduce((s, l) => s + l.views, 0),          color: "#1a3c6e" },
          ].map((s) => (
            <div key={s.label} className="feature-card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "6px" }}>{s.icon}</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ color: "#888", fontSize: "0.88rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {listings.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", background: "#fff", borderRadius: "16px", boxShadow: "0 2px 14px rgba(0,0,0,0.07)" }}>
            <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🏘️</div>
            <h3 style={{ color: "#1a3c6e", marginBottom: "8px" }}>No listings yet</h3>
            <p style={{ color: "#888", marginBottom: "22px" }}>Add your first property to get started</p>
            <button className="btn-nav-add" onClick={() => navigate("/add")}>+ Add Property</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {listings.map((listing, i) => (
              <div key={listing.id} style={{
                background: "#fff", borderRadius: "14px", padding: "20px",
                boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
                display: "flex", gap: "18px", alignItems: "center",
                animation: "fadeInUp 0.5s ease both",
                animationDelay: `${i * 0.1}s`,
                flexWrap: "wrap",
              }}>
                <img src={listing.img} alt={listing.title} style={{ width: "110px", height: "80px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 }} />

                <div style={{ flex: 1, minWidth: "180px" }}>
                  <h4 style={{ fontWeight: 700, color: "#1a3c6e", marginBottom: "4px" }}>{listing.title}</h4>
                  <div style={{ color: "#888", fontSize: "0.88rem", marginBottom: "6px" }}>📍 {listing.city} · {listing.type}</div>
                  <div style={{ fontWeight: 700, color: "#f5a623" }}>₹ {listing.price.toLocaleString("en-IN")}/mo</div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <div style={{ fontSize: "0.78rem", color: "#aaa" }}>Views</div>
                  <div style={{ fontWeight: 800, color: "#1a3c6e", fontSize: "1.2rem" }}>{listing.views}</div>
                </div>

                <span style={{
                  padding: "5px 14px", borderRadius: "20px", fontSize: "0.82rem", fontWeight: 700,
                  background: STATUS_COLOR[listing.status]?.bg,
                  color: STATUS_COLOR[listing.status]?.color,
                }}>
                  {listing.status}
                </span>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button className="btn-view" onClick={() => navigate(`/property/${listing.id}`)}>👁 View</button>
                  <button
                    onClick={() => toggleStatus(listing.id)}
                    style={{ padding: "8px 14px", borderRadius: "7px", border: "1.5px solid #1a3c6e", background: "transparent", color: "#1a3c6e", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem" }}
                  >
                    {listing.status === "Active" ? "⏸ Pause" : "▶ Activate"}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(listing.id)}
                    style={{ padding: "8px 14px", borderRadius: "7px", border: "1.5px solid #e53935", background: "transparent", color: "#e53935", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem" }}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirm Modal */}
        {confirmDelete && (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
            animation: "fadeIn 0.2s ease",
          }}>
            <div style={{ background: "#fff", borderRadius: "16px", padding: "36px 32px", maxWidth: "380px", width: "90%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🗑️</div>
              <h3 style={{ color: "#1a3c6e", marginBottom: "8px" }}>Delete Listing?</h3>
              <p style={{ color: "#888", marginBottom: "24px" }}>This action cannot be undone. Are you sure?</p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <button className="btn-submit" style={{ background: "#e53935", flex: 1 }} onClick={() => handleDelete(confirmDelete)}>Yes, Delete</button>
                <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, padding: "12px", border: "2px solid #ddd", borderRadius: "10px", background: "#fff", fontWeight: 700, cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
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

export default ManageListings;
