import React, { useEffect, useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import { FormControl, MenuItem, Select } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Management.module.css";
import { CustomButton, TextInputBox } from "../../Components";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useEmployeeId, useToken } from "../../Utility/StoreData";
import { ALPHA_NUM } from "../../Utility/Constants";
const validationSchema = Yup.object({
  part_no: Yup.string()
    .required("Part number is required")
    .matches(ALPHA_NUM, "Enter valid part number"),
  process: Yup.string()
    .matches(ALPHA_NUM, "Enter valid Process")
    .required("Process is required"),
});
const useStyles = makeStyles(() => ({
  Select: {
    "&>div": {
      background: "none !important",
      borderRadius: "8px !important",
    },
  },
}));

var CryptoJS = require("crypto-js");

function PrepareInspectionReport() {
  const token = useToken();
  const userId = useEmployeeId();

  const navigate = useNavigate();
  const muiclass = useStyles();
  const [dropdownName, setDropDownName] = useState(1);
  const [first, setfirst] = useState("kannan");
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    resetForm,
    setFieldError,
    setFieldTouched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      part_no: "",
      process: "",
      pageStatus: dropdownName,
      buttonStatus: "",
      token: token,
      user_id: userId,
    },
    validationSchema: validationSchema,
  });
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
  const handleClick = (data) => {
    if (data) {
      setFieldValue("buttonStatus", data);
    }
    const getDetails = dropDownItem.find((ele) => ele.id === dropdownName);
    if (getDetails) {
      const encryptedData = sendData();
      const newTab = window.open(getDetails.path, "_blank");
      if (newTab) {
        newTab.location.href = `${getDetails.path}?data=${encodeURIComponent(
          encryptedData
        )}`;
      }
    }
  };

  const sendData = () => {
    var encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(values),
      "data"
    ).toString();

    return encrypted;
  };
  useEffect(() => {
    resetForm();
  }, []);
  return (
    <>
      <PageHeader BtnTrue={true} heading={"Prepare Inspection Report"} />
      <div className={classes.PrepareInspectionReport}>
        <div className="row">
          <div className="col-lg-12">
            <TextInputBox
              title="Part Number"
              value={values.part_no}
              onChangeText={handleChange("part_no")}
              name="part_no"
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt("part_no", values.name);
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("part_no", true);
                      setFieldError("part_no", error.message);
                    }
                  }
                },
                maxLength: 50,
              }}
              type={"text"}
              placeHolder="Enter Part number"
              requiredText="*"
              errorText={
                touched.part_no && errors.part_no ? errors.part_no : ""
              }
            />
          </div>
          <div className="col-lg-12">
            <TextInputBox
              title="Process"
              value={values.process}
              onChangeText={handleChange("process")}
              name="process"
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt("process", values.process);
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("process", true);
                      setFieldError("process", error.message);
                    }
                  }
                },
                maxLength: 50,
              }}
              type={"text"}
              placeHolder="Enter process"
              requiredText="*"
              errorText={
                touched.process && errors.process ? errors.process : ""
              }
            />
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
        <div className="row">
          <div className="col-lg-3 my-4">
            <CustomButton
              title="Submit"
              onButtonPress={() => {
                handleClick("Add");
              }}
            />
          </div>
          <div className="col-lg-3 my-4">
            <CustomButton
              title="Edit"
              onButtonPress={() => {
                handleClick("Edit");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PrepareInspectionReport;
