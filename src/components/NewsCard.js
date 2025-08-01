import React, { useEffect, useState } from "react";

function convertToIST(utcTime) {
  if (!utcTime) return "";
  const date = new Date(utcTime);
  return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

const NewsCard = ({ item }) => {
  const [status, setStatus] = useState(localStorage.getItem(item.link) || "");

  useEffect(() => {
    if (item.link) {
      localStorage.setItem(item.link, status);
    }
  }, [status, item.link]);

  const statusColor = {
    seen: "#fff3cd",
    working: "#d1ecf1",
    completed: "#d4edda",
    "": "#ffffff"
  };

  const isLive = item.title?.toLowerCase().includes("live");
  const isBreaking = item.title?.toLowerCase().includes("breaking");

  return (
    <div
      style={{
        backgroundColor: statusColor[status],
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "10px",
        marginBottom: "16px",
        textAlign: "left"
      }}
    >
      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        style={{ fontSize: "18px", fontWeight: "bold", color: "#007bff", display: "block" }}
      >
        {item.title}
      </a>

      <div style={{ marginTop: "6px" }}>
        {isBreaking && <span style={badgeStyle("red")}>Breaking</span>}
        {isLive && <span style={badgeStyle("green")}>Live</span>}
      </div>

      <div style={{ fontSize: "13px", color: "#555", marginTop: "6px" }}>
        {item.sport && <span>[{item.sport}] </span>}
        {item.source && <span>- {item.source}</span>}
        <br />
        🕒 {convertToIST(item.published)}
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setStatus("seen")} style={{ marginRight: "6px" }}>
          👁 Seen
        </button>
        <button onClick={() => setStatus("working")} style={{ marginRight: "6px" }}>
          ⚙ Working
        </button>
        <button onClick={() => setStatus("completed")}>✅ Completed</button>
      </div>
    </div>
  );
};

const badgeStyle = (color) => ({
  backgroundColor: color,
  color: "#fff",
  padding: "2px 6px",
  borderRadius: "4px",
  fontSize: "12px",
  marginRight: "6px"
});

export default NewsCard;
