import React, { useState, useEffect } from "react";
import { Button, Card, TextField } from "@material-ui/core";
import "./Signup.css";
import Google from "./google.png";
import { auth, googleProvider } from "../Files/firebase";
import { validateEmail } from "../Components/files/FormValidation";
import { Link, useHistory } from "react-router-dom";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { setToDoc } from "../Components/files/utils";
import firebase from "firebase";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../Components/files/LocalStorage";
import { Input } from "../Components/files/FormComponents";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmErr, setPasswordConfirmErr] = useState(false);

  const history = useHistory();

  document.title = "Registration | CVA";

  const signUpWithGoogle = async () => {
    await auth
      .signInWithPopup(googleProvider)
      .then((user) => {
        if (user) {
          setToLocalStorage("userID", user?.user.uid);
          if (!getFromLocalStorage("googleSignup_phase2")) {
            setToLocalStorage("googleSignup_phase2", false);
          }
          if (getFromLocalStorage("googleSignup_phase2")) {
            history.replace("/");
          } else {
            history.replace("/auth/registration/google/phase-two");
          }
        }
      })
      .catch((error) => alert(error.message));
  };

  const signupHandler = async (e) => {
    e.preventDefault();

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
      validateEmail(email) &&
      password !== "" &&
      password == passwordConfirm
    ) {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          if (user) {
            setToLocalStorage("userID", user?.user.uid);
            history.replace("/auth/registration/phase-two");
          }
        })
        .catch((error) => alert(error.message));
    } else {
      alert(
        "Caught error while creating a user, please check details and try again"
      );
    }
  };

  return (
    <div className="signup absc-center">
      <Card>
        <form
          onSubmit={signupHandler}
          className="signup__from absc-center mar-0-auto"
        >
          <h3 className="signup__tagline t-center">Signup for VAA</h3>
          <div className="signup__inputs">
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
