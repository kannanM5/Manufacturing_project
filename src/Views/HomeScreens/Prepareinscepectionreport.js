import React, { useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import { FormControl, MenuItem, Select } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import classes from "./Management.module.css";
import { CustomButton, TextInputBox } from "../../Components";

const useStyles = makeStyles(() => ({
  Select: {
    "&>div": {
      background: "none !important",
      borderRadius: "8px !important",
    },
  },
}));
function PrepareInspectionReport() {
  const muiclass = useStyles();
  const [dropdownName, setDropDownName] = useState(1);
  const dropDownItem = [
    {
      id: 1,
      name: "Incoming Inspection Report",
      path: "/#/incoming_inspection_report",
    },
    {
      id: 2,
      name: "Setting Approval Report",
      path: "/#/setting_approval_report",
    },
    {
      id: 3,
      name: "Line Inspection Report",
      path: "/#/line_inspection_report",
    },
    {
      id: 4,
      name: "Final Inspection Report",
      path: "/#/final_inspection_report",
    },
  ];
  const handleClick = () => {
    const getDetails = dropDownItem.find((ele) => ele.id === dropdownName);
    if (getDetails) {
      window.open(getDetails.path, "_blank");
    }
  };

  return (
    <>
      <PageHeader BtnTrue={true} heading={"Prepare Inspection Report"} />
      <div className={classes.PrepareInspectionReport}>
        <div className="row">
          <div className="col-lg-12">
            <TextInputBox title="Part No" placeHolder="Enter Part No" />
          </div>
          <div className="col-lg-12">
            <TextInputBox title="Process" placeHolder="Enter Process" />
          </div>
        </div>
        <div className="col-lg-12 mt-3">
          <p className={classes.selectHead}>Select Report Type</p>
          <FormControl fullWidth={true}>
            <Select
              className={muiclass?.Select}
              value={dropdownName}
              onChange={(e) => {
                setDropDownName(e.target.value);
              }}
            >
              {dropDownItem.map((items, index) => {
                return (
                  <MenuItem key={index} value={items.id}>
                    {items.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-lg-3 my-4">
          <CustomButton title="Submit" onButtonPress={handleClick} />
        </div>
      </div>
    </>
  );
}

export default PrepareInspectionReport;
