import React from "react";
import classes from "./Management.module.css";
import Slider1 from "../../Assets/Images/slider1.jpg";
import Slider2 from "../../Assets/Images/slider2.jpg";
import Slider3 from "../../Assets/Images/slider3.jpg";
import Slider4 from "../../Assets/Images/slider4.jpg";
import Slider5 from "../../Assets/Images/slider5.jpg";

function Dashboard() {
  return (
    <>
      <div className={classes.DubpilcateDashboard}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className={classes.slider}>
            <span style={{ "--i": 1 }}>
              <img src={Slider1} />
            </span>
            <span style={{ "--i": 2 }}>
              <img src={Slider2} />
            </span>
            <span style={{ "--i": 3 }}>
              <img src={Slider3} />
            </span>
            <span style={{ "--i": 4 }}>
              <img src={Slider4} />
            </span>
            <span style={{ "--i": 5 }}>
              <img src={Slider5} />
            </span>
          </div>
          <div>
            <p className={classes.title}>Click to add</p>
            <p style={{ fontSize: "var(--textXs)", textAlign: "center" }}>
              " Quality means doing it right when
              <br />
              no one is looking. " - Henry Ford
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
