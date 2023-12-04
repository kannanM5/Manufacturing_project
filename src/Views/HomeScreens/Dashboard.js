import React from "react";
import classes from "./Management.module.css";

function Dashboard() {
  return (
    <>
      <div className={classes.DubpilcateDashboard}>
        <p>Click to add</p>
        <p style={{ fontSize: "var(--textXs)", textAlign: "center" }}>
          " Quality means doing it right when
          <br />
          no one is looking. " - Henry Ford
        </p>
      </div>
    </>
  );
}

export default Dashboard;
