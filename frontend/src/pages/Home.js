import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import PropertyCard from "../components/PropertyCard";
import Sidebar from "../components/Sidebar";

const PROPERTY_TYPES = [
  { icon: "🏠", label: "House",      count: "240 listed" },
  { icon: "🏢", label: "Apartment",  count: "180 listed" },
  { icon: "🛏️", label: "Room",       count: "75 listed"  },
  { icon: "🏡", label: "Villa",      count: "45 listed"  },
  { icon: "🏗️", label: "PG/Hostel",  count: "60 listed"  },
  { icon: "🏬", label: "Commercial", count: "30 listed"  },
];

const BLOG_POSTS = [
  { id: 1, title: "Tips for First-Time Renters",          desc: "How to choose a home for the right location", date: "April 22, 2023", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=120&q=70" },
  { id: 2, title: "How to Choose the Right Neighborhood", desc: "Factors to consider when picking your area",   date: "April 20, 2023", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=70" },
  { id: 3, title: "Simple Maintenance Tips for Renters",  desc: "Keep your rental home in top shape easily",   date: "April 15, 2023", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&q=70" },
];

const FEATURES = [
  { icon: "🔍", title: "Easy Search",      desc: "Find your perfect rental with advanced search filters" },
  { icon: "✅", title: "Verified Listings", desc: "All properties are verified for safety and quality"    },
  { icon: "🔒", title: "Secure Payments",  desc: "Safe and easy online payment methods"                  },
];

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton-line" />
        <div className="skeleton-line short" />
        <div className="skeleton-line short" />
      </div>
    </div>
  );
}

function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filtered, setFiltered]     = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/properties")
      .then((res) => { setProperties(res.data); setFiltered(res.data); })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = ({ city, type, price }) => {
    let result = [...properties];
    if (city)  result = result.filter((p) => p.city?.toLowerCase().includes(city.toLowerCase()));
    if (type)  result = result.filter((p) => p.type?.toLowerCase().includes(type.toLowerCase()));
    if (price) result = result.filter((p) => Number(p.price) <= Number(price));
    setFiltered(result);
  };

  return (
    <div>
      <Navbar />
      <HeroSection onSearch={handleSearch} />

      {/* Property Types */}
      <div className="property-types">
        <div className="container">
          {PROPERTY_TYPES.map((t) => (
            <div className="type-item" key={t.label} onClick={() => handleSearch({ type: t.label })}>
              <span className="type-icon">{t.icon}</span>
              <span>{t.label}</span>
              <span className="count">{t.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        <div>
          <h2 className="section-title">Recent Listings</h2>

          {loading ? (
            <div className="properties-grid">
              {[1,2,3].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length > 0 ? (
            <div className="properties-grid">
              {filtered.map((p, i) => (
                <PropertyCard
                  key={p._id || i}
                  _id={p._id}
                  title={p.title}
                  price={p.price}
                  city={p.city}
                  image={p.image}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🏘️</div>
              <p>No properties found. Try adjusting your search filters.</p>
            </div>
          )}

          {/* CTA Banner */}
          <div className="cta-banner">
            <div>
              <h3>Want to Rent Your Property?</h3>
              <p>List your property and connect with thousands of potential tenants</p>
            </div>
            <button className="btn-cta" onClick={() => window.location.href = "/add"}>
              + Add Property
            </button>
          </div>

          {/* Features */}
          <div className="features-section">
            <h2 className="section-title">Features</h2>
            <div className="features-grid">
              {FEATURES.map((f, i) => (
                <div className="feature-card" key={f.title} style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="feature-icon">{f.icon}</div>
                  <h6>{f.title}</h6>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Blog */}
          <div className="blog-section">
            <h2 className="section-title">Blog / Tips and Guides</h2>
            {BLOG_POSTS.map((post, i) => (
              <div className="blog-item" key={post.id} style={{ animationDelay: `${i * 0.1}s` }}>
                <img src={post.img} alt={post.title} className="blog-img" />
                <div className="blog-content">
                  <h6>{post.title}</h6>
                  <p>{post.desc}</p>
                </div>
                <span className="blog-date">{post.date}</span>
              </div>
            ))}
          </div>
        </div>

        <Sidebar />
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-links">
              {["Home","About Us","Blog","Contact","Privacy"].map((l) => (
                <a href="#!" key={l}>{l}</a>
              ))}
            </div>
            <div className="footer-social">
              {["f","🐦","in","📷"].map((s,i) => (
                <a className="footer-soc-btn" href="#!" key={i}>{s}</a>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2024 RentalWebsite. All rights reserved.</span>
            <span>Terms & Conditions · Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
