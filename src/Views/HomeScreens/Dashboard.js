import React from "react";
import classes from "./Management.module.css";
import Bolt from "../../Assets/Images/Png/bolts1.jpg";
// import { NAMES, NUMBER } from "../../Utility/Constants";
function Dashboard() {
  // const getValue = (data) => {
  //   if (NAMES.test(data)) {
  //     return "black";
  //   } else if (NUMBER.test(data)) {
  //     return "black";
  //   } else if (data.includes("±")) {
  //   }
  // };
  return (
    <div>
      <div className={classes.DubpilcateDashboard}>
        <img
          src={Bolt}
          style={{ objectFit: "contain", marginTop: "70px" }}
        ></img>
        <p>Click to add</p>
      </div>
      <div></div>
    </div>
  );
}

export default Dashboard;
