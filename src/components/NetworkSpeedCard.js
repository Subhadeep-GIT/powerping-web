import React from "react";

export default function NetworkSpeedCard({ speedData, lastUpdated, onRefresh }) {
  return (
    <div className="status-card">
      <h2 className="card-title">🌐 Network Speed</h2>

      <div className="status-row">
        <span>Latency:</span>
        <span>{speedData.latencyMs} ms</span>
      </div>

      <div className="status-row">
        <span>Download:</span>
        <span>{speedData.downloadMbps} Mbps</span>
      </div>

      <div className="status-row">
        <span>Upload:</span>
        <span>{speedData.uploadMbps} Mbps</span>
      </div>

      <div className="status-footer">
        <span>Last Updated: {lastUpdated}</span>
        <button onClick={onRefresh}>Refresh</button>
      </div>
    </div>
  );
}