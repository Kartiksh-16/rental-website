import React, { useState } from "react";
import Navbar from "../components/Navbar";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }, 1200);
  };

  const INFO = [
    { icon: "📧", label: "Email",   value: "info@rentalwebsite.com" },
    { icon: "📞", label: "Phone",   value: "+91 9876543210"         },
    { icon: "📍", label: "Address", value: "Connaught Place, New Delhi, India" },
    { icon: "⏰", label: "Hours",   value: "Mon–Sat: 9AM – 7PM"    },
  ];

  return (
    <div>
      <Navbar />

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1a3c6e 0%, #2a5298 100%)",
        padding: "70px 20px",
        textAlign: "center",
        color: "#fff",
        animation: "fadeInDown 0.7s ease",
      }}>
        <h1 style={{ fontSize: "2.6rem", fontWeight: 900, marginBottom: "12px" }}>
          Contact Us 📬
        </h1>
        <p style={{ fontSize: "1.1rem", opacity: 0.85 }}>
          We'd love to hear from you. Send us a message and we'll respond within 24 hours.
        </p>
      </div>

      <div style={{ maxWidth: "1100px", margin: "60px auto", padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "40px", alignItems: "start" }}>

        {/* Contact Info */}
        <div style={{ animation: "slideInLeft 0.7s ease" }}>
          <h2 className="section-title" style={{ marginBottom: "28px" }}>Get in Touch</h2>
          {INFO.map((item) => (
            <div key={item.label} style={{
              display: "flex", gap: "16px", alignItems: "flex-start",
              padding: "18px", background: "#fff", borderRadius: "12px",
              boxShadow: "0 2px 14px rgba(0,0,0,0.07)", marginBottom: "14px",
              transition: "all 0.3s ease",
            }}>
              <span style={{ fontSize: "1.6rem" }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: "#1a3c6e", fontSize: "0.88rem", marginBottom: "3px" }}>{item.label}</div>
                <div style={{ color: "#555", fontSize: "0.92rem" }}>{item.value}</div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "28px" }}>
            <h4 style={{ fontWeight: 700, color: "#1a3c6e", marginBottom: "14px" }}>Follow Us</h4>
            <div style={{ display: "flex", gap: "12px" }}>
              {["f", "🐦", "in", "📸"].map((s, i) => (
                <a key={i} href="#!" className="social-btn" style={{ width: "42px", height: "42px", fontSize: "1rem" }}>{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{ animation: "slideInRight 0.7s ease" }}>
          <div className="add-property-card" style={{ margin: 0 }}>
            <h3 style={{ fontWeight: 800, color: "#1a3c6e", marginBottom: "6px", fontSize: "1.4rem" }}>Send a Message</h3>
            <p className="subtitle">We'll get back to you within 24 hours</p>

            {sent && (
              <div className="success-msg">
                ✅ Message sent successfully! We'll reply soon.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                >
                  <option value="">Select Subject</option>
                  <option>Property Listing Issue</option>
                  <option>Account Problem</option>
                  <option>Report a Listing</option>
                  <option>Partnership Inquiry</option>
                  <option>General Question</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  placeholder="Write your message here..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ resize: "vertical" }}
                  required
                />
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "⏳ Sending..." : "📨 Send Message"}
              </button>
            </form>
          </div>
        </div>
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

export default Contact;
