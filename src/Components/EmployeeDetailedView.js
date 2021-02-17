import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import "./EmployeeDetailedView.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectEmployeeToView,
  setEmployeeEditMode,
  setEmployeeToEdit,
} from "../redux/slices/employeesSlice";
import {
  selectCurrentUserDBDetails,
  selectUser,
  selectUserCollec,
} from "../redux/slices/userSlice";
import {
  viewEmployeePopup,
  addNewEmployeePopup,
} from "../redux/slices/generalSlice";
import { db } from "../Files/firebase";

const EmployeeDetailedView = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const currentUserDBDetails = useSelector(selectCurrentUserDBDetails);
  const userCollection = useSelector(selectUserCollec);
  const employeeToView = useSelector(selectEmployeeToView);

  const deleteEmployeeFromDB = async (employeeBeingViewedId) => {
    if (currentUserDBDetails) {
      await db
        .collection(userCollection)
        .doc(currentUser?.uid)
        .collection("employeesList")
        .doc(employeeBeingViewedId)
        .delete()
        .catch((error) => {
          alert(error);
        });
      dispatch(viewEmployeePopup(false));
    }
  };

  const editEmployeeAndPushDB = (employeeBeingViewed) => {
    const employeeToEditId = employeeBeingViewed?.employeeToViewId;

    dispatch(
      setEmployeeToEdit({
        ...employeeBeingViewed,
        employeeToEditId: employeeToEditId,
      })
    );
    dispatch(viewEmployeePopup(false));
    dispatch(setEmployeeEditMode(true));
    dispatch(addNewEmployeePopup(true));
  };

  return (
    <div className="employeeDetailed__popup">
      <div className="employeePopup__DetialsSection">
        <div className="employeePopup__column">
          <DetailEle title="Name" info={employeeToView?.employeeName} />
          <DetailEle title="Email" info={employeeToView?.employeeEmail} />
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
            title="Hire Date"
            info={new Date(
              employeeToView?.employeeHiredDate?.toDate()
            ).toLocaleDateString()}
          />
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
            title="Current Pay"
            info={`$${employeeToView?.employeePayPerYear}/year`}
          />
          {employeeToView?.employeeContractExpiry && (
            <DetailEle
              title="Contract Expiry Date"
              info={new Date(
                employeeToView?.employeeContractExpiry?.toDate()
              ).toLocaleDateString()}
            />
          )}
        </div>
      </div>
      <div className="employeePopup__contolsSection">
        <Button
          onClick={() => {
            editEmployeeAndPushDB(employeeToView);
          }}
          variant="contained"
          color="primary"
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            deleteEmployeeFromDB(employeeToView?.employeeToViewId);
          }}
          variant="contained"
          color="secondary"
        >
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
