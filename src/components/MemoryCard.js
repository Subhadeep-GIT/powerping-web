import React from "react";
import "./StatusCard.css";
import { FaMemory } from "react-icons/fa";

export default function MemoryCard({ memoryData, lastUpdated = "N/A", onRefresh = () => {} }) {
  const { totalMB, usedMB, freeMB, percentUsed } = memoryData || {};

  const handleRefreshClick = () => {
    const btn = document.querySelector(".refresh-btn.memory");
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 300);
    onRefresh();
  };

  return (
    <div className="status-card-container">
      <div className={`status-card border-ac`}>
        <div className="card-title">🧠 Memory Usage</div>

        <div className="icon-section">
          <FaMemory size={48} color="#28a745" />
        </div>

        <div className="label">Used: {usedMB?.toFixed(1)} MB</div>
        <div className="label">Free: {freeMB?.toFixed(1)} MB</div>
        <div className="label">Total: {totalMB?.toFixed(1)} MB</div>
        <div className="status-text">💾 {percentUsed?.toFixed(1)}% Used</div>

        <div className="meta">🕒 Last Updated: {lastUpdated}</div>

        <button className="refresh-btn memory" onClick={handleRefreshClick}>
          🔄 Refresh
        </button>
      </div>
    </div>
  );
}