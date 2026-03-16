import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroSection({ onSearch }) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ city: "", type: "", price: "" });

  const handleSearch = () => {
    if (onSearch) onSearch(filters);
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Find Your Perfect Rental Home</h1>
        <p>Browse the best selection of rental houses, apartments, and rooms ✦</p>

        <div className="search-box">
          <select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          >
            <option value="">City</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Goa">Goa</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">Property Type</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Room">Room</option>
            <option value="Villa">Villa</option>
          </select>

          <select
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          >
            <option value="">Price (Max)</option>
            <option value="20000">₹20,000</option>
            <option value="30000">₹30,000</option>
            <option value="50000">₹50,000</option>
            <option value="80000">₹80,000</option>
            <option value="100000">₹1,00,000+</option>
          </select>

          <button className="btn-search" onClick={handleSearch}>
            🔍 Search
          </button>
        </div>

        <button className="btn-add-hero" onClick={() => navigate("/add")}>
          + Add Property
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
