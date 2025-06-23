// src/components/LoadingScreen.jsx
import React from "react";
import "./LoadingScreen.css"; // CSS file we'll create below

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="spinner-wrapper">
        <div className="spinner"></div>
        <div className="spinner-center-dot"></div>
      </div>
      <div className="underline"></div>
      <p className="loading-text">
        Connecting to Power Ping<br />Server…
      </p>
    </div>
  );
};

export default LoadingScreen;