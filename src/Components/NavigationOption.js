import React from "react";

const NavigationOption = ({ link, icon, text, specificId, shrinkNavBar }) => {
  return (
    <a
      className={`sideBar__navItem ${shrinkNavBar && "shrinkedNavItem"}`}
      id={specificId}
      href={link}
    >
      {icon}
      <span>{text}</span>
    </a>
  );
};

export default NavigationOption;
