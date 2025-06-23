import React from "react";

const RefreshButton = ({ onClick }) => (
  <button
    style={{
      marginTop: 16,
      padding: "10px 24px",
      border: "1px solid #2b8e7e",
      borderRadius: 20,
      background: "none",
      color: "#2b8e7e",
      fontWeight: 600,
      fontSize: 16,
      cursor: "pointer"
    }}
    onClick={onClick}
  >
    Refresh Status
  </button>
);

export default RefreshButton;