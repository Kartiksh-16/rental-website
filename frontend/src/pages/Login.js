import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "signup" && form.password !== form.confirm) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(mode === "login" ? "Login Successful! 🎉" : "Account Created! 🎉");
      navigate("/");
    }, 1200);
  };

  return (
    <div>
      <Navbar />
      <div className="auth-page">
        <div className="auth-left">
          <div className="auth-left-content">
            <div className="auth-logo">🏠</div>
            <h2>Find Your<br />Perfect Rental Home</h2>
            <p>Browse thousands of verified properties across India. Safe, simple, and seamless.</p>
            <div className="auth-features">
              <div className="auth-feat-item">✅ Verified Listings</div>
              <div className="auth-feat-item">🔒 Secure Platform</div>
              <div className="auth-feat-item">📍 Pan India Properties</div>
              <div className="auth-feat-item">💬 Direct Owner Contact</div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-card">
            <div className="auth-tabs">
              <button
                className={`auth-tab${mode === "login" ? " active" : ""}`}
                onClick={() => setMode("login")}
              >Login</button>
              <button
                className={`auth-tab${mode === "signup" ? " active" : ""}`}
                onClick={() => setMode("signup")}
              >Sign Up</button>
            </div>

            <h3>{mode === "login" ? "Welcome Back! 👋" : "Create Account 🏠"}</h3>
            <p className="auth-subtitle">
              {mode === "login"
                ? "Login to manage your properties"
                : "Join thousands of happy renters"}
            </p>

            <form onSubmit={handleSubmit}>
              {mode === "signup" && (
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              {mode === "signup" && (
                <div className="form-group">
                  <label>Confirm Password *</label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    required
                  />
                </div>
              )}

              {mode === "login" && (
                <div style={{ textAlign: "right", marginBottom: "16px" }}>
                  <span className="forgot-link">Forgot Password?</span>
                </div>
              )}

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "⏳ Please wait..." : mode === "login" ? "🔑 Login" : "🚀 Create Account"}
              </button>
            </form>

            <div className="auth-divider"><span>OR</span></div>

            <button className="btn-google">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" />
              Continue with Google
            </button>

            <p className="auth-switch">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => setMode(mode === "login" ? "signup" : "login")}>
                {mode === "login" ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
