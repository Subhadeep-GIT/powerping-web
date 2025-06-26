import React, { useState, useEffect, useCallback, useRef } from "react";
import StatusCard from "./components/StatusCard";
import TopMenu from "./components/TopMenu";
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
  const previousPowerStatus = useRef("");
  const firstRun = useRef(true);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().catch((err) =>
        console.warn("Notification permission error:", err)
      );
    }
  }, []);

  const fetchPowerStatus = useCallback(async () => {
    try {
      console.log("🔄 Fetching power status from backend...");

      const res = await fetch(
        "https://vsnet-characters-prove-inches.trycloudflare.com/power-status"
      );

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const json = await res.json();
      console.log("✅ Received response:", json);

      const newStatus = json.powerStatus;

      if (newStatus === "AC" || newStatus === "Battery") {
        if (!firstRun.current && previousPowerStatus.current !== newStatus) {
          // Animate background if power source changed
          setHighlightClass("highlight");
          setTimeout(() => setHighlightClass(""), 700);
        }

        previousPowerStatus.current = newStatus;

        if (newStatus !== powerStatus) {
          setPowerStatus(newStatus);
        }

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

  if (isLoading) {
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
    {/* 🧭 Top Navigation Menu */}
    <TopMenu />

    {/* ⚡ Power Status Card */}
    <div className="card-container">
      <StatusCard
        powerStatus={powerStatus}
        serverStatus={serverStatus}
        lastUpdated={lastUpdated}
        onRefresh={fetchPowerStatus}
        highlightClass={highlightClass}
      />
    </div>

    {/* 🔔 Test Notification Button */}
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