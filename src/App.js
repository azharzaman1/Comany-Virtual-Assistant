import React, { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import "./App.css";
import SideMenu from "./Components/SideMenu";
import Header from "./Components/Header";
import { theme } from "./Files/MuiTheme";
import Employees from "./Components/Employees";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmployeesList,
  setEmployeeDepartments,
} from "./redux/slices/employeesSlice";
import { auth, db } from "./Files/firebase";
import {
  setUser,
  selectUser,
  setUserCollection,
  selectUserCollec,
  setCurrentUserDBDetails,
  selectCurrentUserDBDetails,
} from "./redux/slices/userSlice";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "./Components/files/LocalStorage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Signup from "./Authentication/Signup";
import Signin from "./Authentication/Signin";
import GradientLoader from "./Components/loading/GradientLoader";
import Popup from "./Components/Popup";

import {
  selectLoadingState,
  setLoading,
  setShrinkSideBar,
} from "./redux/slices/generalSlice";
import GoogleAuthPhaseTwo from "./Authentication/GoogleSignupPhaseTwo";
import { sortById } from "./Components/files/utils";
import SignupPhaseTwo from "./Authentication/SignupPhaseTwo";
import PendingSection from "./Components/PendingSection";
import Welcome from "./Components/Welcome";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const userCollection = useSelector(selectUserCollec);
  const currentUserDBDetails = useSelector(selectCurrentUserDBDetails);
  const loadingState = useSelector(selectLoadingState);
  const [dynamicSectionToRender, setDynamicSectionToRender] = useState(<></>);

  // == Media queries in JS == //

  function myFunction(querry) {
    if (querry.matches) {
      dispatch(setShrinkSideBar(true));
    } else {
      dispatch(setShrinkSideBar(false));
    }
  }

  var querry = window.matchMedia("(max-width: 1100px)");
  myFunction(querry);
  querry.addListener(myFunction);

  useEffect(() => {
    console.log("Current logged in User >>>>", currentUser);

    if (getFromLocalStorage("userRole")) {
      dispatch(setUserCollection(getFromLocalStorage("userRole")));
    } else {
      db.collection("all_users")
        .doc(currentUser?.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            dispatch(setUserCollection(`${doc.data()?.userRole}s`));
          }
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      if (userCollection) {
        db.collection(userCollection)
          .doc(currentUser?.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              dispatch(setCurrentUserDBDetails(doc.data()));
            }
          });
      }
    }
  }, [currentUser, userCollection]);

  useEffect(() => {
    if (currentUserDBDetails) {
      dispatch(
        setEmployeeDepartments([
          ...sortById(currentUserDBDetails?.uniqueDepartmentsList),
          {
            id: currentUserDBDetails?.uniqueDepartmentsList.length + 1,
            name: "Other",
            value: "other",
          },
        ])
      );
    }
  }, [currentUserDBDetails]);

  useEffect(() => {
    if (currentUser && userCollection) {
      db.collection(userCollection)
        .doc(currentUser?.uid)
        .collection("employeesList")
        .onSnapshot((snapshot) => {
          dispatch(
            setEmployeesList(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                employeeDetails: doc.data(),
              }))
            )
          );
        });
    }
  }, [currentUser, userCollection]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          setUser({
            uid: authUser?.uid,
            email: authUser?.email,
            displayName: authUser?.displayName,
            photoUrl: authUser?.photoURL,
            providerData: authUser?.providerData,
            emailVerified: authUser?.emailVerified,
          })
        );
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1500);
        setToLocalStorage("userID", authUser?.uid);
      } else {
        dispatch(setUser(null));
        dispatch(setLoading(true));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        {/* <Popup
          className="loadingPopup__overlay"
          open={loadingState}
          loadingPopup
          popupSpecificClass="loading__popup"
        >
          <GradientLoader />
        </Popup> */}
        <Router>
          <Switch>
            <Route exact path="/">
              <SideMenu />
              <div className="app__changeableContent">
                <Header notifications={2} messages={1} />
                <Welcome />
              </div>
            </Route>
            <Route path="/employees">
              <SideMenu />
              <div className="app__changeableContent">
                <Header notifications={2} messages={1} />
                <Employees />
              </div>
            </Route>
            <Route path="/interviews">
              <SideMenu />
              <div className="app__changeableContent">
                <Header notifications={2} messages={1} />
                <PendingSection version={0.2} />
              </div>
            </Route>
            <Route path="/meetings">
              <SideMenu />
              <div className="app__changeableContent">
                <Header notifications={2} messages={1} />
                <PendingSection version={0.3} />
              </div>
            </Route>
            <Route path="/company-events">
              <SideMenu />
              <div className="app__changeableContent">
                <Header notifications={2} messages={1} />
                <PendingSection version={0.4} />
              </div>
            </Route>
            <Route path="/stock-news">
              <SideMenu />
              <div className="app__changeableContent">
                <Header notifications={2} messages={1} />
                <PendingSection version={0.5} />
              </div>
            </Route>
            <Route path="/frequently-asked-questions">
              <SideMenu />
              <div className="app__changeableContent">
                <Header notifications={2} messages={1} />
                <PendingSection version="Testing" />
              </div>
            </Route>
            <Route path="/help">
              <SideMenu />
              <div className="app__changeableContent">
                <Header notifications={2} messages={1} />
                <PendingSection version="Testing" />
              </div>
            </Route>
            <Route path="/notifications">
              <SideMenu />
              <div className="app__changeableContent">
                <Header notifications={2} messages={1} />
                <PendingSection version={0.6} />
              </div>
            </Route>
            <Route path="/messages">
              <SideMenu />
              <div className="app__changeableContent">
                <Header notifications={2} messages={1} />
                <PendingSection version={0.7} />
              </div>
            </Route>

            <Route path="/auth/registration/google/phase-two">
              <GoogleAuthPhaseTwo />
            </Route>
            <Route path="/auth/registration/phase-two">
              <SignupPhaseTwo />
            </Route>
            <Route path="/auth/registration">
              <Signup />
            </Route>
            <Route path="/auth/signin">
              <Signin />
            </Route>
          </Switch>
        </Router>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
