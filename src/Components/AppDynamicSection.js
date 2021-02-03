import React, { useState, useEffect } from "react";
import Form from "./Form";
import PageHeader from "./PageHeader";
import { PeopleOutlineTwoTone } from "@material-ui/icons";
import { Paper } from "@material-ui/core";
import "./AppDynamicSection.css";
import Table from "./Table";
import Popup from "./Popup";
import { useSelector, useDispatch } from "react-redux";
import {
  selectEmployeeEditMode,
  selectEmployeeToEdit,
  SET_EMPLOYEE_EDIT_MODE,
} from "../redux/slices/employeesSlice";
import EmployeeDetailedView from "./EmployeeDetailedView";

const PageChangeAbleContentSection = () => {
  const dispatch = useDispatch();
  const employeeEditMode = useSelector(selectEmployeeEditMode);
  const employeeToEdit = useSelector(selectEmployeeToEdit);
  const [openPopup, setOpenPopup] = useState(false);
  const [employeePopupState, setEmployeePopupState] = useState(false);

  const closePopup = () => {
    setOpenPopup(false);
    if (employeeEditMode) {
      dispatch(SET_EMPLOYEE_EDIT_MODE(false));
    }
  };

  const closeEmployeePopupState = () => {
    setEmployeePopupState(false);
  };

  return (
    <>
      <PageHeader
        title="All Employees"
        subTitle="List of your Employees"
        icon={<PeopleOutlineTwoTone color="primary" fontSize="large" />}
      />
      <Paper className="formWrapper">
        <Popup open={openPopup} close={closePopup}>
          <Form setPopupClose={closePopup} />
        </Popup>
        <Table
          setOpenEmployeePopup={setEmployeePopupState}
          setOpenPopup={setOpenPopup}
        />
        <Popup open={employeePopupState} close={closeEmployeePopupState}>
          <EmployeeDetailedView />
        </Popup>
      </Paper>
    </>
  );
};

export default PageChangeAbleContentSection;
