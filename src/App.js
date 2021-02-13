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
  setUser,
  selectUser,
  selectLoggedOutState,
  setUserDBDetails,
  setUserCollection,
  selectUserCollec,
  selectCurrentUserInDB,
  setCurrentUserDBDetails,
  selectCurrentUserDBDetails,
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
  const userCollection = useSelector(selectUserCollec);
  const currentUserDBDetails = useSelector(selectCurrentUserDBDetails);
  const loadingState = useSelector(selectLoadingState);
  const [allUsers, setAllUsers] = useState([]);
  const currentUserInDB = useSelector(selectCurrentUserInDB);
  const [tempUsers, setTempUsers] = useState([]);
  // Fetch All user details

  let userRef = null;

  useEffect(() => {
    if (currentUser) {
      dispatch(
        setUserCollection(
          getFromLocalStorage("userRole")
            ? `${getFromLocalStorage("userRole")}s`
            : fetchCollectionFromDB()
        )
      );

      // Will not be called if userRole is already present in localStorage

      const fetchCollectionFromDB = () => {
        db.collection("all_users").onSnapshot((snapshot) =>
          setTempUsers(snapshot.docs.map((doc) => doc.data()))
        );
      };
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && userCollection) {
      db.collection(userCollection)
        .doc(currentUser?.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            dispatch(setCurrentUserDBDetails(doc.data()));
          }
        });
    }
  }, [currentUser, userCollection]);

  // Fetch all users from DB

  // useEffect(() => {
  //   const subscribe = db.collection("all_users").onSnapshot((snapshot) =>
  //     setAllUsers(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         userData: doc.data(),
  //       }))
  //     )
  //   );
  //   return () => {
  //     subscribe();
  //   };
  // }, [currentUser]);

  // const userInDB = allUsers?.find((userInDB) => {
  //   return userInDB?.id == currentUser?.uid;
  // });

  // if (userInDB) {
  //   // dispatch(setUserDBDetails(userInDB));
  // }

  // Set userRef to store

  // useEffect(() => {
  //   if (currentUserInDB) {
  //     dispatch(SET_USER_REF(`${currentUserInDB?.userData?.userRole}s`));
  //     setToLocalStorage("userRef", `${currentUserInDB?.userData?.userRole}s`);
  //   }
  // }, [currentUserInDB]);

  // Fetch and Set User Private Employee Departments List to store

  useEffect(() => {
    if (currentUser || userCollection) {
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
  }, [currentUserDBDetails]);

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
        <Popup open={loadingState} loadingPopup>
          <GradientLoader />
        </Popup>
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
