import React, { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import "./App.css";
import SideMenu from "./Components/SideMenu";
import Header from "./Components/Header";
import { theme } from "./Files/MuiTheme";
import PageChangeAbleContentSection from "./Components/PageChangeAbleContentSection";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <SideMenu />
        <div className="app__changeableContent">
          <Header />
          <PageChangeAbleContentSection />
        </div>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
