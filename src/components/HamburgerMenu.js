// components/HamburgerMenu.js
import React, { useState, useEffect, useRef } from "react";
import "./HamburgerMenu.css";

export default function HamburgerMenu({ activeView, onSelect }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const views = ["Power", "Memory", "CPU", "Battery", "Logs", "Refresh"];

  const toggleMenu = () => setOpen(!open);

  // 📌 Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="hamburger-wrapper" ref={menuRef}>
      <div className="hamburger-icon" onClick={toggleMenu}>
        ☰
      </div>

      {open && (
        <div className="hamburger-dropdown">
          {views.map((view) => (
            <div
              key={view}
              className={`menu-item ${activeView === view ? "active" : ""}`}
              onClick={() => {
                onSelect(view);
                setOpen(false);
              }}
            >
              {view}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}