import React, { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import "./App.css";
import SideMenu from "./Components/SideMenu";
import Header from "./Components/Header";
import { theme } from "./Files/MuiTheme";
import AppDynamicSection from "./Components/AppDynamicSection";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmployeesList,
  SET_EMPLOYEES_LIST,
  SET_EMPLOYEE_DEPARTMENTS_LIST,
} from "./redux/slices/employeesSlice";
import { auth, db } from "./Files/firebase";
import {
  selectCurrentUserRole,
  SET_USER,
  selectUser,
  selectLoggedOutState,
  SET_CURRENT_USER_IN_DB,
  selectCurrentUserInDB,
} from "./redux/slices/userSlice";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "./Components/files/LocalStorage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Signup from "./Authentication/Signup";
import Signin from "./Authentication/Signin";
import GradientLoader from "./Components/loading/GradientLoader";
import { selectLoadingState, setLoading } from "./redux/slices/generalSlice";
import Popup from "./Components/Popup";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const loadingState = useSelector(selectLoadingState);
  const loggedOutRecently = useSelector(selectLoggedOutState);
  const currentUserInDB = useSelector(selectCurrentUserInDB);
  const [redirect, setRedirect] = useState();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (currentUser) {
      return setRedirect(<Redirect to="/" />);
    } else if (!loggedOutRecently) {
      return setRedirect(<Redirect to="/auth/registration" />);
    } else if (!currentUser && loggedOutRecently) {
      return setRedirect(<Redirect to="/auth/signin" />);
    } else {
      return null;
    }
  }, [currentUser]);

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

  useEffect(() => {
    if (currentUserInDB) {
      db.collection(currentUserInDB.userData.usersCat)
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

  useEffect(() => {
    let subscribe = () => {};
    if (currentUserInDB) {
      subscribe = db
        .collection(currentUserInDB.userData.usersCat)
        .doc(currentUser?.uid)
        .collection("employeesList")
        .onSnapshot((snapshot) => {
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
        localStorage.setItem("userID", authUser?.uid);
      } else {
        dispatch(SET_USER(null));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      console.log("CURRENT LOGGED IN USER >>>>", currentUser);
    }
  }, [currentUser]);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Popup open={loadingState} loadingPopup>
          <GradientLoader />
        </Popup>
        <Router>
          {redirect}
          <Switch>
            <Route exact path="/">
              <SideMenu />
              <div className="app__changeableContent">
                <Header />
                <AppDynamicSection />
              </div>
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
