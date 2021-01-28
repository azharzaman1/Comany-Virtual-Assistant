import React, { useState, useEffect } from "react";
import Form from "./Form";
import PageHeader from "./PageHeader";
import { PeopleOutlineTwoTone } from "@material-ui/icons";
import { Paper } from "@material-ui/core";
import "./PageChangeAbleSection.css";

const PageChangeAbleContentSection = () => {
  const [x, setX] = useState(5);

  return (
    <>
      <PageHeader
        title="All Employees"
        subTitle="List of all Employees in Database (Firestore)"
        icon={<PeopleOutlineTwoTone color="primary" fontSize="large" />}
      />
      <Paper className="formWrapper">
        <Form />
      </Paper>
    </>
  );
};

export default PageChangeAbleContentSection;
