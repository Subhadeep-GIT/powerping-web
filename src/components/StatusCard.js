import React from "react";
import "./StatusCard.css";
import { FaPlug } from "react-icons/fa";

export default function StatusCard({
  powerStatus = "Unknown",
  serverStatus = "Disconnected",
  lastUpdated = "N/A",
  onRefresh = () => {},
  highlightClass = ""
}) {
  const isAC = powerStatus === "AC";
  const isConnected = serverStatus === "Connected";

  const handleRefreshClick = () => {
    const btn = document.querySelector(".refresh-btn");
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 300);
    onRefresh();
  };

  return (
    <div className="status-card-container">
      <div
        className={`status-card ${isAC ? "border-ac" : "border-battery"} ${highlightClass}`}
        role="region"
        aria-label="Power Status"
      >
        <div className="card-title">⚡ Power Ping</div>

        <div className="icon-section">
          <FaPlug size={48} color="#ff2da5" />
        </div>

        <div className="label">Currently on:</div>
        <div className={`status-text ${isAC ? "ac" : "battery"}`}>
          {isAC ? "AC Power" : "Backup Power"}
        </div>

        <div className="meta">🕒 Last Updated: {lastUpdated}</div>
        <div className="meta">
          🛰 Server:{" "}
          <span className={isConnected ? "ac" : "battery"}>{serverStatus}</span>
        </div>

        <button className="refresh-btn" onClick={handleRefreshClick}>
          🔄 Refresh
        </button>
      </div>
    </div>
  );
}