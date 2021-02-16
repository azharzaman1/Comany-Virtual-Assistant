import { Tooltip } from "@material-ui/core";
import React from "react";

const NavigationOption = ({
  link,
  icon,
  text,
  specificId,
  shrinkNavBar,
  tooltip,
  ...others
}) => {
  return (
    <Tooltip
      className="sideBar__navItemToolTip"
      title={tooltip}
      arrow
      enterDelay={225}
      leaveDelay={180}
      placement="right"
    >
      <a
        className={`sideBar__navItem ${shrinkNavBar && "shrinkedNavItem"}`}
        id={specificId}
        href={link}
        {...others}
      >
        {icon}
        <span>{text}</span>
      </a>
    </Tooltip>
  );
};

export default NavigationOption;
