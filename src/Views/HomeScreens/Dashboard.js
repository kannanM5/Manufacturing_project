import React from "react";
import classes from "./Management.module.css";

function Dashboard() {
  return (
    <>
      <div className={classes.DubpilcateDashboard}>
        <div style={{ position: "absolute", top: "40%", right: "17%" }}>
          <p>Click to add</p>
          <p style={{ fontSize: "var(--textXs)", textAlign: "center" }}>
            " Quality means doing it right when
            <br />
            no one is looking. " - Henry Ford
          </p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
