import React from "react";
import CircleIcon from "./CircleIcon"; // ✅ Add this

export default function TopMenu() {
  return (
    <div style={{ display: 'flex', overflowX: 'auto', gap: 16, padding: 12 }}>
      <CircleIcon label="Power" img="power.png" />
      <CircleIcon label="Memory" img="memory.png" />
      {/* Add more items as needed */}
    </div>
  );
}