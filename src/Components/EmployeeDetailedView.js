import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import "./EmployeeDetailedView.css";
import { useSelector } from "react-redux";
import { selectEmployeeToView } from "../redux/slices/employeesSlice";

const EmployeeDetailedView = () => {
  const employeeToView = useSelector(selectEmployeeToView);

  console.log(employeeToView);
  // console.log(employeeToView);
  // console.log(new Date(employeeToView.employeeHiredDate?.toData()));

  return (
    <div className="employeeDetailed__popup">
      <div className="employeePopup__DetialsSection">
        <div className="employeePopup__column">
          <DetailEle title="Name" info={employeeToView?.employeeName} />
          <DetailEle title="Email" info={employeeToView?.employeeEmail} />
          <DetailEle title="Hire Date" info="25 Oct, 2025" />
          <DetailEle title="Contract Expiry Date" info="25 Oct, 2025" />
        </div>
        <div className="employeePopup__column">
          <DetailEle
            row2ndEntry
            title="City"
            info={employeeToView?.employeeCity}
          />
          <DetailEle
            row2ndEntry
            title="Phone No"
            info={employeeToView?.employeePhone}
          />
          <DetailEle
            row2ndEntry
            title="Job Nature"
            info={
              employeeToView?.isPermanent
                ? "Permanent Position"
                : "Contract-Based"
            }
          />
          <DetailEle
            row2ndEntry
            title="Current Pay"
            info={`$${employeeToView?.employeePayPerYear}/year`}
          />
        </div>
      </div>
      <div className="employeePopup__contolsSection">
        <Button variant="contained" color="primary">
          Edit
        </Button>
        <Button variant="contained" color="secondary">
          Delete
        </Button>
      </div>
    </div>
  );
};

const DetailEle = ({ title, info, row2ndEntry }) => {
  return (
    <div className={`detail__entry ${row2ndEntry && "rowSecEntry"}`}>
      <h3>{title}:</h3>
      <span>{info}</span>
    </div>
  );
};

export default EmployeeDetailedView;
