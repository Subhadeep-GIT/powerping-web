import React from "react";
import "./TopMenu.css"; // ✅ Import the styles
import CircleIcon from "./CircleIcon"; // ✅ Already present

export default function TopMenu() {
  return (
    <div className="top-menu-container">
      <CircleIcon label="Power" img="power.png" />
      <CircleIcon label="Memory" img="memory.png" />
      <CircleIcon label="CPU" img="cpu.png" />
      <CircleIcon label="Battery" img="battery.png" />
      <CircleIcon label="Logs" img="logs.png" />
      <CircleIcon label="Refresh" img="refresh.png" />
    </div>
  );
}