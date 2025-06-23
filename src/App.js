import React, { useState, useEffect, useCallback, useRef } from "react";
import StatusCard from "./components/StatusCard";

// 🔧 Utility to get current time
function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function App() {
  const [powerStatus, setPowerStatus] = useState("");
  const [serverStatus, setServerStatus] = useState("Connecting...");
  const [lastUpdated, setLastUpdated] = useState("Loading...");
  const previousPowerStatus = useRef("");
  const firstRun = useRef(true); // skip notification on first fetch

  // 🔔 Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().catch((err) =>
        console.warn("Notification permission error:", err)
      );
    }
  }, []);

  // 🔄 Fetch power status from backend
  const fetchPowerStatus = useCallback(async () => {
    try {
      console.log("🔄 Fetching power status from backend...");

      const res = await fetch(
        "https://jun-correspondence-holly-fact.trycloudflare.com/power-status"
      );

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const json = await res.json();
      const newStatus = json.powerStatus;

      if (newStatus === "AC" || newStatus === "Battery") {
        previousPowerStatus.current = powerStatus;

        if (newStatus !== powerStatus) {
          setPowerStatus(newStatus);
        }

        setServerStatus("Connected");
        console.log("✅ Server marked as Connected");
      } else {
        throw new Error("Invalid powerStatus value");
      }
    } catch (e) {
      console.error("❌ Fetch failed:", e.message);
      setServerStatus("Disconnected");
    }

    setLastUpdated(getTime());
  }, [powerStatus]);

  // 📡 Auto polling every 10s
  useEffect(() => {
    fetchPowerStatus();
    const interval = setInterval(fetchPowerStatus, 10000);
    return () => clearInterval(interval);
  }, [fetchPowerStatus]);

  // 🛎️ Trigger service worker notification on status change
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
        } else {
          console.warn("No service worker registration found.");
        }
      });
    } else {
      firstRun.current = false;
    }
  }, [powerStatus]);

  return (
    <div>
      <StatusCard
        powerStatus={powerStatus}
        serverStatus={serverStatus}
        lastUpdated={lastUpdated}
        onRefresh={fetchPowerStatus}
      />

      {/* 🧪 Test Notification Button */}
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
              } else {
                console.warn("No service worker registered.");
              }
            });
          } else {
            console.log("🔕 Notification not allowed or supported.");
          }
        }}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#2b8e7e",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Test Notification
      </button>
    </div>
  );
}

export default App;