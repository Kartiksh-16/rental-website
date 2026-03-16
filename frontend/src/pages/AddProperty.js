import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AddProperty() {
  const [data, setData] = useState({
    title: "", city: "", price: "", type: "", description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // image base64 as string, or you can use FormData for file upload
      const payload = { ...data, image: imagePreview || "" };
      const res = await axios.post("http://localhost:5000/api/properties/add", payload);
      console.log(res.data);
      setSuccess(true);
      setData({ title: "", city: "", price: "", type: "", description: "" });
      setImageFile(null);
      setImagePreview(null);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="add-property-page">
        <div className="add-property-card">
          <h2>🏠 Add New Property</h2>
          <p className="subtitle">Fill in the details to list your property</p>

          {success && (
            <div className="success-msg">
              ✅ Property added successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Image Upload */}
            <div className="form-group">
              <label>Property Image</label>
              <div
                className={`image-upload-box${imagePreview ? " has-image" : ""}`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById("imgInput").click()}
              >
                {imagePreview ? (
                  <div className="image-preview-wrap">
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                    <button
                      type="button"
                      className="remove-img-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                    >✕ Remove</button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <span className="upload-icon">📷</span>
                    <p>Click to upload or drag & drop</p>
                    <span>JPG, PNG, WEBP — Max 5MB</span>
                  </div>
                )}
                <input
                  id="imgInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Property Title *</label>
              <input
                placeholder="e.g. Modern 2BHK Apartment"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <select
                  value={data.city}
                  onChange={(e) => setData({ ...data, city: e.target.value })}
                  required
                >
                  <option value="">Select City</option>
                  {["Mumbai","Delhi","Bangalore","Goa","Jaipur","Pune","Hyderabad","Chennai"].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Property Type *</label>
                <select
                  value={data.type}
                  onChange={(e) => setData({ ...data, type: e.target.value })}
                  required
                >
                  <option value="">Select Type</option>
                  {["House","Apartment","Room","Villa","PG/Hostel","Commercial"].map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Monthly Rent (₹) *</label>
              <input
                placeholder="e.g. 25000"
                type="number"
                value={data.price}
                onChange={(e) => setData({ ...data, price: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Describe your property — amenities, floor, furnishing..."
                rows={4}
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                style={{ resize: "vertical" }}
              />
            </div>

            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "⏳ Adding Property..." : "🏠 Add Property"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProperty;
