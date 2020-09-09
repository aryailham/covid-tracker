import React from "react";
import Card from "../UI/Card";

import classes from "./WorldSummary.module.css";

const worldSummary = (props) => {
  if (!props.data.confirmed) {
    return "...loading";
  }

  return (
    <div className={classes.WorldSummary}>
      <Card
        title={"Confirmed"}
        value={props.data.confirmed.value}
        lastUpdate={props.data.lastUpdate}
      />
      <Card
        title={"Recovered"}
        value={props.data.recovered.value}
        lastUpdate={props.data.lastUpdate}
      />
      <Card
        title={"Deaths"}
        value={props.data.deaths.value}
        lastUpdate={props.data.lastUpdate}
      />
    </div>
  );
};

export default worldSummary;
