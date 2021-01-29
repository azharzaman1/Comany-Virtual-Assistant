import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import "./Form.css";
import { companyRoles } from "./files/comapnyRoles";
import { validateEmail, resetForm } from "./files/FormValidation";
import { getFromLocalStorage, setToLocalStorage } from "./files/LocalStorage";
import DatePicker from "./DatePicker";
import { useSelector } from "react-redux";
import { selectEmployeesList } from "../redux/slices/employeesSlice";

const Form = () => {
  const employeesList = useSelector(selectEmployeesList);
  const [fullName, setFullName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(false);
  const [pay, setPay] = useState("");
  const [gender, setGender] = useState("male");
  const [role, setRole] = useState("Select");
  const [roleError, setRoleError] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [hireDate, setHireDate] = useState(new Date());
  const [hireDateError, setHireDateError] = useState(false);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [checkboxState, setCheckboxState] = useState(false);
  const [companyRolesList, setCompanyRolesList] = useState(companyRoles);

  const addNewRoleToList = () => {
    console.log("Want to add, but no experinece", {
      value: newRole.trim().toLowerCase(),
      name: newRole,
    });

    setCompanyRolesList(
      companyRolesList.splice(companyRolesList.length - 1, 0, {
        value: newRole.toLowerCase(),
        name: newRole,
      })
    );

    setRole(newRole.toLowerCase());

    console.log([]);
  };

  const submitForm = async () => {
    if (fullName === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (validateEmail(email)) {
      // if email valid => return true
      setEmailError(false);
    } else {
      setEmailError(true);
    }

    if (phone.length >= 10) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }

    if (city === "") {
      setCityError(true);
    } else {
      setCityError(false);
    }

    if (role === "Select") {
      setRoleError(true);
    } else {
      setRoleError(false);
    }

    if (hireDate === new Date()) {
      setHireDateError(true);
    } else {
      setHireDateError(false);
    }

    if (
      fullName === "" &&
      !validateEmail(email) &&
      phone.length < 10 &&
      city === "" &&
      role === "Select" &&
      role
    ) {
      alert("You Employee could not be added, please check details again!");
    } else {
      await setEmployee();
      resetFormHandler();
    }
  };

  const setEmployee = () => {
    console.log("Wokring");
    const employeesList = getFromLocalStorage("employeesList");

    const newEmploye = {
      employeeID: new Date(),
      employeeName: fullName,
      employeeEmail: email,
      employeePhone: phone,
      employeeCity: city,
      employeePayPerYear: pay,
      employeeGender: gender,
      employeeDepartment: role,
      employeeHiredDate: hireDate,
      isPermanent: checkboxState,
      employeeContractExpiry: expiryDate,
    };

    employeesList.push(newEmploye);

    console.log(employeesList);

    setToLocalStorage("employeesList", employeesList);
  };

  const resetFormHandler = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setCity("");
    setPay("");
    setGender("male");
    setRole("Select");
    setHireDate(new Date());
    setCheckboxState(false);
    setExpiryDate(new Date());
  };

  return (
    <form className="form">
      <Grid container>
        {/* Column 1 */}
        <Grid className="form__inputsRow" item xs={12} sm={6}>
          <TextField
            variant="outlined"
            value={fullName}
            label="Full name"
            onChange={(e) => setFullName(e.target.value)}
            className="form__input"
            error={nameError}
            helperText={nameError ? "This feild is required" : ""}
          />
          <TextField
            variant="outlined"
            value={email}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="form__input"
            error={emailError}
            helperText={emailError ? "Please enter valid email address" : ""}
          />
          <TextField
            variant="outlined"
            value={phone}
            label="Phone # (XXXXXXXXXX)"
            onChange={(e) => setPhone(e.target.value)}
            className="form__input"
            error={phoneError}
            helperText={
              phoneError ? "Phone no should be atleast 10 digits long!" : ""
            }
          />
          <TextField
            variant="outlined"
            value={city}
            label="City"
            onChange={(e) => setCity(e.target.value)}
            className="form__input"
            error={cityError}
            helperText={cityError ? "This field is required" : ""}
          />
          <TextField
            variant="outlined"
            value={pay}
            label="Current Pay/Year (e.g. 50,000) (optional)"
            onChange={(e) => setPay(e.target.value)}
            className="form__input"
          />
        </Grid>
        {/* Column 2 */}
        <Grid xs={12} sm={6} className="form__inputsRow" item>
          <FormControl className="form__input">
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              row
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              color="primary"
            >
              <FormControlLabel label="Male" value="male" control={<Radio />} />
              <FormControlLabel
                label="Female"
                value="female"
                control={<Radio />}
              />
              <FormControlLabel
                label="Other"
                value="other"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
          <FormControl variant="outlined" className="form__input">
            <InputLabel>Department</InputLabel>
            <Select
              label="Department"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              error={roleError}
              className="dropdown__department"
            >
              {companyRoles &&
                companyRoles.map((role) => (
                  <MenuItem
                    className="dropdown__item"
                    key={role.value}
                    value={role.value}
                  >
                    {role.name}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText style={{ color: "rgb(241, 41, 41)" }}>
              {roleError
                ? "Please select department | or add new by selecting other."
                : ""}
            </FormHelperText>
          </FormControl>

          {/* Conditional Role */}

          {role === "other" && (
            <>
              <TextField
                variant="outlined"
                value={newRole}
                label="Enter Department"
                onChange={(e) => setNewRole(e.target.value)}
                className="form__input"
              />
              <Button disabled={newRole === ""} onClick={addNewRoleToList}>
                Add
              </Button>
            </>
          )}

          <DatePicker
            value={hireDate}
            name="hireDate"
            onChange={(date) => setHireDate(date)}
            label="Hire Date"
          />

          <FormControl className="form__input">
            <FormControlLabel
              label="Currently Permanent Employee"
              control={
                <Checkbox
                  checked={checkboxState}
                  onChange={() => setCheckboxState(!checkboxState)}
                />
              }
            />
          </FormControl>

          {!checkboxState && (
            <DatePicker
              value={expiryDate}
              onChange={(date) => setExpiryDate(date)}
              label="Contract Expiry Date"
            />
          )}

          <div className="form__input">
            <Button
              className="submit__btn"
              variant="contained"
              color="primary"
              onClick={submitForm}
            >
              Submit
            </Button>
            <Button
              className="submit__btn reset__btn"
              variant="contained"
              onClick={resetFormHandler}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
