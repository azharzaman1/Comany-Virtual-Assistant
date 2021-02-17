import React, { useState, useEffect } from "react";
import { Button, Paper } from "@material-ui/core";
import "./GoogleAuthPhaseTwo.css";
import { Input, UploadAvatar } from "../Components/files/FormComponents";
import { Link, useHistory } from "react-router-dom";
import { getFromDoc, setToDoc } from "../Components/files/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  setCurrentUserDBDetails,
  setUserCollection,
} from "../redux/slices/userSlice";
import firebase from "firebase";
import { db, storage } from "../Files/firebase";
import { v4 as uuid } from "uuid";
import "./SignupPhase2.css";
import { setToLocalStorage } from "../Components/files/LocalStorage";

const SignupPhaseTwo = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [fullNameErr, setFullNameErr] = useState(false);
  const [companyCeoName, setCompanyCeoName] = useState("");
  const [companyCeoNameErr, setCompanyCeoNameErr] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(undefined);
  const [avatarPreview, setAvatarPreview] = useState(undefined);
  const [defaultDepartments, setDefaultDepartments] = useState();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const history = useHistory();
  useEffect(() => {
    if (!avatar) {
      setAvatarPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(avatar);
    setAvatarPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [avatar]);

  useEffect(() => {
    getFromDoc("supporting_files", "departments", true, setDefaultDepartments);
  }, []);

  const uploadAvatarToDB = async () => {
    const fileID = uuid();
    const metadata = { contentType: avatar?.type };
    setUploading(true);

    const uploadTask = storage.ref(`avatars/${fileID}`).put(avatar, metadata);

    await uploadTask.on(
      "state_changed",
      function progress(snapshot) {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log("Snaphot", snapshot);
        console.log("Bytes Transfered", snapshot.bytesTransferred);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref("avatars")
          .child(fileID)
          .getDownloadURL()
          .then((url) => {
            if (url) {
              setUploading(false);
              setAvatarUrl(url);
            }
          });
      }
    );
  };

  const proceedToDashboard = async () => {
    if (fullName === "" || role === "") {
      alert("Some mendatory fields are missing, please recheck and try again");
    } else {
      let dataToWrite = {
        noOfEmployeesAdded: 0,
        userDetails: {
          accountDisplayName:
            role == "company_user" ? companyCeoName : fullName,
          accountPhotoURL: avatarUrl ? avatarUrl : "",
          email: currentUser?.email,
          companyUser: role == "company_user" ? true : false,
          companyFullName: role == "company_user" ? fullName : "",
          companyCeoName: role == "company_user" ? companyCeoName : "",
          userRole: role,
          emailVerified: currentUser?.emailVerified,
          memberSince: firebase.firestore.FieldValue.serverTimestamp(),
          signupPhaseTwo: true,
        },
        uniqueDepartmentsList: defaultDepartments,
      };

      await setToDoc(`${role}s`, currentUser?.uid, dataToWrite);

      let dataToWrite2 = {
        accountDisplayName: role == "company_user" ? companyCeoName : fullName,
        accountPhotoURL: avatarUrl ? avatarUrl : "",
        companyUser: role == "company_user" ? true : false,
        companyFullName: role == "company_user" ? fullName : "",
        companyCeoName: role == "company_user" ? companyCeoName : "",
        email: currentUser?.email,

        userRole: role,
        emailVerified: currentUser?.emailVerified,
        memberSince: firebase.firestore.FieldValue.serverTimestamp(),
        signupPhaseTwo: true,
      };

      await setToDoc("all_users", currentUser?.uid, dataToWrite2);

      await db
        .collection(`${role}s`)
        .doc(currentUser?.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            dispatch(setCurrentUserDBDetails(doc.data()));
          }
        });

      history.replace("/");
    }
  };

  const individualTab = document.getElementById("individualTab__googleAuth");
  const companyTab = document.getElementById("companyTab__googleAuth");

  const individualTabFunc = () => {
    if (individualTab) {
      individualTab.classList.add("activeTab");
      companyTab.classList.remove("activeTab");
      setRole("individual_user");
      setToLocalStorage("userRole", "individual_user");
      dispatch(setUserCollection("individual_users"));
    }
  };

  const campanyTabFunc = () => {
    if (companyTab) {
      companyTab.classList.add("activeTab");
      individualTab.classList.remove("activeTab");
      setRole("company_user");
      setToLocalStorage("userRole", "company_user");
      dispatch(setUserCollection("company_users"));
    }
  };

  return (
    <div className="signup__phase2 absc-center">
      <Paper className="signupPhase2__content absc-center">
        <div className="signup__userRole googleAuth__userRole">
          <h3>Are you?</h3>
          <div className="userRole__btns">
            <span id="individualTab__googleAuth" onClick={individualTabFunc}>
              An Individual
            </span>
            <span id="companyTab__googleAuth" onClick={campanyTabFunc}>
              A Comapany
            </span>
          </div>
        </div>
        {role !== "" ? (
          <div className="signup__phase2Inputs absc-center">
            <UploadAvatar
              needImgPreview
              setSelectedFile={setAvatar}
              imgSrc={avatarPreview ? avatarPreview : currentUser?.photoUrl}
              needActionTwoBtn={avatarPreview && !avatarUrl ? true : false}
              actionTwo={uploadAvatarToDB}
              uploading={uploading}
              progress={progress}
            />
            <Input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              label={
                role == "individual_user" ? "Your Fullname*" : "Company name*"
              }
              error={fullNameErr}
              helperText={fullNameErr ? "This field is required" : ""}
            />
            {role == "company_user" && (
              <Input
                onChange={(e) => setCompanyCeoName(e.target.value)}
                value={companyCeoName}
                type="text"
                label="Company CEO Name*"
                error={companyCeoNameErr}
                helperText={companyCeoNameErr ? "This field is required" : ""}
              />
            )}
            <Button
              onClick={proceedToDashboard}
              variant="outlined"
              color="primary"
              className="proceedToDahsboard__btn"
            >
              Proceed to Dashboard
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Paper>
      <h3 className="authExcahnge__link">
        <Link to="/">Skip for Now</Link>
      </h3>
    </div>
  );
};

export default SignupPhaseTwo;
