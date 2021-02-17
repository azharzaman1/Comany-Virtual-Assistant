import { Tooltip } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveSectionI } from "../redux/slices/generalSlice";

const NavigationOption = ({
  link,
  icon,
  text,
  specificId,
  shrinkNavBar,
  tooltip,
  section,
  activeLink,
  sectionIndex,
  ...others
}) => {
  const dispatch = useDispatch();

  return (
    <Tooltip
      className="sideBar__navItemToolTip"
      title={tooltip}
      arrow
      enterDelay={100}
      leaveDelay={100}
      placement="right"
    >
      <Link
        onClick={() => {
          dispatch(setActiveSectionI(sectionIndex));
        }}
        to={section}
        className={`sideBar__navItem ${shrinkNavBar && "shrinkedNavItem"} ${
          activeLink && "sideBar__ActiveNavItem"
        }`}
        id={specificId}
        {...others}
      >
        {icon}
        <span>{text}</span>
      </Link>
    </Tooltip>
  );
};

export default NavigationOption;
