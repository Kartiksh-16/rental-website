import React from "react";
import { useNavigate } from "react-router-dom";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80",
];

function PropertyCard({ _id, title, price, city, image, index = 0 }) {
  const navigate = useNavigate();
  const imgSrc = image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

  return (
    <div
      className="property-card"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div style={{ overflow: "hidden" }}>
        <img
          src={imgSrc}
          alt={title}
          onError={(e) => {
            e.target.src = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
          }}
        />
      </div>
      <div className="card-body">
        <h5>{title}</h5>
        <div className="card-price">
          ₹ {Number(price).toLocaleString("en-IN")} / month
        </div>
        <div className="card-city">📍 {city}</div>
        <button
          className="btn-view"
          onClick={() => navigate(`/property/${_id}`)}
        >
          View Details →
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;
