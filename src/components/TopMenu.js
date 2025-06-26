import React from "react";
import "./TopMenu.css";
import CircleIcon from "./CircleIcon";

const buttons = [
  { label: "Power", img: "power.png" },
  { label: "Memory", img: "memory.png" },
  { label: "CPU", img: "cpu.png" },
  { label: "Battery", img: "battery.png" },
  { label: "Logs", img: "logs.png" },
  { label: "Refresh", img: "refresh.png" }
];

export default function TopMenu({ onSelect, activeLabel }) {
  return (
    <div className="top-menu-container">
      {buttons.map(({ label, img }) => (
        <CircleIcon
          key={label}
          label={label}
          img={img}
          onClick={() => onSelect(label)}
          isActive={label === activeLabel}
        />
      ))}
    </div>
  );
}