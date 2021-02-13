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
  NotificationsNone,
  PowerSettingsNew,
  Search,
} from "@material-ui/icons";
import "./Header.css";

const Header = () => {
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
              <Badge color="secondary" badgeContent={4}>
                <NotificationsNone className="header__icon" fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton color="secondary">
              <Badge color="secondary" badgeContent={2}>
                <ChatBubbleOutline className="header__icon" fontSize="small" />
              </Badge>
            </IconButton>
            {/* <IconButton
              onClick={signoutHandler}
              color={currentUser ? "secondary" : "primary"}
            >
              <PowerSettingsNew className="header__icon" fontSize="small" />
            </IconButton> */}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
