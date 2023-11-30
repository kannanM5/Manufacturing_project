import React, { useState } from "react";
import classes from "./Modal.module.css";
import { CustomButton, Loader, TextInputBox } from "../Components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCatchMsg } from "../Utility/GeneralUtils";
import toast from "react-hot-toast";
import { useEmployeeId, useToken } from "../Utility/StoreData";
import {
  addInspectionCriteriaService,
  editInspectionCriteriaService,
} from "../Services/Services";
import { ALPHA_NUM } from "../Utility/Constants";

const validationSchema = Yup.object({
  characteristics: Yup.string()
    .required("Characteristics is required")
    .matches(ALPHA_NUM, "Enter valid characteristics"),
  specification: Yup.string().required("Specification is required"),
  units: Yup.string()
    .required("Unit is required")
    .matches(ALPHA_NUM, "Enter valid unit"),
  method_of_check: Yup.string()
    .required("Method of check is required")
    .matches(ALPHA_NUM, "Enter valid method of check"),
});

function AddInspectionCriteria({
  heading,
  getValue,
  modalClose,
  listApiCall,
  editData,
}) {
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    setFieldError,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      id: editData?.id,
      part_no: getValue?.part_no ? getValue?.part_no : "",
      process: getValue?.process ? getValue?.process : "",
      characteristics: editData?.characteristics || "",
      specification: editData?.specification || "",
      units: editData?.units || "",
      method_of_check: editData?.method_of_check || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (editData) {
        handleUpdateInspectionCriteria(values);
      } else {
        handleAddInspectionCriteria(values);
      }
    },
  });
  const [loader, setloader] = useState(false);
  const token = useToken();
  const userId = useEmployeeId();

  const handleAddInspectionCriteria = (data) => {
    setloader(true);
    let formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("part_no", data?.part_no);
    formData.append("process", data?.process);
    formData.append("characteristics", data?.characteristics);
    formData.append("specification", data?.specification);
    formData.append("units", data?.units);
    formData.append("method_of_check", data?.method_of_check);
    addInspectionCriteriaService(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          toast.success(response?.data?.msg);
          modalClose();
          listApiCall();
        } else if (response?.data?.status === 0) {
          toast.error(response?.data?.msg);
        }
      })
      .catch((err) => {
        getCatchMsg(err);
      })
      .finally(() => {
        setloader(false);
      });
  };
  const handleUpdateInspectionCriteria = (data) => {
    setloader(true);
    let formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("part_no", data?.part_no);
    formData.append("process", data?.process);
    formData.append("characteristics", data?.characteristics);
    formData.append("specification", data?.specification);
    formData.append("units", data?.units);
    formData.append("id", data?.id);
    formData.append("method_of_check", data?.method_of_check);
    editInspectionCriteriaService(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          toast.success(response?.data?.msg);
          modalClose();
          listApiCall();
        } else if (response?.data?.status === 0) {
          toast.error(response?.data?.msg);
        }
      })
      .catch((err) => {
        getCatchMsg(err);
      })
      .finally(() => {
        setloader(false);
      });
  };
  return (
    <div>
      {loader ? <Loader /> : null}
      <div className={classes.Container}>
        <div className="row">
          <div className="col-lg-6 mb-3 ">
            <TextInputBox
              title="Characteristics"
              placeHolder="Enter Characteristics"
              value={values.characteristics}
              onChangeText={handleChange("characteristics")}
              name="characteristics"
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt(
                      "characteristics",
                      values.characteristics
                    );
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("characteristics", true);
                      setFieldError("characteristics", error.message);
                    }
                  }
                },
                maxLength: 50,
              }}
              type={"text"}
              requiredText="*"
              errorText={
                touched.characteristics && errors.characteristics
                  ? errors.characteristics
                  : ""
              }
            />
          </div>
          <div className="col-lg-6 mb-3 ">
            <TextInputBox
              title="Specifications"
              placeHolder="Enter Specifications"
              value={values.specification}
              onChangeText={handleChange("specification")}
              name="specification"
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt(
                      "specification",
                      values.specification
                    );
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("specification", true);
                      setFieldError("specification", error.message);
                    }
                  }
                },
                maxLength: 50,
              }}
              type={"text"}
              requiredText="*"
              errorText={
                touched.specification && errors.specification
                  ? errors.specification
                  : ""
              }
            />
          </div>
          <div className="col-lg-6 mb-3 ">
            <TextInputBox
              title="Unit"
              placeHolder="Enter Unit"
              value={values.units}
              onChangeText={handleChange("units")}
              name="units"
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt("units", values.units);
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("units", true);
                      setFieldError("units", error.message);
                    }
                  }
                },
                maxLength: 50,
              }}
              type={"text"}
              requiredText="*"
              errorText={touched.units && errors.units ? errors.units : ""}
            />
          </div>
          <div className="col-lg-6 mb-3 ">
            <TextInputBox
              title="Method of check"
              placeHolder="Enter method of check"
              value={values.method_of_check}
              onChangeText={handleChange("method_of_check")}
              name="method_of_check"
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt(
                      "method_of_check",
                      values.method_of_check
                    );
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("method_of_check", true);
                      setFieldError("method_of_check", error.message);
                    }
                  }
                },
                maxLength: 50,
              }}
              type={"text"}
              requiredText="*"
              errorText={
                touched.method_of_check && errors.method_of_check
                  ? errors.method_of_check
                  : ""
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2 col-md-6 my-2">
            <CustomButton
              onButtonPress={handleSubmit}
              title={editData ? "Update" : "Submit"}
            />
          </div>
          <div className="col-lg-2 col-md-6 my-2">
            <CustomButton
              title="Cancel"
              onButtonPress={modalClose}
              customButtonStyle={{
                backgroundColor: "var(--tableHeadBg)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddInspectionCriteria;
