import React, { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import "./App.css";
import SideMenu from "./Components/SideMenu";
import Header from "./Components/Header";
import { theme } from "./Files/MuiTheme";
import AppDynamicSection from "./Components/AppDynamicSection";
import { useDispatch, useSelector } from "react-redux";
import { SET_EMPLOYEES_LIST } from "./redux/slices/employeesSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("employeesList")) {
      localStorage.setItem("employeesList", JSON.stringify([]));
    } else {
      dispatch(
        SET_EMPLOYEES_LIST(JSON.parse(localStorage.getItem("employeesList")))
      );
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <SideMenu />
        <div className="app__changeableContent">
          <Header />
          <AppDynamicSection />
        </div>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
