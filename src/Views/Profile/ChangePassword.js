import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCatchMsg } from "../../Utility/GeneralUtils";
import { useToken } from "../../Utility/StoreData";
import classes from "./UserProfile.module.css";
import { CustomButton, Loader, TextInputBox } from "../../Components";
import { getCookie } from "../../Store/Storage/Cookie";
import { superAdminChangePassword } from "../../Services/Services";

function ChangePassword() {
  const token = useToken();
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  const validationSchema = Yup.object().shape({
    old_password: Yup.string()
      .required("Current password is required")
      .trim("Remove leading and trailing spaces")
      .strict(true),
    new_password: Yup.string()
      .required("Please enter new password")
      .trim("Remove leading and trailing spaces")
      .strict(true),
    repeat_password: Yup.string()
      .required("Please enter confirm password")
      .oneOf([Yup.ref("new_password")], "Passwords must match")
      .trim("Remove leading and trailing spaces")
      .strict(true),
  });

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
  const cookieData = getCookie("vt_enterprise_login");
  const handleChangePassword = (data) => {
    setloader(true);
    let formData = new FormData();
    formData.append("id", cookieData?.data?.user_id);
    formData.append("token", cookieData?.data?.token);
    formData.append("current_password", data?.old_password);
    formData.append("password", data?.new_password);
    formData.append("confirm_password", data?.repeat_password);
    superAdminChangePassword(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
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
  // change password
  //   const handleChangePassword = () => {
  //     setloader(true);
  //     let formData = new FormData();
  //     formData.append("token", token);
  //     formData.append("old_password", values.old_password);
  //     formData.append("new_password", values.new_password);
  //     formData.append("repeat_password", values.repeat_password);
  //     changepassword(formData)
  //       .then((res) => {
  //         if (res.data.status === 1) {
  //           toast.success(res.data.msg);
  //           navigate(-1);
  //         } else {
  //           toast.error(res.data.msg);
  //         }
  //       })
  //       .catch((err) => {
  //         toast.error(getCatchMsg(err));
  //       })
  //       .finally(() => {
  //         setloader(false);
  //       });
  //   };

  return (
    <>
      {loader ? <Loader /> : null}
      <div className={classes.container}>
        <div className={classes.head}>
          <div className={classes.line}></div>
          <div className={classes.heading}>Change Password</div>
        </div>
        <div className="container-fluid">
          <div className={classes.changepasswordcontent}>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12 mb-3">
                <TextInputBox
                  requiredText="*"
                  isSecure={true}
                  placeHolder="Enter current password"
                  value={values.old_password}
                  name="old_password"
                  onChangeText={handleChange("old_password")}
                  title="Current password"
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
              <div className="col-lg-6 col-md-6 col-12 mb-3">
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
                  title="New password"
                  errorText={
                    touched.new_password && errors.new_password
                      ? errors.new_password
                      : ""
                  }
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12 mb-3">
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
