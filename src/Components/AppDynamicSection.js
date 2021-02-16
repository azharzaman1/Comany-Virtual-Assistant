import React from "react";
import Form from "./Form";
import SectionHeader from "./SectionHeader";
import { PeopleOutlineTwoTone } from "@material-ui/icons";
import { Paper } from "@material-ui/core";
import "./AppDynamicSection.css";
import Table from "./Table";
import Popup from "./Popup";
import { useSelector } from "react-redux";
import EmployeeDetailedView from "./EmployeeDetailedView";
import {
  selectAddEmployeePopupState,
  selectEmployeeDetailedViewState,
} from "../redux/slices/generalSlice";

const PageChangeAbleContentSection = () => {
  const addEmployeePopupState = useSelector(selectAddEmployeePopupState);
  const employeeDetailedViewState = useSelector(
    selectEmployeeDetailedViewState
  );

  return (
    <>
      <SectionHeader
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
