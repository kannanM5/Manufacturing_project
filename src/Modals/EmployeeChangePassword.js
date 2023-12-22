import React, { useState } from "react";
import { useFormik } from "formik";
import { CustomButton, Loader, TextInputBox } from "../Components";
import * as Yup from "yup";
import classes from "./Modal.module.css";
import { getCookie } from "../Store/Storage/Cookie";
import toast from "react-hot-toast";
import { getCatchMsg } from "../Utility/GeneralUtils";
import { employeeChangePassword } from "../Services/Services";
import { useEmployeeId, useToken } from "../Utility/StoreData";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("New password is required"),
  repeat_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

function EmployeeChangePassword({ onClose, heading, employeeId, modalClose }) {
  const [loader, setloader] = useState(false);
  const token = useToken();
  const userId = useEmployeeId();
  const {
    values,
    handleChange,
    handleSubmit,
    setFieldTouched,
    setFieldError,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      password: "",
      repeat_password: "",
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: () => {
      handleEmployeeChangePassword(values);
    },
  });

  const handleEmployeeChangePassword = (data) => {
    setloader(true);
    let formData = new FormData();
    formData.append("token", token);
    formData.append("password", data?.password.trim());
    formData.append("confirm_password", data?.repeat_password.trim());
    formData.append("user_id", userId);
    formData.append("id", employeeId);
    employeeChangePassword(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          modalClose();
          toast.success(response?.data?.msg);
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
    <>
      {loader ? <Loader /> : null}
      <div className={classes.employeeChangePassword}>
        <div className="row">
          <div className="col-12 mb-3">
            <TextInputBox
              requiredText="*"
              isSecure={true}
              placeHolder="Enter new password"
              onChangeText={handleChange("password")}
              value={values.password}
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt(
                      "password",
                      values.password
                    );
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("password", true);
                      setFieldError("password", error.message);
                    }
                  }
                },
                maxLength: 50,
              }}
              name="password"
              title="New Password"
              errorText={
                touched.password && errors.password ? errors.password : ""
              }
            />
          </div>
          <div className="col-12 mb-3">
            <TextInputBox
              requiredText="*"
              isSecure={true}
              placeHolder="Enter confirm password"
              onChangeText={handleChange("repeat_password")}
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt(
                      "repeat_password",
                      values.repeat_password
                    );
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("repeat_password", true);
                      setFieldError("repeat_password", error.message);
                    }
                  }
                },
                maxLength: 50,
              }}
              value={values.repeat_password}
              name="repeat_password"
              title="Confirm Password"
              errorText={
                touched.repeat_password && errors.repeat_password
                  ? errors.repeat_password
                  : ""
              }
            />
          </div>
          <div className="col-12 col-lg-3 col-md-4 mb-3">
            <CustomButton title="Save" onButtonPress={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeChangePassword;
