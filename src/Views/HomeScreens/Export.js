import React, { useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import { CustomButton, CustomDropDown, TextInputBox } from "../../Components";
import classes from "./Management.module.css";
import { FormControl, MenuItem, Select } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomDatePicker from "../../Components/CustomDatePicker";
import moment from "moment";

const validationSchema = Yup.object({
  reportType: Yup.string()
    .required("User type is required")
    .test("one of", "User type is required", function (value) {
      const { reportType } = this.parent;
      if (value === "-- None --") {
        return false;
      }
      return true;
    }),
});
function Export() {
  const [dropdownName, setDropDownName] = useState(1);
  const [dropdownItem, setdropdownItem] = useState([
    {
      id: 1,
      name: "Incoming Inspection Report",
    },
    {
      id: 2,
      name: "Setting Approval Report",
    },
    {
      id: 3,
      name: "Line Inspection Report",
    },
    {
      id: 4,
      name: "Final Inspection Report",
    },
  ]);
  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    errors,
    touched,
    setFieldError,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      reportType: "",
      date: "",
      part_no: "",
      process: "",
      customer: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // handleSignup(values);
    },
  });
  return (
    <div>
      <PageHeader heading={"Export"} BtnTrue={true} />
      <div className={classes.Export}>
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3 ">
            <CustomDropDown
              editName={values?.reportType}
              title="Report Type"
              items={dropdownItem}
              anotherFieldName={"id"}
              fieldName={"name"}
              requiredText={"*"}
              onSelectedItem={(val, value) => {
                setFieldValue("reportType", value?.label);
                // setFieldValue("type", value?.id);
              }}
              errorText={
                errors?.reportType && touched?.reportType
                  ? errors?.reportType
                  : ""
              }
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3 ">
            <CustomDatePicker
              title="Date"
              required="*"
              selectedDate={values?.date}
              onSelectDate={(val) => {
                setFieldValue("date", moment(val).format("YYYY-MM-DD"));
              }}
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3 ">
            <TextInputBox
              title="Part no"
              placeHolder="Enter part no"
              value={values.part_no}
              onChangeText={handleChange("part_no")}
              name="part_no"
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt("part_no", values.part_no);
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
              requiredText="*"
              errorText={
                touched.part_no && errors.part_no ? errors.part_no : ""
              }
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3 "></div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3 ">
            <TextInputBox
              title="Process"
              placeHolder="Enter process"
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
              requiredText="*"
              errorText={
                touched.process && errors.process ? errors.process : ""
              }
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3 ">
            <TextInputBox
              title="Customer"
              placeHolder="Enter customer"
              value={values.customer}
              onChangeText={handleChange("customer")}
              name="customer"
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt(
                      "customer",
                      values.customer
                    );
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("customer", true);
                      setFieldError("customer", error.message);
                    }
                  }
                },
                maxLength: 50,
              }}
              type={"text"}
              requiredText="*"
              errorText={
                touched.customer && errors.customer ? errors.customer : ""
              }
            />{" "}
          </div>

          <div className="col-lg-1 mt-4">
            <CustomButton title="Search" />
          </div>

          <div className="col-lg-1 mt-4">
            <CustomButton title="Download" />
          </div>
        </div>
        <div className={`table-responsive ${classes.Dashboard}`}>
          <table>
            <thead className={classes.listOfTable}>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Part No</th>
                <th>Process</th>
                <th>Inspction Report Type</th>
                <th>Customer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Export;
