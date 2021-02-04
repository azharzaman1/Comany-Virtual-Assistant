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
import {
  selectAddEmployeePopupState,
  selectEmployeeDetailedViewState,
} from "../redux/slices/generalSlice";

const PageChangeAbleContentSection = () => {
  const dispatch = useDispatch();
  const employeeEditMode = useSelector(selectEmployeeEditMode);
  const addEmployeePopupState = useSelector(selectAddEmployeePopupState);
  const employeeDetailedViewState = useSelector(
    selectEmployeeDetailedViewState
  );

  return (
    <>
      <PageHeader
        title="All Employees"
        subTitle="List of your Employees"
        icon={<PeopleOutlineTwoTone color="primary" fontSize="large" />}
      />
      <Paper className="formWrapper">
        <Popup open={addEmployeePopupState} popupTitle="Add Employee">
          <Form />
        </Popup>
        <Table />
        <Popup open={employeeDetailedViewState} popupTitle="Employee Details">
          <EmployeeDetailedView />
        </Popup>
      </Paper>
    </>
  );
};

export default PageChangeAbleContentSection;
