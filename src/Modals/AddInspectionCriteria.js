import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import classes from "./Modal.module.css";
import { CustomButton, Loader, TextInputBox } from "../Components";
import { getCatchMsg, getInvalidMsg } from "../Utility/GeneralUtils";
import { useEmployeeId, useToken } from "../Utility/StoreData";
import {
  addInspectionCriteriaService,
  editInspectionCriteriaService,
} from "../Services/Services";

const validationSchema = Yup.object({
  characteristics: Yup.string().required("Characteristics is required"),
  specification: Yup.string().required("Specification is required"),
  units: Yup.string().required("Unit is required"),
  method_of_check: Yup.string().required("Method of check is required"),
});

function AddInspectionCriteria({
  editStatus,
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
      part_no: editData?.part_no ? editData?.part_no : "",
      process: editData?.process ? editData?.process : "",
      characteristics: editData?.characteristics || "",
      specification: editData?.specification || "",
      units: editData?.units || "",
      method_of_check: editData?.method_of_check || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (editStatus) {
        handleUpdateInspectionCriteria(values);
      } else {
        handleAddInspectionCriteria(values);
      }
    },
  });

  const [loader, setloader] = useState(false);
  const token = useToken();
  const focusRef = useRef(null);
  const userId = useEmployeeId();

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  const handleAddInspectionCriteria = (data) => {
    console.log(data, "datatat");
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

    console.log(formData, "formdata");
    addInspectionCriteriaService(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          toast.success(response?.data?.msg);
          modalClose();
          listApiCall();
        } else if (response?.data?.status === 0) {
          if (typeof response?.data?.msg === "object") {
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
          if (typeof response?.data?.msg === "object") {
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
  console.log(editStatus, "VALUEEE");

  return (
    <div>
      {loader ? <Loader /> : null}
      <div className={classes.Container}>
        <div className="row">
          <div className="col-lg-6 col-md-6 mb-3 ">
            <TextInputBox
              referr={focusRef}
              title="Characteristics"
              placeHolder="Enter characteristics"
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
          <div className="col-lg-6 col-md-6 mb-3 ">
            <TextInputBox
              title="Specifications"
              placeHolder="Enter specifications"
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
          <div className="col-lg-6 col-md-6 mb-3 ">
            <TextInputBox
              title="Unit"
              placeHolder="Enter unit"
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
          <div className="col-lg-6 col-md-6 mb-3 ">
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
          <div className="col-lg-2 col-md-3 col-4 mb-2">
            <CustomButton
              onButtonPress={handleSubmit}
              title={editStatus ? "Update" : "Submit"}
            />
          </div>
          <div className="col-lg-2 col-md-3 col-4 mb-2">
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
