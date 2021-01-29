import React, { useState, useEffect } from "react";
import Form from "./Form";
import PageHeader from "./PageHeader";
import { PeopleOutlineTwoTone } from "@material-ui/icons";
import { Paper } from "@material-ui/core";
import "./AppDynamicSection.css";
import Table from "./Table";

const PageChangeAbleContentSection = () => {
  return (
    <>
      <PageHeader
        title="All Employees"
        subTitle="List of all Employees in Database (Firestore)"
        icon={<PeopleOutlineTwoTone color="primary" fontSize="large" />}
      />
      <Paper className="formWrapper">
        {/* <Form /> */}
        <Table />
      </Paper>
    </>
  );
};

export default PageChangeAbleContentSection;
