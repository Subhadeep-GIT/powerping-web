import React from "react";
import "./StatusCard.css";
import { FaBatteryFull } from "react-icons/fa";

export default function BatteryLevelCard({ battery = 0, lastUpdated = "N/A", onRefresh = () => {} }) {
  const handleRefreshClick = () => {
    const btn = document.querySelector(".refresh-btn.battery");
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 300);
    onRefresh();
  };

  return (
    <div className="status-card-container">
      <div className={`status-card ${battery > 50 ? "border-ac" : "border-battery"}`}>
        <div className="card-title">🔋 Battery Level</div>

        <div className="icon-section">
          <FaBatteryFull size={48} color={battery > 50 ? "#00c853" : "#ff9100"} />
        </div>

        <div className="label">Battery Charge:</div>
        <div className="status-text">{battery}%</div>

        <div className="meta">🕒 Last Updated: {lastUpdated}</div>

        <button className="refresh-btn battery" onClick={handleRefreshClick}>
          🔄 Refresh
        </button>
      </div>
    </div>
  );
}