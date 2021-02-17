import React from "react";
import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
} from "@material-ui/core";
import {
  BorderAll,
  ChatBubbleOutline,
  NotificationsActive,
  NotificationsNone,
  PowerSettingsNew,
  Search,
} from "@material-ui/icons";
import "./Header.css";

const Header = ({ notifications, messages }) => {
  return (
    <AppBar className="app__header" position="static">
      <Toolbar>
        <Grid alignItems="center" container>
          <Grid item>
            <InputBase
              placeholder="Search Topics"
              startAdornment={<Search fontSize="small" />}
              className="header__searchInput"
            />
          </Grid>
          <Grid sm item />

          <Grid item>
            <IconButton color="secondary">
              <Badge
                className="headerIcons__badge"
                color="secondary"
                badgeContent={notifications}
              >
                {notifications > 0 ? (
                  <NotificationsActive
                    className="header__icon"
                    color="secondary"
                  />
                ) : (
                  <NotificationsNone
                    className="header__icon"
                    color="secondary"
                  />
                )}
              </Badge>
            </IconButton>
            <IconButton color="secondary">
              <Badge
                className="headerIcons__badge"
                color="secondary"
                badgeContent={messages}
              >
                <ChatBubbleOutline
                  className="header__icon"
                  fontSize="small"
                  color="secondary"
                />
              </Badge>
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
