import React from "react";

export default function CircleIcon({ label, img, onClick }) {
  return (
    <div
      className="circle-icon"
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        minWidth: 64,
        flexShrink: 0,
        cursor: "pointer", // 👈 enables click feedback
        userSelect: "none", // 👈 prevents accidental text selection
      }}
    >
      <img
        src={img}
        alt={label}
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)", // 👈 subtle polish
        }}
      />
      <span
        style={{
          marginTop: 8,
          color: "#eaeaea",
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
  );
}