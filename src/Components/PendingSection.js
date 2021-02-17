import React from "react";
import "./PendingSection.css";

const PendingSection = ({ version }) => {
  return (
    <div className="pendingSection__content">
      <h3>
        Coming Soon <span>(Beta V{version})</span>
      </h3>
    </div>
  );
};

export default PendingSection;
