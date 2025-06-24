import React from "react";

export default function CircleIcon({ label, img }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundColor: "#1f1f1f",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid #ff2da5",
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/" + img}
          alt={label}
          style={{ width: 24, height: 24 }}
        />
      </div>
      <span style={{ marginTop: 6, fontSize: 12, color: "#eee" }}>{label}</span>
    </div>
  );
}