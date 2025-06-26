// components/HamburgerMenu.js
import React, { useState, useEffect, useRef } from "react";
import "./HamburgerMenu.css";

export default function HamburgerMenu({ activeView, onSelect }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const views = ["Power", "Memory", "Battery", "Network"];

  const toggleMenu = () => setOpen(!open);

  // 📌 Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRefresh = () => {
    window.location.reload(true); // 🔄 Hard refresh
  };

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

          <div className="menu-separator" />

          <div className="menu-item refresh-item" onClick={handleRefresh}>
            🔄 Refresh
          </div>
        </div>
      )}
    </div>
  );
}