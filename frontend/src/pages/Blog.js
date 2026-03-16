import React, { useState } from "react";
import Navbar from "../components/Navbar";

const BLOGS = [
  {
    id: 1,
    title: "Tips for First-Time Renters",
    category: "Tips",
    date: "April 22, 2023",
    read: "5 min read",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=80",
    desc: "Everything you need to know before signing your first rental agreement — from negotiating rent to checking documents.",
    author: "Priya Singh",
  },
  {
    id: 2,
    title: "How to Choose the Right Neighborhood",
    category: "Guide",
    date: "April 20, 2023",
    read: "7 min read",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
    desc: "Locality matters just as much as the house itself. Here's a complete checklist to evaluate any neighborhood before moving in.",
    author: "Ravi Sharma",
  },
  {
    id: 3,
    title: "Simple Maintenance Tips for Renters",
    category: "Tips",
    date: "April 15, 2023",
    read: "4 min read",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80",
    desc: "Small fixes can go a long way in maintaining your rental space and keeping your landlord happy.",
    author: "Amit Verma",
  },
  {
    id: 4,
    title: "Top 10 Affordable Cities to Rent in India",
    category: "Guide",
    date: "March 10, 2023",
    read: "6 min read",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80",
    desc: "Looking to move but worried about rent prices? These 10 cities offer excellent quality of life at affordable rates.",
    author: "Sneha Patel",
  },
  {
    id: 5,
    title: "Understanding Your Rental Agreement",
    category: "Legal",
    date: "February 28, 2023",
    read: "8 min read",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&q=80",
    desc: "Rental agreements can be confusing. We break down every clause so you know exactly what you're signing.",
    author: "Priya Singh",
  },
  {
    id: 6,
    title: "Furnished vs Unfurnished — What to Choose?",
    category: "Tips",
    date: "February 15, 2023",
    read: "4 min read",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80",
    desc: "Both have their pros and cons. We help you decide based on budget, duration, and lifestyle needs.",
    author: "Amit Verma",
  },
];

const CATEGORIES = ["All", "Tips", "Guide", "Legal"];

function Blog() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? BLOGS : BLOGS.filter((b) => b.category === active);

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
          Blog & Tips 📖
        </h1>
        <p style={{ fontSize: "1.1rem", opacity: 0.85 }}>
          Expert advice for renters, landlords, and property hunters
        </p>
      </div>

      <div style={{ maxWidth: "1100px", margin: "50px auto", padding: "0 20px" }}>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "36px", flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "9px 24px",
                borderRadius: "25px",
                border: "2px solid",
                borderColor: active === cat ? "#1a3c6e" : "#e0e0e0",
                background: active === cat ? "#1a3c6e" : "#fff",
                color: active === cat ? "#fff" : "#555",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.25s ease",
                fontSize: "0.9rem",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "28px", marginBottom: "60px" }}>
          {filtered.map((post, i) => (
            <div
              key={post.id}
              className="property-card"
              style={{ animationDelay: `${i * 0.1}s`, cursor: "pointer" }}
            >
              <div style={{ overflow: "hidden" }}>
                <img src={post.img} alt={post.title} style={{ width: "100%", height: "200px", objectFit: "cover", transition: "transform 0.4s ease" }} />
              </div>
              <div className="card-body">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ background: "#e8f0fe", color: "#1a3c6e", fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: "12px" }}>
                    {post.category}
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "#aaa" }}>{post.read}</span>
                </div>
                <h5 style={{ marginBottom: "8px" }}>{post.title}</h5>
                <p style={{ fontSize: "0.85rem", color: "#777", lineHeight: 1.6, marginBottom: "14px" }}>{post.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.8rem", color: "#aaa" }}>✍️ {post.author}</span>
                  <span style={{ fontSize: "0.78rem", color: "#aaa" }}>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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

export default Blog;
