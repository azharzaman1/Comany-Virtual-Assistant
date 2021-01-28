import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
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
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Form = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [pay, setPay] = useState("");
  const [gender, setGender] = useState("male");
  const [role, setRole] = useState("Select");
  const [newRole, setNewRole] = useState("");
  const [hireDate, setHireDate] = useState(new Date());
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

  const submitForm = () => {
    console.log("Form Submitted");
  };

  const resetForm = () => {
    console.log("Trying to resset");
  };
  // const disableSubmit = () => {
  //   if(fullName === '' || email ===  || role || )
  // }

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
          />
          <TextField
            variant="outlined"
            value={email}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="form__input"
          />
          <TextField
            variant="outlined"
            value={phone}
            label="Phone #"
            onChange={(e) => setPhone(e.target.value)}
            className="form__input"
          />
          <TextField
            variant="outlined"
            value={city}
            label="City"
            onChange={(e) => setCity(e.target.value)}
            className="form__input"
          />
          <TextField
            variant="outlined"
            value={pay}
            label="Current Pay/Year (e.g. 50,000)"
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
            >
              {companyRoles &&
                companyRoles.map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.name}
                  </MenuItem>
                ))}
            </Select>
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

          {/* Data Pickers */}

          <FormControl className="form__input">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                variant="inline"
                inputVariant="outlined"
                label="Hire Date"
                name="hireDate"
                format="MM/dd/yyyy"
                disableToolbar
                value={hireDate}
                onChange={(date) => setHireDate(date)}
              />
            </MuiPickersUtilsProvider>
          </FormControl>

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
            <FormControl className="form__input">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  variant="inline"
                  inputVariant="outlined"
                  label="Contract Expiry Date"
                  name="expiryDate"
                  format="MM/dd/yyyy"
                  disableToolbar
                  value={expiryDate}
                  onChange={(date) => setExpiryDate(date)}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
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
              onClick={resetForm}
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
