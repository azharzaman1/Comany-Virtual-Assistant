import React from "react";
import "./SideMenu.css";

const SideMenu = () => {
  return (
    <div className="app__sideMenu">
      <span
        style={{ fontSize: 60, fontWeight: "700", transform: "rotate(90deg)" }}
        className="content"
      >
        Sidebar Content
      </span>
    </div>
  );
};

export default SideMenu;
