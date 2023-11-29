import React, { useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import { CustomButton, TextInputBox } from "../../Components";
import classes from "./Management.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import Commondate from "../../Components/Commondate";
import dayjs from "dayjs";
import CustomDropDown from "../../Components/CustomDropDown";

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
  // const [dropdownName, setDropDownName] = useState(1);
  const dropdownItem = [
    {
      key: 1,
      label: "Incoming Inspection Report",
    },
    {
      id: 2,
      label: "Setting Approval Report",
    },
    {
      key: 3,
      label: "Line Inspection Report",
    },
    {
      key: 4,
      label: "Final Inspection Report",
    },
  ];
  const {
    // handleSubmit,
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
      date: new Date(),
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
        <div className={classes.serachOptionConatiner}>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3 ">
              <CustomDropDown
                placeholderText={"report type"}
                requiredText="*"
                items={[...dropdownItem]}
                value={
                  [...dropdownItem].find(
                    (ele) => ele.key === parseInt(values.reportType)
                  )?.label
                }
                title="Select Report Type"
                onSelect={(val) => {
                  setFieldValue("reportType", val);
                }}
                errorText={
                  errors?.reportType && touched?.reportType
                    ? errors?.reportType
                    : ""
                }
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3 ">
              <Commondate
                title="Date"
                // placeholder="Select date"
                onChange={(value) => {
                  setFieldValue("date", value);
                }}
                value={dayjs(values?.date).format("YYYY-MM-DD")}
                // errorText={
                //   errors?.to_date && touched?.to_date ? errors?.to_date : ""
                // }
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
                      validationSchema.validateSyncAt(
                        "part_no",
                        values.part_no
                      );
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
                      validationSchema.validateSyncAt(
                        "process",
                        values.process
                      );
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
              />
            </div>

            <div className="col-lg-1 mt-4">
              <CustomButton title="Search" />
            </div>
            <div className="col-lg-1 mt-4">
              <CustomButton title="Reset" />
            </div>
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
