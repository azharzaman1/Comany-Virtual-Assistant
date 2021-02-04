import React, { useState } from "react";
import { Button, Card, TextField } from "@material-ui/core";
import "./Signin.css";
import Google from "./google.png";
import { auth, googleProvider } from "../Files/firebase";
import { validateEmail } from "../Components/files/FormValidation";
import { Link, useHistory } from "react-router-dom";

const Signin = () => {
  const [userRole, setUserRole] = useState("individual__user");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);

  const history = useHistory();

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((user) => {
        history.replace("/");
      })
      .catch((error) => alert(error.message));
  };

  const signinHandler = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailErr(true);
    }
    if (password === "") {
      setPasswordErr(true);
    }

    if (validateEmail(email) && password !== "") {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          history.replace("/");
        })
        .catch((error) => alert(error.message));
    } else {
      alert(
        "Caught error while creating a user, please check details and try again"
      );
    }
  };

  return (
    <div className="signin">
      <Card>
        <form onSubmit={signinHandler} className="signin__from">
          <h3 className="signin__tagline">Signin to VAA</h3>
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
              helperText={passwordErr ? "Password cannot be empty" : ""}
            />
          </div>

          <Button
            color="primary"
            variant="contained"
            type="submit"
            className="signup__btn"
          >
            Signin
          </Button>
          <div className="signup__providers">
            <h3>OR</h3>
            <div className="signup__providersBtns">
              <Button
                onClick={signInWithGoogle}
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
        Need Account? <Link to="./registration">Here</Link>
      </h3>
    </div>
  );
};

const Input = ({ label, name, value, onChange, error, helperText, type }) => {
  return (
    <TextField
      className="signup__input signin__input"
      label={label}
      variant="outlined"
      name={name}
      value={value}
      onChange={onChange}
      color="primary"
      error={error}
      helperText={helperText}
      type={type}
    />
  );
};

export default Signin;