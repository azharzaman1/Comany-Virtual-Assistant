import React from "react";
import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="welcomeSection">
      <h1> Welcome </h1>
      <h3>To</h3>
      <h2>Vitual Assitant Application (Beta V0.1) </h2>
      <div className="copyright__section">
        <h3>
          Design & Developed by{" "}
          <a target="_blank" href="https://azharzaman.com">
            Azhar Zaman
          </a>
        </h3>
      </div>
    </div>
  );
};

export default Welcome;
