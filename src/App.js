import React, { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import "./App.css";
import SideMenu from "./Components/SideMenu";
import Header from "./Components/Header";
import { theme } from "./Files/MuiTheme";
import AppDynamicSection from "./Components/AppDynamicSection";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_EMPLOYEES_LIST,
  SET_EMPLOYEE_DEPARTMENTS_LIST,
} from "./redux/slices/employeesSlice";
import { auth, db } from "./Files/firebase";
import {
  SET_USER,
  SET_USER_REF,
  selectUser,
  selectUserRef,
  selectLoggedOutState,
  SET_CURRENT_USER_IN_DB,
  selectCurrentUserInDB,
} from "./redux/slices/userSlice";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "./Components/files/LocalStorage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./Authentication/Signup";
import Signin from "./Authentication/Signin";
import GradientLoader from "./Components/loading/GradientLoader";
import { selectLoadingState, setLoading } from "./redux/slices/generalSlice";
import Popup from "./Components/Popup";
import GoogleAuthPhaseTwo from "./Authentication/GoogleSignupPhaseTwo";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const userRef = useSelector(selectUserRef);
  const loadingState = useSelector(selectLoadingState);
  const loggedOutRecently = useSelector(selectLoggedOutState);
  const currentUserInDB = useSelector(selectCurrentUserInDB);
  const [allUsers, setAllUsers] = useState([]);

  // Fetch all users from DB

  useEffect(() => {
    const subscribe = db.collection("all_users").onSnapshot((snapshot) =>
      setAllUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          userData: doc.data(),
        }))
      )
    );
    return () => {
      subscribe();
    };
  }, [currentUser]);

  const userInDB = allUsers?.find((userInDB) => {
    return userInDB?.id == currentUser?.uid;
  });

  if (userInDB) {
    dispatch(SET_CURRENT_USER_IN_DB(userInDB));
  }

  // Set userRef to store

  // useEffect(() => {
  //   if (currentUserInDB) {
  //     dispatch(SET_USER_REF(`${currentUserInDB?.userData?.userRole}s`));
  //     setToLocalStorage("userRef", `${currentUserInDB?.userData?.userRole}s`);
  //   }
  // }, [currentUserInDB]);

  // Fetch and Set User Private Employee Departments List to store

  useEffect(() => {
    if (userRef || getFromLocalStorage("userRef")) {
      db.collection(userRef ? userRef : getFromLocalStorage("userRef"))
        .doc(currentUser?.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            dispatch(
              SET_EMPLOYEE_DEPARTMENTS_LIST([
                ...sortData(doc.data()?.uniqueDepartmentsList),
                {
                  id: doc.data()?.uniqueDepartmentsList.length + 1,
                  name: "Other",
                  value: "other",
                },
              ])
            );
          }
        });
    }

    const sortData = (data) => {
      const sortedData = [...data];
      return sortedData.sort((a, b) => (a.id > b.id ? 1 : -1));
    };
  }, [currentUser, currentUserInDB]);

  // Fetch and Set Employee List to store

  useEffect(() => {
    let subscribe = () => {};
    if (currentUserInDB) {
      const DocRef = db
        .collection(userRef ? userRef : getFromLocalStorage("userRef"))
        .doc(currentUser?.uid);

      subscribe = DocRef.collection("employeesList").onSnapshot((snapshot) => {
        dispatch(
          SET_EMPLOYEES_LIST(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              employeeDetails: doc.data(),
            }))
          )
        );

        if (!getFromLocalStorage("employeesList")) {
          setToLocalStorage(
            "employeesList",
            snapshot.docs.map((doc) => ({
              id: doc.id,
              employeeDetails: doc.data(),
            }))
          );
        }
      });
    }
    return () => {
      subscribe();
    };
  }, [currentUserInDB]);

  // Persist User in Store and Browser

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          SET_USER({
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
        dispatch(SET_USER(null));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Console Browser

  useEffect(() => {
    if (currentUser) {
      console.log("Current logged in User >>>>", currentUser);
    }
  }, [currentUser]);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        {/* <Popup open={loadingState} loadingPopup>
          <GradientLoader />
        </Popup> */}
        <Router>
          <Switch>
            <Route exact path="/">
              <SideMenu />
              <div className="app__changeableContent">
                <Header />
                <AppDynamicSection />
              </div>
            </Route>

            <Route path="/auth/registration/google/phase-two">
              <GoogleAuthPhaseTwo />
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
