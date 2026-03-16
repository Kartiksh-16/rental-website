const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({

  // ── Basic Info ──────────────────────────
  title: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },

  // ── Property Details ────────────────────
  bedrooms: {
    type: String,
    default: "2",
  },
  bathrooms: {
    type: String,
    default: "2",
  },
  area: {
    type: String,
    default: "1000 sq.ft",
  },
  furnishing: {
    type: String,
    default: "Semi-Furnished",
  },
  floor: {
    type: String,
    default: "2nd",
  },
  facing: {
    type: String,
    default: "East",
  },
  availability: {
    type: String,
    default: "Immediate",
  },
  locality: {
    type: String,
  },

  // ── Owner Details ───────────────────────
  ownerName: {
    type: String,
    default: "Property Owner",
  },
  ownerPhone: {
    type: String,
    default: "+91 9876543210",
  },
  ownerEmail: {
    type: String,
    default: "owner@rentalwebsite.com",
  },
  ownerType: {
    type: String,
    default: "Owner",   // Owner / Agent / Builder
  },
  ownerSince: {
    type: String,
    default: "2022",
  },

  // ── Location ────────────────────────────
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  address: {
    type: String,
  },

}, { timestamps: true });

module.exports = mongoose.model("Property", PropertySchema);
