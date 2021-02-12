import React, { useState, useEffect } from "react";
import { Button, Card, TextField } from "@material-ui/core";
import "./Signup.css";
import Google from "./google.png";
import { auth, db, googleProvider } from "../Files/firebase";
import { validateEmail } from "../Components/files/FormValidation";
import { Link, useHistory } from "react-router-dom";
import {
  selectCurrentUserRole,
  selectUser,
  selectUserRef,
  SET_USER_ROLE,
} from "../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { collectionName, setToDoc } from "../Components/files/utils";
import firebase from "firebase";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../Components/files/LocalStorage";
import { Input } from "../Components/files/FormComponents";

const Signup = () => {
  const dispatch = useDispatch();
  const userRef = useSelector(selectUserRef);
  const currentUser = useSelector(selectUser);
  const currentUserRole = useSelector(selectCurrentUserRole);
  const [fullName, setFullName] = useState("");
  const [companyCeoName, setCompanyCeoName] = useState("");
  const [companyCeoNameErr, setCompanyCeoNameErr] = useState(false);
  const [fullNameErr, setFullNameErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmErr, setPasswordConfirmErr] = useState(false);
  const [tempDepartments, setDefaultDepartments] = useState();

  const history = useHistory();

  document.title = "CVA | Registration";

  const signUpWithGoogle = async () => {
    await auth
      .signInWithPopup(googleProvider)
      .then((user) => {
        if (user) {
          setToLocalStorage("userID", user?.user.uid);
          setToLocalStorage("googleSignup_phase2", false);
        }
      })
      .catch((error) => alert(error.message));
    if (getFromLocalStorage("googleSignup_phase2")) {
      history.replace("/");
    } else {
      history.replace("/auth/registration/google/phase-two");
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    if (fullName === "") {
      setFullNameErr(true);
    }
    if (!validateEmail(email)) {
      setEmailErr(true);
    }
    if (password === "") {
      setPasswordErr(true);
    }
    if (password === "" || password !== passwordConfirm) {
      setPasswordConfirmErr(true);
    }
    if (
      fullName !== "" &&
      validateEmail(email) &&
      password !== "" &&
      password == passwordConfirm
    ) {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (user) => {
          setToLocalStorage("userID", user?.user.uid);
          setToDoc(`${currentUserRole}s`, user?.user.uid, dataToWrite);
          let dataToWrite = {
            noOfEmployeesAdded: 0,
            userDetails: {
              email: email,
              password: password,
              accountDisplayName:
                currentUserRole == "company_user" ? companyCeoName : fullName,
              companyUser: false,
              companyFullName:
                currentUserRole == "company_user" ? fullName : "",
              companyCeoName:
                currentUserRole == "company_user" ? companyCeoName : "",
              companyCeoName: "",
              accountPhotoURL: "",
              userRole: currentUserRole,
              emailVerified: user?.user.emailVerified,
              memberSince: firebase.firestore.FieldValue.serverTimestamp(),
            },
            uniqueDepartmentsList: tempDepartments,
          };

          setToDoc("all_users", user?.user.uid, dataToWrite2);

          let dataToWrite2 = {
            email: email,
            password: password,
            accountDisplayName:
              currentUserRole == "company_user" ? companyCeoName : fullName,
            accountPhotoURL: "",
            companyUser: false,
            companyFullName: currentUserRole == "company_user" ? fullName : "",
            companyCeoName:
              currentUserRole == "company_user" ? companyCeoName : "",
            companyCeoName: "",
            userRole: currentUserRole,
            emailVerified: user?.user.emailVerified,
            memberSince: firebase.firestore.FieldValue.serverTimestamp(),
          };
          history.replace("/");
        })
        .catch((error) => alert(error.message));
    } else {
      alert(
        "Caught error while creating a user, please check details and try again"
      );
    }
  };

  const individualTab = document.getElementById("individualTab");
  const companyTab = document.getElementById("companyTab");

  const individualTabFunc = () => {
    individualTab.classList.add("activeTab");
    companyTab.classList.remove("activeTab");
    dispatch(SET_USER_ROLE("individual_user"));
  };

  const campanyTabFunc = () => {
    companyTab.classList.add("activeTab");
    individualTab.classList.remove("activeTab");
    dispatch(SET_USER_ROLE("company_user"));
  };

  return (
    <div className="signup absc-center">
      <Card>
        <form
          onSubmit={signupHandler}
          className="signup__from absc-center mar-0-auto"
        >
          <h3 className="signup__tagline t-center">Signup for VAA</h3>
          <div className="signup__userRole">
            <h3 className="t-center">Are you?</h3>
            <div className="userRole__btns">
              <span id="individualTab" onClick={individualTabFunc}>
                An Individual
              </span>
              <span id="companyTab" onClick={campanyTabFunc}>
                A Comapany
              </span>
            </div>
          </div>
          {currentUserRole == "googleAccount_user" ? (
            <></>
          ) : (
            <>
              <div className="signup__inputs">
                <Input
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  type="text"
                  label={
                    currentUserRole === "individual_user"
                      ? "Full name"
                      : "Company name"
                  }
                  error={fullNameErr}
                  helperText={fullNameErr ? "This field is required" : ""}
                />
                {currentUserRole === "company_user" && (
                  <Input
                    onChange={(e) => setCompanyCeoName(e.target.value)}
                    value={companyCeoName}
                    type="text"
                    label="Company CEO Name"
                    error={companyCeoNameErr}
                    helperText={
                      companyCeoNameErr ? "This field is required" : ""
                    }
                  />
                )}

                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  label="Valid Email Address"
                  error={emailErr}
                  helperText={emailErr ? "Enter valid Email Address" : ""}
                />
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  label="Strong Password"
                  error={passwordErr}
                  helperText={passwordErr ? "This field is required" : ""}
                />
                <Input
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  value={passwordConfirm}
                  type="password"
                  label="Password Confirmation"
                  error={passwordConfirmErr}
                  helperText={passwordConfirmErr ? "Passwords dont match!" : ""}
                />
              </div>

              <Button
                color="primary"
                variant="contained"
                type="submit"
                className="signup__btn"
              >
                Continue
              </Button>
            </>
          )}

          <div className="signup__providers">
            <h3 className="t-center">OR</h3>
            <div className="signup__providersBtns absc-center">
              <Button
                onClick={signUpWithGoogle}
                color="primary"
                variant="outlined"
              >
                <img className="googleIcon" src={Google} alt="" />
                Continue with Google
              </Button>
            </div>
          </div>
        </form>
      </Card>
      <h3 className="authExcahnge__link">
        Signin instead? <Link to="./signin">Here</Link>
      </h3>
    </div>
  );
};

export default Signup;
