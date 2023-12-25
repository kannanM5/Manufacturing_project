import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import LogoutConfirmationModal from "../../Modals/LogoutConfirmationModal";
import CustomDropDown from "../../Components/CustomDropDown";
import classes from "./Management.module.css";
import { ALPHA_NUM } from "../../Utility/Constants";
import { getCatchMsg, getInvalidMsg } from "../../Utility/GeneralUtils";
import { useEmployeeId, useToken } from "../../Utility/StoreData";
import {
  getInspectionReportList,
  savedDataList,
} from "../../Services/Services";
import {
  CustomButton,
  GlobalModal,
  Loader,
  TextInputBox,
} from "../../Components";

const validationSchema = Yup.object({
  part_no: Yup.string()
    .required("Part number is required")
    .matches(ALPHA_NUM, "Enter valid part number"),
  process: Yup.string()
    .matches(ALPHA_NUM, "Enter valid Process")
    .required("Process is required"),
});

var CryptoJS = require("crypto-js");

function PrepareInspectionReport() {
  const token = useToken();
  const userId = useEmployeeId();
  const [isShowModal, setIsShowModal] = useState(false);
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  const [buttonStatus, setbuttonStatus] = useState(null);
  const [dropdownName, setDropDownName] = useState(1);
  const {
    handleChange,
    values,
    errors,
    touched,
    resetForm,
    setFieldError,
    setFieldTouched,
    handleSubmit,
  } = useFormik({
    initialValues: {
      part_no: "",
      process: "",
      token: token,
      user_id: userId,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      if (buttonStatus === "Add") {
        handleGetProductsList();
      } else {
        handleEditReport();
      }
    },
  });

  const dropDownItem = [
    {
      key: 1,
      label: "Incoming Inspection Report",
      path: "/#/incoming_inspection_report",
    },
    {
      key: 2,
      label: "Setting Approval Report",
      path: "/#/setting_approval_report",
    },
    {
      key: 3,
      label: "Line Inspection Report",
      path: "/#/line_inspection_report",
    },
    {
      key: 4,
      label: "Final Inspection Report",
      path: "/#/final_inspection_report",
    },
  ];

  const handleClick = (data) => {
    // getAndSetLoaclStorageDetails();
    // setloader(true)
    const getDetails = dropDownItem.find(
      (ele) => ele.key === parseInt(dropdownName)
    );
    if (getDetails) {
      const encryptedData = sendData(data);
      const newTab = window.open(getDetails.path, "_blank");
      if (newTab) {
        newTab.location.href = `${getDetails.path}?data=${encodeURIComponent(
          encryptedData
        )}`;
      }
    }
  };

  const getReportType = () => {
    const getDetails = dropDownItem.find(
      (ele) => ele.key === parseInt(dropdownName)
    )?.label;
    return getDetails;
  };

  const handleGetProductsList = () => {
    setloader(true);
    const formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("part_no", values?.part_no);
    formData.append("process", values?.process);
    formData.append("report_type", dropdownName);
    formData.append("newTab", 0);
    getInspectionReportList(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          handleClick("Add");
          // getAndSetLoaclStorageDetails("Add");
        } else if (response?.data?.status === 0) {
          toast.error(response?.data?.msg);
        } else if (response.data.status === 2) {
          setIsShowModal(true);
        }
      })
      .catch((err) => {
        getCatchMsg(err);
      })
      .finally(() => {
        setloader(false);
      });
  };

  const handleEditReport = () => {
    setloader(true);
    let formData = new FormData();
    formData.append("token", token);
    formData.append("part_no", values?.part_no);
    formData.append("process", values?.process);
    formData.append("user_id", userId);
    formData.append("option", 2);
    formData.append("report_type", dropdownName);
    savedDataList(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          handleClick("Edit");
          // getAndSetLoaclStorageDetails("Edit");
        } else if (response?.data?.status === 0) {
          if (Array.isArray(response?.data?.msg)) {
            getInvalidMsg(response?.data?.msg);
          } else {
            toast.error(response?.data?.msg);
          }
        }
      })
      .catch((err) => {
        getCatchMsg(err);
      })
      .finally(() => {
        setloader(false);
      });
  };

  const sendData = (data) => {
    var encrypted = CryptoJS.AES.encrypt(
      JSON.stringify({
        ...values,
        pageStatus: dropdownName,
        buttonStatus: data,
      }),
      "data"
    ).toString();
    setbuttonStatus(null);
    return encrypted;
  };

  return (
    <>
      {loader ? <Loader /> : null}
      <GlobalModal
        CustomWidth={500}
        isOpen={isShowModal}
        onCancel={() => setIsShowModal(false)}
      >
        <LogoutConfirmationModal
          msg={`${getReportType()} is already saved for this ${
            values?.part_no
          } and ${values?.process}. Please submit that first.`}
          positiveButtonText="Go to Saved Data"
          onPositiveButtonPressed={() => {
            navigate({ pathname: "/saved_logs" }, { state: values });
            setIsShowModal(false);
          }}
          onNegativeButtonPressed={() => setIsShowModal(false)}
        />
      </GlobalModal>
      <PageHeader BtnTrue={true} heading={"Prepare Inspection Report"} />
      <div className={classes.PrepareInspectionReport}>
        <div className="row">
          <div className="col-lg-12 my-2">
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
              placeHolder="Enter part number"
              requiredText="*"
              errorText={
                touched.part_no && errors.part_no ? errors.part_no : ""
              }
            />
          </div>
          <div className="col-lg-12 my-2">
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
        <div className="col-lg-12  my-2">
          <CustomDropDown
            placeholderText={"report type"}
            requiredText="*"
            items={[...dropDownItem]}
            value={
              [...dropDownItem].find(
                (ele) => ele.key === parseInt(dropdownName)
              )?.label
            }
            title="Select Report Type"
            onSelect={(val) => {
              setDropDownName(val);
            }}
          />
        </div>
        <div className="row">
          <div className="col-lg-4 col-6 mb-2 mt-3">
            <CustomButton
              title="Add report"
              onButtonPress={() => {
                setbuttonStatus("Add");
                handleSubmit();
                // handleGetProductsList();
                // handleClick("Add");
              }}
            />
          </div>
          <div className="col-lg-4 col-6 mb-2 mt-3">
            <CustomButton
              title="Edit report"
              customButtonStyle={{ backgroundColor: "rgba(0,0,0,0.4)" }}
              onButtonPress={() => {
                setbuttonStatus("Edit");
                handleSubmit();
                // handleClick("Edit");
                // handleGetProductsList();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PrepareInspectionReport;
