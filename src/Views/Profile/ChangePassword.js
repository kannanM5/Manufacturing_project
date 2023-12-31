import { useState } from "react";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { getCatchMsg, getInvalidMsg } from "../../Utility/GeneralUtils";
import classes from "./UserProfile.module.css";
import { CustomButton, Loader, TextInputBox } from "../../Components";
import { superAdminChangePassword } from "../../Services/Services";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import { useEmployeeId, useToken } from "../../Utility/StoreData";

const validationSchema = Yup.object().shape({
  old_password: Yup.string().required("Current password is required"),
  new_password: Yup.string().required("New password is required"),
  repeat_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("new_password")], "Passwords must match"),
});

function ChangePassword() {
  const token = useToken();
  const userId = useEmployeeId();
  const navigate = useNavigate();
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
      old_password: "",
      new_password: "",
      repeat_password: "",
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: () => {
      handleChangePassword(values);
    },
  });

  const handleChangePassword = (data) => {
    setloader(true);
    let formData = new FormData();
    formData.append("id", userId);
    formData.append("token", token);
    formData.append("current_password", data?.old_password.trim());
    formData.append("password", data?.new_password.trim());
    formData.append("confirm_password", data?.repeat_password.trim());
    superAdminChangePassword(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          toast.success(response?.data?.msg);
          navigate("/dashboard");
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

  return (
    <>
      <PageHeader
        heading={"Change Password"}
        onPressOvertime={true}
        secondBtn={false}
      />
      {loader ? <Loader /> : null}
      <div className={classes.container}>
        <div className="container-fluid">
          <div className={classes.changepasswordcontent}>
            <div className="row">
              <div className="col-lg-6 col-md-5 col-12 mb-3">
                <TextInputBox
                  requiredText="*"
                  isSecure={true}
                  placeHolder="Enter current password"
                  value={values.old_password}
                  name="old_password"
                  onChangeText={handleChange("old_password")}
                  title="Current Password"
                  errorText={
                    touched.old_password && errors.old_password
                      ? errors.old_password
                      : ""
                  }
                  customInputProps={{
                    onBlur: () => {
                      try {
                        validationSchema.validateSyncAt(
                          "old_password",
                          values.old_password
                        );
                      } catch (error) {
                        if (error instanceof Error) {
                          setFieldTouched("old_password", true);
                          setFieldError("old_password", error.message);
                        }
                      }
                    },
                    maxLength: 50,
                  }}
                />
              </div>
              <div className="col-lg-6 col-md-5 col-12 mb-3">
                <TextInputBox
                  requiredText="*"
                  isSecure={true}
                  placeHolder="Enter new password"
                  onChangeText={handleChange("new_password")}
                  value={values.new_password}
                  customInputProps={{
                    onBlur: () => {
                      try {
                        validationSchema.validateSyncAt(
                          "new_password",
                          values.new_password
                        );
                      } catch (error) {
                        if (error instanceof Error) {
                          setFieldTouched("new_password", true);
                          setFieldError("new_password", error.message);
                        }
                      }
                    },
                    maxLength: 50,
                  }}
                  name="new_password"
                  title="New Password"
                  errorText={
                    touched.new_password && errors.new_password
                      ? errors.new_password
                      : ""
                  }
                />
              </div>
              <div className="col-lg-6 col-md-5 col-12 mb-3">
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
              <div className="row">
                <div className={`${classes.savebtn}`}>
                  <CustomButton title="Save" onButtonPress={handleSubmit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
