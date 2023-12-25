import React from "react";
import classes from "./Management.module.css";
import Slider1 from "../../Assets/Images/nuts1.jpg";
import Slider2 from "../../Assets/Images/nuts2.jpg";
import Slider3 from "../../Assets/Images/nuts3.jpg";
import Slider4 from "../../Assets/Images/nuts4.jpg";
import Slider5 from "../../Assets/Images/nuts5.jpg";

function Dashboard() {
  return (
    <div className={classes.DubpilcateDashboard}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div className={classes.slider}>
          <span style={{ "--i": 1 }}>
            <img src={Slider1} alt="product" />
          </span>
          <span style={{ "--i": 2 }}>
            <img src={Slider2} alt="product" />
          </span>
          <span style={{ "--i": 3 }}>
            <img src={Slider3} alt="product" />
          </span>
          <span style={{ "--i": 4 }}>
            <img src={Slider4} alt="product" />
          </span>
          <span style={{ "--i": 5 }}>
            <img src={Slider5} alt="product" />
          </span>
        </div>

        <div className={classes.DashboardContent}>
          <p className={classes.title}>Click to add</p>
          <p style={{ fontSize: "var(--textXs)", textAlign: "center" }}>
            " Quality means doing it right when
            <br />
            no one is looking. " - Henry Ford
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
