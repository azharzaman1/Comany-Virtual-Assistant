import React, { useState, useEffect } from "react";
import { Button, Paper } from "@material-ui/core";
import "./GoogleAuthPhaseTwo.css";
import { Input, UploadAvatar } from "../Components/files/FormComponents";
import { Link, useHistory } from "react-router-dom";
import { getFromDoc, setToDoc, sortById } from "../Components/files/utils";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUploadedAvatar } from "../redux/slices/userSlice";
import firebase from "firebase";
import { storage } from "../Files/firebase";
import { v4 as uuid } from "uuid";
import { setToLocalStorage } from "../Components/files/LocalStorage";

const GoogleSignupPhaseTwo = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [defaultDepartments, setDefaultDepartments] = useState();
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [fullNameErr, setFullNameErr] = useState(false);
  const [companyCeoName, setCompanyCeoName] = useState("");
  const [companyCeoNameErr, setCompanyCeoNameErr] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(undefined);
  const [avatarPreview, setAvatarPreview] = useState(undefined);
  const history = useHistory();
  // gs://virtual-assistant-applic-68a5e.appspot.com/avatars/b642876a-45ee-4a1b-adae-6b98e6c63ade
  console.log(avatar);
  console.log(avatarPreview);
  console.log(avatarUrl);

  useEffect(() => {
    console.log(avatar);

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

  const proceedToDashboard = async () => {
    if (role == "" || fullName == "") {
      alert("Some mendatory fields are missing, please recheck and try again");
    } else {
      if (avatar) {
        const fileID = uuid();
        const metadata = { contentType: avatar?.type };
        await storage
          .ref(`avatars/${fileID}`)
          .put(avatar, metadata)
          .then((snapshot) => snapshot.ref.getDownloadURL())
          .then((url) => {
            console.log("urrrrrrrrrrrrrrrrrrrrl", url);
            setAvatarUrl(url);
          });
      }

      console.log("Url 222222222", avatarUrl);

      let data = {
        userDetails: {
          emailDisplayName: currentUser?.displayName,
          emailPhotoURL: currentUser?.photoUrl,
          emailVerified: currentUser?.emailVerified,
          uid: currentUser?.uid,
          email: currentUser?.email,
          companyUser: role == "company_user" ? true : false,
          companyFullName: role == "company_user" ? fullName : "",
          companyCeoName: role == "company_user" ? companyCeoName : "",
          accountDisplayName:
            role == "company_user" ? companyCeoName : fullName,
          userRole: role !== "" ? role : "",
          memberSince: firebase.firestore.FieldValue.serverTimestamp(),
          accountPhotoURL: avatarUrl ? avatarUrl : currentUser?.photoUrl,
        },
        noOfEmployeesAdded: 0,
        uniqueDepartmentsList: defaultDepartments ? defaultDepartments : [],
      };

      setToDoc(`${role}s`, currentUser?.uid, data);

      let dataAll = {
        uid: currentUser?.uid,
        email: currentUser?.email,
        emailPhotoURL: currentUser?.photoUrl,
        emailDisplayName: currentUser?.displayName,
        emailVerified: currentUser?.emailVerified,
        memberSince: firebase.firestore.FieldValue.serverTimestamp(),
        companyUser: role == "company_user" ? true : false,
        companyFullName: role == "company_user" ? fullName : "",
        companyCeoName: role == "company_user" ? companyCeoName : "",
        accountDisplayName: role == "company_user" ? companyCeoName : fullName,
        accountPhotoURL: avatarUrl ? avatarUrl : currentUser?.photoUrl,
        userRole: role,
      };

      setToDoc("all_users", currentUser?.uid, dataAll);
      setToLocalStorage("googleSignup_phase2", true);
      setToLocalStorage("userRole", role);
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
    }
  };

  const campanyTabFunc = () => {
    if (companyTab) {
      companyTab.classList.add("activeTab");
      individualTab.classList.remove("activeTab");
      setRole("company_user");
    }
  };

  return (
    <div className="googleAuth__phase2 absc-center">
      <Paper className="googleAuth__content absc-center">
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
          <div className="googleAuth__phase2Inputs absc-center">
            <UploadAvatar
              setSelectedFile={setAvatar}
              avaSrc={avatarPreview ? avatarPreview : currentUser?.photoUrl}
              needUploadToDBBtn={avatarPreview ? true : false}
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

export default GoogleSignupPhaseTwo;
