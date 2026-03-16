import React from "react";
import Navbar from "../components/Navbar";

const TEAM = [
  { name: "Ravi Sharma",   role: "Founder & CEO",       emoji: "👨‍💼", city: "Mumbai"    },
  { name: "Priya Singh",   role: "Head of Operations",  emoji: "👩‍💼", city: "Delhi"     },
  { name: "Amit Verma",    role: "Lead Developer",      emoji: "👨‍💻", city: "Bangalore" },
  { name: "Sneha Patel",   role: "Marketing Manager",   emoji: "👩‍🎨", city: "Jaipur"   },
];

const STATS = [
  { value: "10,000+", label: "Properties Listed" },
  { value: "50,000+", label: "Happy Tenants"     },
  { value: "25+",     label: "Cities Covered"    },
  { value: "5 Years", label: "of Trust"          },
];

function AboutUs() {
  return (
    <div>
      <Navbar />

      {/* Hero */}
      <div className="page-hero" style={{
        background: "linear-gradient(135deg, #1a3c6e 0%, #2a5298 100%)",
        padding: "80px 20px",
        textAlign: "center",
        color: "#fff",
        animation: "fadeInDown 0.7s ease",
      }}>
        <h1 style={{ fontSize: "2.8rem", fontWeight: 900, marginBottom: "14px" }}>
          About Us 🏠
        </h1>
        <p style={{ fontSize: "1.15rem", opacity: 0.85, maxWidth: "600px", margin: "0 auto" }}>
          India's most trusted rental property platform — connecting tenants and owners since 2019
        </p>
      </div>

      <div style={{ maxWidth: "1100px", margin: "60px auto", padding: "0 20px" }}>

        {/* Mission */}
        <div className="about-section" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "center", marginBottom: "70px" }}>
          <div style={{ animation: "slideInLeft 0.7s ease" }}>
            <h2 className="section-title">Our Mission</h2>
            <p style={{ color: "#555", lineHeight: 1.8, fontSize: "1rem", marginBottom: "16px" }}>
              We believe finding a rental home should be simple, transparent, and stress-free. Our platform connects thousands of property owners with verified tenants across India.
            </p>
            <p style={{ color: "#555", lineHeight: 1.8, fontSize: "1rem" }}>
              From a humble apartment in Mumbai to luxury villas in Goa — we list it all. Every property is verified for safety, accuracy, and quality before going live.
            </p>
          </div>
          <div style={{ animation: "slideInRight 0.7s ease" }}>
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80"
              alt="About"
              style={{ width: "100%", borderRadius: "18px", boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}
            />
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px",
          marginBottom: "70px", animation: "fadeInUp 0.7s ease",
        }}>
          {STATS.map((s) => (
            <div key={s.label} className="feature-card" style={{ textAlign: "center", padding: "30px 20px" }}>
              <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#1a3c6e", marginBottom: "8px" }}>
                {s.value}
              </div>
              <div style={{ color: "#777", fontSize: "0.95rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <h2 className="section-title" style={{ marginBottom: "30px" }}>Meet Our Team</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "22px", marginBottom: "60px" }}>
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className="feature-card"
              style={{ textAlign: "center", padding: "30px 20px", animationDelay: `${i * 0.1}s` }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "12px" }}>{member.emoji}</div>
              <h5 style={{ fontWeight: 700, color: "#1a3c6e", marginBottom: "4px" }}>{member.name}</h5>
              <p style={{ color: "#f5a623", fontWeight: 600, fontSize: "0.88rem", marginBottom: "4px" }}>{member.role}</p>
              <p style={{ color: "#aaa", fontSize: "0.82rem" }}>📍 {member.city}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <h2 className="section-title" style={{ marginBottom: "24px" }}>Our Values</h2>
        <div className="features-grid" style={{ marginBottom: "60px" }}>
          {[
            { icon: "🤝", title: "Trust First",       desc: "Every listing is manually verified before publishing" },
            { icon: "💡", title: "Innovation",        desc: "Constantly improving to give you the best experience" },
            { icon: "❤️", title: "Customer Focus",    desc: "Your satisfaction is our top priority, always"        },
          ].map((v) => (
            <div key={v.title} className="feature-card">
              <div className="feature-icon">{v.icon}</div>
              <h6>{v.title}</h6>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-bottom" style={{ justifyContent: "center" }}>
            <span>© 2024 RentalWebsite. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;
