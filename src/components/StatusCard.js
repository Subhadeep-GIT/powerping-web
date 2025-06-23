import React from "react";
import "./StatusCard.css";
import { FaPlug } from "react-icons/fa";

export default function StatusCard({
  powerStatus = "Unknown",
  serverStatus = "Disconnected",
  lastUpdated = "N/A",
  onRefresh = () => {}
}) {
  const isAC = powerStatus === "AC";
  const isConnected = serverStatus === "Connected";

  return (
    <div className="card" role="region" aria-label="Power Status Card">
      <div className="card-header">Power Ping</div>

      <div className="icon-wrapper">
        <FaPlug size={48} color="#fff" />
      </div>

      <div className="label">Currently on:</div>
      <div className={`status ${isAC ? "ac" : "battery"}`}>
        {isAC ? "AC Power" : "Battery"}
      </div>

      <div className="sub">Last Updated: {lastUpdated}</div>
      <div className="sub">
        Server Status:{" "}
        <span className={isConnected ? "ac" : "battery"}>{serverStatus}</span>
      </div>

      <button className="refresh-btn" onClick={onRefresh} aria-label="Refresh Power Status">
        Refresh Status
      </button>
    </div>
  );
}