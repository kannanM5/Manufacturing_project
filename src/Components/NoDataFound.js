import React from "react";
import NodataImgage from "../Assets/Images/noData.png";

const NoDataFound = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <img src={NodataImgage} style={{ width: "50px", height: "50px" }} />
      <p>No data found</p>
    </div>
  );
};

export default NoDataFound;
