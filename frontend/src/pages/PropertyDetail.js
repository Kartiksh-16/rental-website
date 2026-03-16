import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const GALLERY_POOL = [
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
];

const AMENITIES = [
  { icon: "📶", label: "WiFi"          },
  { icon: "❄️", label: "AC"            },
  { icon: "🚗", label: "Parking"       },
  { icon: "🛡️", label: "Security"     },
  { icon: "🏊", label: "Swimming Pool" },
  { icon: "🏋️", label: "Gym"          },
  { icon: "⚡", label: "Power Backup"  },
  { icon: "🐾", label: "Pet Friendly"  },
];

const STATIC_REVIEWS = [
  { id: 1, name: "Rahul Mehta",  rating: 5, date: "March 2024",    avatar: "👨", comment: "Excellent property! Very clean and well-maintained. The owner was very cooperative and the location is perfect. Highly recommended!" },
  { id: 2, name: "Priya Sharma", rating: 4, date: "February 2024", avatar: "👩", comment: "Great apartment with all amenities. The neighbourhood is very safe and peaceful. Minor issue was parking during weekends." },
  { id: 3, name: "Arjun Patel",  rating: 5, date: "January 2024",  avatar: "👨", comment: "One of the best rentals I've stayed in. Spacious rooms, great ventilation, very responsive owner. Would definitely recommend!" },
];

function StarRating({ rating, interactive = false, onRate }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => interactive && onRate && onRate(star)}
          style={{
            fontSize: interactive ? "1.8rem" : "1rem",
            cursor: interactive ? "pointer" : "default",
            color: star <= rating ? "#f5a623" : "#ddd",
            transition: "color 0.15s ease",
          }}
        >★</span>
      ))}
    </div>
  );
}

function PropertyDetail() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [property, setProperty]         = useState(null);
  const [loading, setLoading]           = useState(true);
  const [activeImg, setActiveImg]       = useState(0);
  const [reviews, setReviews]           = useState(STATIC_REVIEWS);
  const [contactOpen, setContactOpen]   = useState(false);
  const [msgSent, setMsgSent]           = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview]       = useState({ name: "", rating: 0, comment: "" });
  const [msgForm, setMsgForm]           = useState({ name: "", phone: "", message: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/properties/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", padding: "120px 20px" }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>⏳</div>
        <p style={{ color: "#888", fontSize: "1.1rem" }}>Loading property details...</p>
      </div>
    </div>
  );

  if (!property) return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", padding: "120px 20px" }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🏚️</div>
        <p style={{ color: "#888", fontSize: "1.1rem" }}>Property not found.</p>
        <button className="btn-view" style={{ marginTop: "16px" }} onClick={() => navigate("/")}>← Back to Home</button>
      </div>
    </div>
  );

  const gallery = [property.image || GALLERY_POOL[0], ...GALLERY_POOL.slice(0, 4)];
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  // Map URL using coordinates or city name
  const mapSrc = property.latitude && property.longitude
    ? `https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent((property.address || property.city) + ", India")}&output=embed`;

  const handleSendMsg = (e) => {
    e.preventDefault();
    setMsgSent(true);
    setMsgForm({ name: "", phone: "", message: "" });
    setTimeout(() => setMsgSent(false), 4000);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.rating) { alert("Please select a star rating!"); return; }
    setReviews([{
      id: Date.now(),
      name:    newReview.name || "Anonymous",
      rating:  newReview.rating,
      comment: newReview.comment,
      date:    "March 2025",
      avatar:  "😊",
    }, ...reviews]);
    setNewReview({ name: "", rating: 0, comment: "" });
    setShowReviewForm(false);
  };

  return (
    <div style={{ background: "#f4f6fb", minHeight: "100vh" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "12px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "#888" }}>
          <span style={{ cursor: "pointer", color: "#1a3c6e", fontWeight: 600 }} onClick={() => navigate("/")}>🏠 Home</span>
          <span>›</span>
          <span style={{ cursor: "pointer", color: "#1a3c6e", fontWeight: 600 }} onClick={() => navigate("/")}>Listings</span>
          <span>›</span>
          <span style={{ color: "#333" }}>{property.title}</span>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "30px auto", padding: "0 20px" }}>

        {/* ── Title Row ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "22px", flexWrap: "wrap", gap: "12px", animation: "fadeInDown 0.5s ease" }}>
          <div>
            <h1 style={{ fontSize: "1.9rem", fontWeight: 900, color: "#1a3c6e", marginBottom: "8px" }}>{property.title}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              <span style={{ color: "#666", fontSize: "0.95rem" }}>📍 {property.address || property.city}</span>
              {property.type && (
                <span style={{ background: "#e8f0fe", color: "#1a3c6e", padding: "3px 12px", borderRadius: "12px", fontSize: "0.82rem", fontWeight: 700 }}>
                  {property.type}
                </span>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <StarRating rating={Math.round(avgRating)} />
                <span style={{ fontSize: "0.82rem", color: "#888" }}>({reviews.length} reviews)</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "#f5a623" }}>
              ₹ {Number(property.price).toLocaleString("en-IN")}
            </div>
            <div style={{ fontSize: "0.85rem", color: "#999" }}>per month</div>
          </div>
        </div>

        {/* ── Image Gallery ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "30px", borderRadius: "16px", overflow: "hidden", animation: "fadeInUp 0.6s ease" }}>
          <div style={{ height: "400px", overflow: "hidden", cursor: "pointer" }}>
            <img src={gallery[activeImg]} alt="main"
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.04)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              onError={(e) => { e.target.src = GALLERY_POOL[0]; }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {gallery.slice(1, 5).map((img, i) => (
              <div key={i}
                onClick={() => setActiveImg(i + 1)}
                style={{ borderRadius: "10px", overflow: "hidden", cursor: "pointer", border: activeImg === i + 1 ? "3px solid #1a3c6e" : "3px solid transparent", transition: "all 0.2s ease", position: "relative" }}
              >
                <img src={img} alt={`view-${i}`} style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "90px" }} />
                {i === 3 && (
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "1rem", borderRadius: "8px" }}>
                    +5 Photos
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", alignItems: "start" }}>

          {/* ════ LEFT ════ */}
          <div>

            {/* About */}
            <div className="detail-section">
              <h2 className="section-title">About This Property</h2>
              <p style={{ color: "#555", lineHeight: 1.85, fontSize: "0.97rem" }}>
                {property.description || `This beautifully maintained ${property.type || "property"} is located in ${property.city}. It offers a perfect blend of comfort and convenience with modern amenities.`}
              </p>
            </div>

            {/* Property Details */}
            <div className="detail-section">
              <h2 className="section-title">Property Details</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {[
                  { icon: "🏠", label: "Type",         value: property.type || "N/A"           },
                  { icon: "🛏️", label: "Bedrooms",     value: property.bedrooms ? `${property.bedrooms} BHK` : "2 BHK" },
                  { icon: "🚿", label: "Bathrooms",    value: property.bathrooms || "2"         },
                  { icon: "📐", label: "Area",         value: property.area || "1000 sq.ft"    },
                  { icon: "🪑", label: "Furnishing",   value: property.furnishing || "Semi-Furnished" },
                  { icon: "🏗️", label: "Floor",        value: property.floor || "2nd"          },
                  { icon: "🧭", label: "Facing",       value: property.facing || "East"        },
                  { icon: "📍", label: "Locality",     value: property.locality || property.city },
                  { icon: "📅", label: "Available",    value: property.availability || "Immediate" },
                ].map((item) => (
                  <div key={item.label} style={{ background: "#f8faff", borderRadius: "10px", padding: "14px 12px", border: "1.5px solid #e8eef8", transition: "all 0.25s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "#1a3c6e"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e8eef8"}
                  >
                    <div style={{ fontSize: "1.3rem", marginBottom: "5px" }}>{item.icon}</div>
                    <div style={{ fontSize: "0.74rem", color: "#999", marginBottom: "2px" }}>{item.label}</div>
                    <div style={{ fontWeight: 700, color: "#1a3c6e", fontSize: "0.88rem" }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="detail-section">
              <h2 className="section-title">Amenities</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {AMENITIES.map((a) => (
                  <div key={a.label} style={{ display: "flex", alignItems: "center", gap: "7px", background: "#fff", border: "1.5px solid #e0e8f8", borderRadius: "25px", padding: "8px 16px", fontSize: "0.88rem", fontWeight: 600, color: "#333", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", transition: "all 0.2s ease", cursor: "default" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#1a3c6e"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#333"; }}
                  >
                    <span>{a.icon}</span> {a.label}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Owner Details ── */}
            <div className="detail-section">
              <h2 className="section-title">Owner / Agent Details</h2>
              <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
                {/* Owner Card */}
                <div style={{ flex: 1, minWidth: "240px", background: "linear-gradient(135deg, #1a3c6e, #2a5298)", borderRadius: "14px", padding: "24px", color: "#fff" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
                    <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", flexShrink: 0 }}>👤</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>{property.ownerName || "Property Owner"}</div>
                      <div style={{ opacity: 0.8, fontSize: "0.82rem", marginTop: "2px" }}>
                        {property.ownerType || "Owner"} • Since {property.ownerSince || "2022"}
                      </div>
                      <div style={{ display: "flex", gap: "2px", marginTop: "4px" }}>
                        {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#f5a623", fontSize: "0.9rem" }}>★</span>)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.12)", borderRadius: "8px", padding: "10px 14px" }}>
                      <span>📞</span>
                      <span style={{ fontSize: "0.92rem", fontWeight: 600 }}>{property.ownerPhone || "+91 9876543210"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.12)", borderRadius: "8px", padding: "10px 14px" }}>
                      <span>📧</span>
                      <span style={{ fontSize: "0.88rem" }}>{property.ownerEmail || "owner@email.com"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.12)", borderRadius: "8px", padding: "10px 14px" }}>
                      <span>📍</span>
                      <span style={{ fontSize: "0.88rem" }}>{property.city}, India</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "180px" }}>
                  <a href={`tel:${property.ownerPhone || "+919876543210"}`}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "13px 20px", background: "#1a3c6e", color: "#fff", borderRadius: "10px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", boxShadow: "0 4px 14px rgba(26,60,110,0.3)", transition: "all 0.25s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#122a50"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "#1a3c6e"}
                  >
                    📲 Call Owner
                  </a>
                  <a href={`https://wa.me/${(property.ownerPhone || "+919876543210").replace(/[^0-9]/g, "")}?text=Hi, I'm interested in your property: ${property.title}`}
                    target="_blank" rel="noreferrer"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "13px 20px", background: "#25d366", color: "#fff", borderRadius: "10px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", boxShadow: "0 4px 14px rgba(37,211,102,0.3)", transition: "all 0.25s ease" }}
                  >
                    💬 WhatsApp
                  </a>
                  <a href={`mailto:${property.ownerEmail || "owner@email.com"}?subject=Inquiry about ${property.title}`}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "13px 20px", background: "#fff", color: "#1a3c6e", border: "2px solid #1a3c6e", borderRadius: "10px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", transition: "all 0.25s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#1a3c6e"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#1a3c6e"; }}
                  >
                    📧 Send Email
                  </a>
                </div>
              </div>
            </div>

            {/* ── Location ── */}
            <div className="detail-section">
              <h2 className="section-title">Location & Map</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", padding: "12px 16px", background: "#f8faff", borderRadius: "10px", border: "1.5px solid #e0e8f8" }}>
                <span style={{ fontSize: "1.4rem" }}>📍</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#1a3c6e", fontSize: "0.95rem" }}>{property.address || property.city + ", India"}</div>
                  {property.locality && <div style={{ fontSize: "0.82rem", color: "#888", marginTop: "2px" }}>Near {property.locality}</div>}
                </div>
              </div>
              <div style={{ borderRadius: "14px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.10)" }}>
                <iframe
                  title="property-location"
                  width="100%"
                  height="320"
                  frameBorder="0"
                  style={{ border: 0, display: "block" }}
                  src={mapSrc}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              {/* Nearby */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "14px" }}>
                {["🏥 Hospital 0.8km", "🏫 School 1.2km", "🛒 Market 0.5km", "🚇 Metro 0.4km", "✈️ Airport 15km"].map((item) => (
                  <span key={item} style={{ background: "#e8f0fe", color: "#1a3c6e", padding: "6px 14px", borderRadius: "20px", fontSize: "0.82rem", fontWeight: 600 }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Reviews ── */}
            <div className="detail-section">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 className="section-title" style={{ marginBottom: 0 }}>Reviews & Ratings</h2>
                <button className="btn-view" onClick={() => setShowReviewForm(!showReviewForm)}>
                  {showReviewForm ? "✕ Cancel" : "✍️ Write Review"}
                </button>
              </div>

              {/* Avg Rating Bar */}
              <div style={{ background: "linear-gradient(135deg, #1a3c6e 0%, #2a5298 100%)", borderRadius: "14px", padding: "22px 28px", display: "flex", alignItems: "center", gap: "24px", marginBottom: "22px", color: "#fff" }}>
                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: "3.5rem", fontWeight: 900, lineHeight: 1 }}>{avgRating}</div>
                  <StarRating rating={Math.round(avgRating)} />
                  <div style={{ fontSize: "0.82rem", opacity: 0.8, marginTop: "4px" }}>{reviews.length} Reviews</div>
                </div>
                <div style={{ flex: 1 }}>
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter((r) => r.rating === star).length;
                    const pct   = (count / reviews.length) * 100;
                    return (
                      <div key={star} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                        <span style={{ fontSize: "0.78rem", width: "12px" }}>{star}</span>
                        <span style={{ fontSize: "0.78rem" }}>★</span>
                        <div style={{ flex: 1, height: "7px", background: "rgba(255,255,255,0.2)", borderRadius: "4px" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: "#f5a623", borderRadius: "4px", transition: "width 0.6s ease" }} />
                        </div>
                        <span style={{ fontSize: "0.75rem", opacity: 0.8, width: "16px" }}>{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <form onSubmit={handleAddReview} style={{ background: "#f8faff", borderRadius: "14px", padding: "22px", marginBottom: "20px", border: "1.5px solid #e0e8f8", animation: "fadeInDown 0.4s ease" }}>
                  <h4 style={{ fontWeight: 700, color: "#1a3c6e", marginBottom: "16px" }}>Write Your Review</h4>
                  <div className="form-group">
                    <label>Your Name</label>
                    <input placeholder="Enter your name" value={newReview.name} onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Rating *</label>
                    <StarRating rating={newReview.rating} interactive onRate={(r) => setNewReview({ ...newReview, rating: r })} />
                  </div>
                  <div className="form-group">
                    <label>Your Review *</label>
                    <textarea rows={3} placeholder="Share your experience..." value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} style={{ resize: "vertical" }} required />
                  </div>
                  <button type="submit" className="btn-submit">Submit Review</button>
                </form>
              )}

              {/* Review Cards */}
              {reviews.map((review, i) => (
                <div key={review.id} style={{ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: "14px", animation: "fadeInUp 0.5s ease both", animationDelay: `${i * 0.1}s` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                        {review.avatar}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: "#222" }}>{review.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "#aaa" }}>{review.date}</div>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p style={{ color: "#555", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>{review.comment}</p>
                </div>
              ))}
            </div>

          </div>

          {/* ════ RIGHT SIDEBAR ════ */}
          <div style={{ position: "sticky", top: "90px", display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* Quick Info */}
            <div className="sidebar-card">
              <h4>📋 Quick Info</h4>
              {[
                { label: "Monthly Rent",  value: `₹${Number(property.price).toLocaleString("en-IN")}`, gold: true },
                { label: "Security Deposit", value: `₹${(Number(property.price) * 2).toLocaleString("en-IN")}` },
                { label: "Property Type", value: property.type || "N/A" },
                { label: "Furnishing",    value: property.furnishing || "Semi-Furnished" },
                { label: "Availability",  value: property.availability || "Immediate" },
                { label: "City",          value: property.city },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <span style={{ color: "#888", fontSize: "0.87rem" }}>{item.label}</span>
                  <span style={{ fontWeight: 700, color: item.gold ? "#f5a623" : "#1a3c6e", fontSize: "0.9rem" }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Contact Owner */}
            <div className="sidebar-card">
              <h4>📞 Contact Owner</h4>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "linear-gradient(135deg, #1a3c6e, #2a5298)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>👤</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#1a3c6e" }}>{property.ownerName || "Owner"}</div>
                  <div style={{ fontSize: "0.78rem", color: "#f5a623", fontWeight: 600 }}>{property.ownerType || "Owner"}</div>
                  <div style={{ fontSize: "0.75rem", color: "#aaa" }}>Member since {property.ownerSince || "2022"}</div>
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <div className="contact-row"><span className="c-icon">📞</span><span>{property.ownerPhone || "+91 9876543210"}</span></div>
                <div className="contact-row"><span className="c-icon">📧</span><span style={{ fontSize: "0.85rem" }}>{property.ownerEmail || "owner@email.com"}</span></div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <button className="btn-send-msg" onClick={() => setContactOpen(!contactOpen)}>
                  {contactOpen ? "✕ Close Form" : "✉️ Send Message"}
                </button>
                <a href={`tel:${property.ownerPhone || "+919876543210"}`}
                  style={{ display: "block", textAlign: "center", padding: "10px", border: "2px solid #1a3c6e", borderRadius: "9px", color: "#1a3c6e", fontWeight: 700, textDecoration: "none", transition: "all 0.25s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#1a3c6e"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1a3c6e"; }}
                >📲 Call Now</a>
                <a href={`https://wa.me/${(property.ownerPhone || "919876543210").replace(/[^0-9]/g, "")}?text=Hi, I'm interested in: ${property.title}`}
                  target="_blank" rel="noreferrer"
                  style={{ display: "block", textAlign: "center", padding: "10px", background: "#25d366", borderRadius: "9px", color: "#fff", fontWeight: 700, textDecoration: "none" }}
                >💬 WhatsApp</a>
              </div>

              {/* Message Form */}
              {contactOpen && (
                <form onSubmit={handleSendMsg} style={{ marginTop: "16px", animation: "fadeInDown 0.3s ease" }}>
                  {msgSent && <div className="success-msg" style={{ marginBottom: "12px", fontSize: "0.85rem" }}>✅ Message sent!</div>}
                  <div className="form-group">
                    <input placeholder="Your Name" value={msgForm.name} onChange={(e) => setMsgForm({ ...msgForm, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <input placeholder="Phone Number" value={msgForm.phone} onChange={(e) => setMsgForm({ ...msgForm, phone: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <textarea placeholder="I'm interested in this property..." rows={3} value={msgForm.message} onChange={(e) => setMsgForm({ ...msgForm, message: e.target.value })} style={{ resize: "none" }} required />
                  </div>
                  <button type="submit" className="btn-submit">📨 Send Message</button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer" style={{ marginTop: "50px" }}>
        <div className="footer-inner">
          <div className="footer-bottom" style={{ justifyContent: "center" }}>
            <span>© 2024 RentalWebsite. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PropertyDetail;
