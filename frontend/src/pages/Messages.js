import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const MESSAGES = [
  { id: 1, from: "Rahul Mehta",  avatar: "👨", time: "2 hours ago",   unread: true,  property: "2BHK Apartment, Andheri",  last: "Hi, is this property still available? I'd like to schedule a visit this weekend." },
  { id: 2, from: "Priya Sharma", avatar: "👩", time: "Yesterday",     unread: true,  property: "Cozy Family Home, Bangalore", last: "Can you tell me more about the parking facilities available?" },
  { id: 3, from: "Amit Verma",   avatar: "🧑", time: "2 days ago",    unread: false, property: "Luxury Beach Villa, Goa",   last: "Thank you for the details. I'll get back to you by tomorrow." },
  { id: 4, from: "Sneha Patel",  avatar: "👩", time: "3 days ago",    unread: false, property: "Studio Near IT Park, Pune", last: "Is the rent negotiable? Please let me know." },
];

function Messages() {
  const navigate = useNavigate();
  const [messages, setMessages]   = useState(MESSAGES);
  const [active, setActive]       = useState(MESSAGES[0]);
  const [reply, setReply]         = useState("");
  const [chat, setChat]           = useState({});

  const handleOpen = (msg) => {
    setActive(msg);
    setMessages(messages.map((m) => m.id === msg.id ? { ...m, unread: false } : m));
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    const key = active.id;
    const prev = chat[key] || [];
    setChat({ ...chat, [key]: [...prev, { from: "You", text: reply, time: "Just now" }] });
    setReply("");
  };

  const unreadCount = messages.filter((m) => m.unread).length;

  return (
    <div>
      <Navbar />

      <div style={{
        background: "linear-gradient(135deg, #1a3c6e 0%, #2a5298 100%)",
        padding: "50px 20px", color: "#fff", animation: "fadeInDown 0.6s ease",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <span style={{ fontSize: "2rem" }}>💬</span>
            <h1 style={{ fontSize: "2rem", fontWeight: 900 }}>Messages</h1>
            {unreadCount > 0 && (
              <span style={{ background: "#f5a623", color: "#fff", borderRadius: "12px", padding: "2px 10px", fontSize: "0.9rem", fontWeight: 700 }}>{unreadCount} new</span>
            )}
          </div>
          <p style={{ opacity: 0.8 }}>Conversations with potential tenants</p>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 20px" }}>

        <div style={{ display: "flex", gap: "8px", fontSize: "0.88rem", color: "#888", marginBottom: "28px" }}>
          <span style={{ cursor: "pointer", color: "#1a3c6e" }} onClick={() => navigate("/")}>🏠 Home</span>
          <span>›</span>
          <span style={{ color: "#333", fontWeight: 600 }}>Messages</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "20px", minHeight: "520px" }}>

          {/* Message List */}
          <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 2px 14px rgba(0,0,0,0.07)", overflow: "hidden" }}>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #f0f0f0", fontWeight: 700, color: "#1a3c6e", fontSize: "0.95rem" }}>
              📬 All Conversations ({messages.length})
            </div>
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleOpen(msg)}
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid #f8f8f8",
                  cursor: "pointer",
                  background: active?.id === msg.id ? "#f0f4ff" : msg.unread ? "#fffbf0" : "#fff",
                  transition: "background 0.2s ease",
                  borderLeft: active?.id === msg.id ? "3px solid #1a3c6e" : "3px solid transparent",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>
                    {msg.avatar}
                  </div>
                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: msg.unread ? 800 : 600, color: "#222", fontSize: "0.9rem" }}>{msg.from}</span>
                      <span style={{ fontSize: "0.75rem", color: "#aaa" }}>{msg.time}</span>
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#f5a623", fontWeight: 600, marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      🏠 {msg.property}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#888", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {msg.last}
                    </div>
                  </div>
                  {msg.unread && <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#f5a623", flexShrink: 0 }} />}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Window */}
          {active ? (
            <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 2px 14px rgba(0,0,0,0.07)", display: "flex", flexDirection: "column" }}>
              {/* Chat Header */}
              <div style={{ padding: "18px 22px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
                  {active.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: "#1a3c6e" }}>{active.from}</div>
                  <div style={{ fontSize: "0.8rem", color: "#f5a623", fontWeight: 600 }}>🏠 {active.property}</div>
                </div>
                <button
                  onClick={() => navigate(`/property/${active.id}`)}
                  style={{ marginLeft: "auto", padding: "7px 16px", background: "#e8f0fe", border: "none", borderRadius: "8px", color: "#1a3c6e", fontWeight: 600, cursor: "pointer", fontSize: "0.82rem" }}
                >
                  View Property →
                </button>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, padding: "22px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "14px", minHeight: "300px" }}>
                {/* Original message */}
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
                    {active.avatar}
                  </div>
                  <div>
                    <div style={{ background: "#f4f6fb", borderRadius: "0 14px 14px 14px", padding: "12px 16px", maxWidth: "400px" }}>
                      <p style={{ margin: 0, color: "#333", fontSize: "0.92rem", lineHeight: 1.6 }}>{active.last}</p>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#aaa", marginTop: "4px" }}>{active.time}</div>
                  </div>
                </div>

                {/* Replies */}
                {(chat[active.id] || []).map((c, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div>
                      <div style={{ background: "#1a3c6e", borderRadius: "14px 0 14px 14px", padding: "12px 16px", maxWidth: "400px" }}>
                        <p style={{ margin: 0, color: "#fff", fontSize: "0.92rem", lineHeight: 1.6 }}>{c.text}</p>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#aaa", marginTop: "4px", textAlign: "right" }}>{c.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <form onSubmit={handleSend} style={{ padding: "16px 20px", borderTop: "1px solid #f0f0f0", display: "flex", gap: "10px" }}>
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply..."
                  style={{ flex: 1, padding: "11px 16px", border: "1.5px solid #e0e0e0", borderRadius: "25px", outline: "none", fontSize: "0.92rem", transition: "border-color 0.2s ease" }}
                  onFocus={(e) => e.target.style.borderColor = "#1a3c6e"}
                  onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                />
                <button type="submit" style={{ padding: "11px 22px", background: "#1a3c6e", color: "#fff", border: "none", borderRadius: "25px", fontWeight: 700, cursor: "pointer", fontSize: "0.92rem", transition: "all 0.2s ease" }}>
                  Send 📨
                </button>
              </form>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center", color: "#aaa" }}>
                <div style={{ fontSize: "3rem", marginBottom: "12px" }}>💬</div>
                <p>Select a conversation to view</p>
              </div>
            </div>
          )}
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

export default Messages;
