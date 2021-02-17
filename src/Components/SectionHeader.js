import React from "react";
import { Card, Grid, Paper } from "@material-ui/core";
import "./SectionHeader.css";

const SectionHeader = ({ title, subTitle, icon }) => {
  return (
    <Paper className="page__header" elevation={0} square>
      <Grid container className="page__headerContent">
        <Grid className="pageHeader__iconSide" item>
          <Card className="iconBox">{icon}</Card>
        </Grid>
        <Grid className="pageHeader__contentSide" item>
          <h3>{title}</h3>
          <h4>{subTitle}</h4>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SectionHeader;
