import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Card, TextField } from "@material-ui/core";
import "./Signup.css";
import Google from "./google.png";
import { auth, db, googleProvider } from "../Files/firebase";
import { validateEmail } from "../Components/files/FormValidation";
import { Link, useHistory } from "react-router-dom";
import {
  selectCurrentUserRole,
  SET_USER_ROLE,
} from "../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { collectionName } from "../Components/files/utils";

const Signup = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    db.collection("supporting_files")
      .doc("departments")
      .get()
      .then((doc) => setDefaultDepartments(sortData(doc.data()?.departments)));

    const sortData = (data) => {
      const sortedData = [...data];
      return sortedData.sort((a, b) => (a.id > b.id ? 1 : -1));
    };
  }, []);

  const signUpWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((user) => {
        history.replace("/");
      })
      .catch((error) => alert(error.message));
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
          await db
            .collection(collectionName(currentUserRole))
            .doc(user?.user.uid)
            .set(
              currentUserRole == "individual__user"
                ? {
                    noOfEmployeesAdded: 0,
                    userDetails: {
                      fullName: fullName,
                      email: email,
                      password: password,
                      userRole: currentUserRole,
                    },
                    userRole: currentUserRole,
                    uniqueDepartmentsList: tempDepartments,
                  }
                : {
                    noOfEmployeesAdded: 0,
                    userDetails: {
                      comapnyFullName: fullName,
                      companyCeoName: companyCeoName,
                      email: email,
                      password: password,
                      userRole: currentUserRole,
                    },
                    userRole: currentUserRole,
                    uniqueDepartmentsList: tempDepartments,
                  },
              { merge: true }
            );

          await db
            .collection("all_users")
            .doc(user?.user.uid)
            .set(
              currentUserRole == "individual__user"
                ? {
                    comapnyFullName: fullName,
                    companyCeoName: companyCeoName,
                    uid: user?.user.uid,
                    email: user?.user.email,
                    emailDisplayName: user?.user.displayName,
                    userRole: currentUserRole,
                    usersCat: "individual_users",
                  }
                : {
                    comapnyFullName: fullName,
                    companyCeoName: companyCeoName,
                    uid: user?.user.uid,
                    email: user?.user.email,
                    emailDisplayName: user?.user.displayName,
                    userRole: currentUserRole,
                    usersCat: "company_users",
                  },
              { merge: true }
            );

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
    dispatch(SET_USER_ROLE("individual__user"));
  };

  const campanyTabFunc = () => {
    companyTab.classList.add("activeTab");
    individualTab.classList.remove("activeTab");
    dispatch(SET_USER_ROLE("company__user"));
  };

  return (
    <div className="signup">
      <Card>
        <form onSubmit={signupHandler} className="signup__from">
          <h3 className="signup__tagline">Signup for VAA</h3>
          <div className="signup__userRole">
            <h3>Are you?</h3>
            <div className="userRole__btns">
              <span
                className="activeTab"
                id="individualTab"
                onClick={individualTabFunc}
              >
                An Individual
              </span>
              <span id="companyTab" onClick={campanyTabFunc}>
                A Comapany
              </span>
            </div>
          </div>
          <div className="signup__inputs">
            <Input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              label={
                currentUserRole === "individual__user"
                  ? "Full name"
                  : "Company name"
              }
              error={fullNameErr}
              helperText={fullNameErr ? "This field is required" : ""}
            />
            {currentUserRole === "company__user" && (
              <Input
                onChange={(e) => setCompanyCeoName(e.target.value)}
                value={companyCeoName}
                type="text"
                label="Company CEO Name"
                error={companyCeoNameErr}
                helperText={companyCeoNameErr ? "This field is required" : ""}
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
          <div className="signup__providers">
            <h3>OR</h3>
            <div className="signup__providersBtns">
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

const Input = ({ label, name, value, onChange, error, helperText, type }) => {
  return (
    <TextField
      className="signup__input"
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

export default Signup;
