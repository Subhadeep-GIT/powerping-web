import React, { useState, useEffect, useCallback, useRef } from "react";
import StatusCard from "./components/StatusCard";
import MemoryCard from "./components/MemoryCard";
import BatteryLevelCard from "./components/BatteryLevelCard";
import HamburgerMenu from "./components/HamburgerMenu";
import "./App.css";

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function App() {
  const [powerStatus, setPowerStatus] = useState("");
  const [serverStatus, setServerStatus] = useState("Connecting...");
  const [lastUpdated, setLastUpdated] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(true);
  const [highlightClass, setHighlightClass] = useState("");
  const [activeView, setActiveView] = useState("Power");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [batteryLevel, setBatteryLevel] = useState(null);
  const [memoryData, setMemoryData] = useState(null);

  const menuRef = useRef(null);
  const previousPowerStatus = useRef("");
  const firstRun = useRef(true);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().catch((err) =>
        console.warn("Notification permission error:", err)
      );
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const fetchPowerStatus = useCallback(async () => {
    try {
      const res = await fetch("https://dir-actors-bind-problem.trycloudflare.com/power-status");
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const json = await res.json();

      const newStatus = json.powerStatus;
      if (newStatus === "AC" || newStatus === "Battery") {
        if (!firstRun.current && previousPowerStatus.current !== newStatus) {
          setHighlightClass("highlight");
          setTimeout(() => setHighlightClass(""), 700);
        }

        previousPowerStatus.current = newStatus;
        if (newStatus !== powerStatus) setPowerStatus(newStatus);

        setServerStatus("Connected");
        setIsLoading(false);
      } else {
        throw new Error("Invalid powerStatus value");
      }
    } catch (e) {
      console.error("❌ Fetch failed:", e.message);
      setServerStatus("Disconnected");
    }

    setLastUpdated(getTime());
  }, [powerStatus]);

  const fetchBatteryData = useCallback(async () => {
    try {
      const res = await fetch("https://dir-actors-bind-problem.trycloudflare.com/battery-percentage");
      const json = await res.json();
      setBatteryLevel(json.battery);
      setLastUpdated(getTime());
    } catch (err) {
      console.error("Battery fetch error:", err);
    }
  }, []);

  const fetchMemoryData = useCallback(async () => {
    try {
      const res = await fetch("https://dir-actors-bind-problem.trycloudflare.com/memory-usage");
      const json = await res.json();
      setMemoryData(json);
      setLastUpdated(getTime());
    } catch (err) {
      console.error("Memory fetch error:", err);
    }
  }, []);

  useEffect(() => {
    fetchPowerStatus();
    const interval = setInterval(fetchPowerStatus, 10000);
    return () => clearInterval(interval);
  }, [fetchPowerStatus]);

  useEffect(() => {
    if (
      !firstRun.current &&
      "Notification" in window &&
      Notification.permission === "granted" &&
      navigator.serviceWorker
    ) {
      const message =
        powerStatus === "AC"
          ? "Power Source switched to AC."
          : "Power Source switched to Backup Power.";

      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) {
          reg.showNotification("Power Ping", {
            body: message,
            icon: "/logo192.png",
          });
        }
      });
    } else {
      firstRun.current = false;
    }
  }, [powerStatus]);

  const handleViewChange = (view) => {
    setActiveView(view);
    setIsMenuOpen(false);
    if (view === "Battery") fetchBatteryData();
    if (view === "Memory") fetchMemoryData();
  };

  if (isLoading && activeView === "Power") {
    return (
      <div
        style={{
          backgroundColor: "#121212",
          color: "#31c6a9",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            border: "6px solid #555",
            borderTop: "6px solid #ff2da5",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <p style={{ marginTop: "20px", fontSize: "18px", textAlign: "center" }}>
          Connecting to Power Ping Server...
        </p>
        <p style={{ marginTop: "12px", fontSize: "14px", color: "#999" }}>
          Developed by Subhadeep
        </p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* 🔝 App Header with Menu */}
      <div className="app-header">
        <div className="app-title">Power Ping</div>
        <div className="menu-icon-container" ref={menuRef}>
          <HamburgerMenu
            isOpen={isMenuOpen}
            onToggle={() => setIsMenuOpen((prev) => !prev)}
            onSelect={handleViewChange}
            activeView={activeView}
          />
        </div>
      </div>

      {/* 📦 Card View Section */}
      <div className="card-container">
        {activeView === "Power" && (
          <StatusCard
            powerStatus={powerStatus}
            serverStatus={serverStatus}
            lastUpdated={lastUpdated}
            onRefresh={fetchPowerStatus}
            highlightClass={highlightClass}
          />
        )}

        {activeView === "Memory" && memoryData && (
          <MemoryCard
            memoryData={memoryData}
            lastUpdated={lastUpdated}
            onRefresh={fetchMemoryData}
          />
        )}

        {activeView === "Battery" && batteryLevel !== null && (
          <BatteryLevelCard
            battery={batteryLevel}
            lastUpdated={lastUpdated}
            onRefresh={fetchBatteryData}
          />
        )}
      </div>

      {/* 🔔 Test Push Button */}
      <button
        onClick={() => {
          if (
            "Notification" in window &&
            Notification.permission === "granted" &&
            navigator.serviceWorker
          ) {
            navigator.serviceWorker.getRegistration().then((reg) => {
              if (reg) {
                reg.showNotification("Test Notification", {
                  body: "This is a test notification.",
                  icon: "/logo192.png",
                });
              }
            });
          } else {
            console.log("🔕 Notification not allowed or supported.");
          }
        }}
      >
        Test Notification
      </button>
    </div>
  );
}

export default App;