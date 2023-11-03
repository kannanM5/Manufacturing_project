import React, { useState } from "react";
import classes from "./Modal.module.css";
import close from "../Assets/Icons/Svg/close.svg";
import { TextIncreaseSharp } from "@mui/icons-material";
import { CustomButton, TextInputBox } from "../Components";
import { FormControl, MenuItem, Select } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  Select: {
    "&>div": {
      background: "none !important",
      borderRadius: "8px !important",
    },
  },
}));
function GetPrepareReport({ onClose, heading, modalClose }) {
  const navigate = useNavigate();
  const muiclass = useStyles();
  const [dropdownName, setDropDownName] = useState(1);
  const dropDownItem = [
    {
      id: 1,
      name: "Incoming Inspection Report",
      path: "/Prepareinscepectionreport/incoming_inspection_report",
    },
    {
      id: 2,
      name: "Setting Approval Report",
      path: "/Prepareinscepectionreport/setting_approval_report",
    },
    {
      id: 3,
      name: "Line Inspection Report",
      path: "/Prepareinscepectionreport/line_inspection_report",
    },
    {
      id: 4,
      name: "Final Inspection Report",
      path: "/Prepareinscepectionreport/final_inspection_report",
    },
  ];
  const handleCLick = () => {
    const getDetails = dropDownItem.find((ele) => ele?.id === dropdownName);
    navigate(getDetails?.path);
    modalClose();
  };
  return (
    <div>
      <div className={classes.popup}>
        <div className={classes.popup_head}>
          <div className={classes.popup_head_left}>
            <div className={classes.line}></div>
            <div>
              <p className={classes.Heading}>{heading}</p>
            </div>
          </div>
        </div>
        <img
          className={classes.close}
          src={close}
          alt="close"
          onClick={onClose}
        />
      </div>
      <div className={classes.getReport}>
        <div className="row">
          <div className="col-6">
            <TextInputBox title="Part No" placeHolder="Enter Part No" />
          </div>
          <div className="col-6">
            <TextInputBox title="Process" placeHolder="Enter Process" />
          </div>
        </div>
        <div className="col-6 mt-3">
          <p className={classes.selectHead}>Select Report Type</p>
          <FormControl>
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
        <div className="col-lg-2 my-4">
          <CustomButton title="Submit" onButtonPress={handleCLick} />
        </div>
      </div>
    </div>
  );
}

export default GetPrepareReport;
