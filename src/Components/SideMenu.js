import React, { useState, useEffect } from "react";
import { Avatar, Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import "./SideMenu.css";
import {
  Accessibility,
  ChevronLeft,
  Equalizer,
  EventAvailable,
  HelpOutline,
  MenuOpen,
  Notes,
  PeopleAlt,
  ShowChart,
  SupervisedUserCircle,
  Wc,
} from "@material-ui/icons";
import { auth, db } from "../Files/firebase";
import {
  selectUser,
  loggedOutRecently,
  selectCurrentUserDBDetails,
} from "../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import NavigationOption from "./NavigationOption";
import { Link } from "react-router-dom";
import firebase from "firebase";

const SideMenu = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const currentUserDBDetails = useSelector(selectCurrentUserDBDetails);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.signOut();
    setAnchorEl(null);
    dispatch(loggedOutRecently());
  };

  const verifyAccountHandler = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {});

    handleClose();
  };

  return (
    <div className="app__sideMenu">
      {currentUser ? (
        <div className="sidebar__header">
          <Avatar
            src={
              currentUserDBDetails?.userDetails?.accountPhotoURL
                ? currentUserDBDetails?.userDetails?.accountPhotoURL
                : currentUser?.photoUrl
            }
            className="sideBar__userAvatar pointer"
          />
          <div className="sideBar__userName pointer">
            {currentUserDBDetails?.userDetails?.companyUser ? (
              <>
                <h3>
                  {currentUserDBDetails?.userDetails?.accountDisplayName
                    ? currentUserDBDetails?.userDetails?.accountDisplayName
                    : currentUserDBDetails?.userDetails?.companyCeoName}
                </h3>
                <span>
                  CEO @{currentUserDBDetails?.userDetails?.companyFullName}
                </span>
              </>
            ) : (
              <>
                <h3>
                  {currentUserDBDetails?.userDetails?.accountDisplayName
                    ? currentUserDBDetails?.userDetails?.accountDisplayName
                    : currentUser?.displayName}
                </h3>
                <span>
                  Member since:{" "}
                  {new Date(
                    currentUserDBDetails?.userDetails?.memberSince?.toDate()
                  ).toLocaleDateString()}
                </span>
              </>
            )}
          </div>
          <IconButton
            className="sideBar__menuIcon pointer"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuOpen fontSize="small" />
          </IconButton>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <ChevronLeft />
            </MenuItem>
            {}
            <MenuItem onClick={verifyAccountHandler}>Verify Account</MenuItem>
            <MenuItem onClick={handleClose}>Reset Account Credentials</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <div className="sidebar__header sidebar__headerNoUser">
          <h4>You are not logged in</h4>
          <Link to="/auth/signin">
            <Button>Login</Button>
          </Link>
        </div>
      )}

      <div className="sideBar__options">
        <NavigationOption
          text="Employees List"
          icon={<SupervisedUserCircle />}
        />
        <NavigationOption text="Interviews" icon={<Wc />} />
        <NavigationOption text="Meetings" icon={<PeopleAlt />} />
        <NavigationOption text="Company Events" icon={<EventAvailable />} />
        <NavigationOption text="Stock News" icon={<ShowChart />} />
        <NavigationOption text="Company States" icon={<Equalizer />} />
        <NavigationOption text="Others" icon={<Notes />} />
        <NavigationOption text="FAQs" icon={<HelpOutline />} />
        <NavigationOption text="Help" icon={<Accessibility />} />
      </div>
    </div>
  );
};

export default SideMenu;
