import React, { useState } from "react";
import close from "../Assets/Icons/Svg/close.svg";
import { useFormik } from "formik";
import { CustomButton, Loader, TextInputBox } from "../Components";
import * as Yup from "yup";
import classes from "./Modal.module.css";
import { getCookie } from "../Store/Storage/Cookie";
import toast from "react-hot-toast";
import { getCatchMsg } from "../Utility/GeneralUtils";
import { employeeChangePassword } from "../Services/Services";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Please enter new password")
    .trim("Remove leading and trailing spaces")
    .strict(true),
  repeat_password: Yup.string()
    .required("Please enter confirm password")
    .trim("Remove leading and trailing spaces")
    .strict(true),
});

function EmployeeChangePassword({ onClose, heading, employeeId, modalClose }) {
  const [loader, setloader] = useState(false);

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
  const cookieData = getCookie("vt_enterprise_login");

  const handleEmployeeChangePassword = (data) => {
    setloader(true);
    let formData = new FormData();
    formData.append("token", cookieData?.data?.token);
    formData.append("password", data?.password);
    formData.append("confirm_password", data?.repeat_password);
    formData.append("user_id", cookieData?.data?.user_id);
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
              title="New password"
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
              title="Confirm password"
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
