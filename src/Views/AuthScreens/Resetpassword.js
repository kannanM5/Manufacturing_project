import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getCatchMsg } from "../../Utility/GeneralUtils";
import { resetpasswordService } from "../../Services/Services";
import { CustomButton, Loader, TextInputBox } from "../../Components";
import classes from "./AuthScreens.module.css";

function Resetpassword() {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .trim("Remove leading and trailing spaces")
      .strict(true),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .trim("Remove leading and trailing spaces")
      .strict(true)
      .oneOf([Yup.ref("password")], "Passwords is not match"),
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [loader, setloader] = useState(false);

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
      reset_key: location?.state?.reset_key || "",
      password: "",
      confirm_password: "",
      org_code: location?.state?.org_code || "",
    },

    // validationSchema: validationSchema,
    onSubmit: (values) => {
      handleResetpassword(values);
    },
  });
  const handleResetpassword = () => {
    navigate("/");
  };
  /**
   * Handles the reset password functionality by sending a request to the server with the provided data.
   * @param {resetPasswordProps} data - The data object containing the reset key, password, confirm password, and organization code.
   * @returns None
   */
  // const handleResetpassword = (data) => {
  //   setloader(true);
  //   let formdata = new FormData();
  //   formdata.append("reset_key", data.reset_key);
  //   formdata.append("password", data.password);
  //   formdata.append("confirm_password", data.confirm_password);
  //   formdata.append("org_code", data.org_code);
  //   resetpasswordService(formdata)
  //     .then((res) => {
  //       if (res.data.status === 1) {
  //         navigate("/");
  //         toast.success(res.data.msg);
  //       } else {
  //         toast.error(res.data.msg);
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error(getCatchMsg(err));
  //     })
  //     .finally(() => {
  //       setloader(false);
  //     });
  // };

  /**
   * Adds an event listener to all input fields on the page to handle the "Enter" key press.
   * When the "Enter" key is pressed, the handleSubmit function is called.
   * @returns None
   */
  // useEffect(() => {
  //   const handleKeyPress = (event) => {
  //     if (event.key === "Enter") {
  //       handleSubmit();
  //     }
  //   };
  //   const inputFields = document.querySelectorAll("input");
  //   inputFields.forEach((input) => {
  //     input.addEventListener("keydown", handleKeyPress);
  //   });
  //   return () => {
  //     inputFields.forEach((input) => {
  //       input.removeEventListener("keydown", handleKeyPress);
  //     });
  //   };
  // }, []);

  /**
   * Adds an event listener to disable the back navigation when the user tries to navigate
   * back using the browser's back button.
   * @returns None
   */
  // useEffect(() => {
  //   const disableBackNavigation = (event) => {
  //     event.preventDefault();
  //     window.history.pushState(null, "", "/");
  //   };

  //   window.history.pushState("/", "/", window.location.href);
  //   window.addEventListener("popstate", disableBackNavigation);

  //   return () => {
  //     window.removeEventListener("popstate", disableBackNavigation);
  //   };
  // }, []);

  return (
    <div className={classes.otpverifycontainer1}>
      {loader ? <Loader /> : null}
      <div className={classes.otpverifycontainer2}>
        <div className={classes.title}>Reset password</div>

        <div>
          <div className={classes.fororginput}>
            <div className={classes.inputsection}>
              <TextInputBox
                requiredText="*"
                value={values.password}
                isSecure={true}
                onChangeText={handleChange("password")}
                name="password"
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
                placeHolder="Enter password"
                title="Password"
                errorText={
                  touched.password && errors.password ? errors.password : ""
                }
              ></TextInputBox>
            </div>
          </div>
          <div className={classes.fororginput}>
            <div className={classes.inputsection}>
              <TextInputBox
                requiredText="*"
                value={values.confirm_password}
                isSecure={true}
                onChangeText={handleChange("confirm_password")}
                name="confirm_password"
                customInputProps={{
                  onBlur: () => {
                    try {
                      validationSchema.validateSyncAt(
                        "confirm_password",
                        values.confirm_password
                      );
                    } catch (error) {
                      if (error instanceof Error) {
                        setFieldTouched("confirm_password", true);
                        setFieldError("confirm_password", error.message);
                      }
                    }
                  },
                  maxLength: 50,
                }}
                placeHolder="Enter confirm password"
                title="Confirm password"
                errorText={
                  touched.confirm_password && errors.confirm_password
                    ? errors.confirm_password
                    : ""
                }
              ></TextInputBox>
            </div>
          </div>
          <div className={classes.otpbtn}>
            <CustomButton title="Submit" onButtonPress={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resetpassword;
