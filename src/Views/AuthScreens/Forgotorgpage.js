import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { frogotpassandorgService } from "../../Services/Services";
import { getCatchMsg } from "../../Utility/GeneralUtils";
import { setCookie } from "../../Store/Storage/Cookie";
import { CustomButton, Loader, TextInputBox } from "../../Components";
import classes from "./AuthScreens.module.css";

function Forgotorgpage() {
  const validationSchema = Yup.object().shape({
    email_ph_no: Yup.string()
      .required("Email or mobile number is required")
      .test(
        "Emailormobilenumber",
        "Invalid email or mobile number",
        (value) => {
          // Test for email format
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const isEmail = emailRegex.test(value);

          // Test for mobile number format
          const mobileRegex = /^\d{10}$/;
          const isMobileNumber = mobileRegex.test(value);

          // Return true if either email or mobile number format is valid
          return isEmail || isMobileNumber;
        }
      ),
  });
  const navigate = useNavigate();
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
      type: 2,
      email_ph_no: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleForgotOrgCode(values);
    },
  });

  /**
   * Handles the forgot organization code functionality.
   * @param {forgotOrganizationProps} data - The data object containing the necessary information for the request.
   * @returns None
   */
  const handleForgotOrgCode = (data) => {
    setloader(true);
    let formData = new FormData();
    formData.append("type", data.type.toString());
    formData.append("email_ph_no", values.email_ph_no);
    frogotpassandorgService(formData)
      .then((res) => {
        if (res.data.status === 1) {
          setCookie("mconnect_resetkey", 1);
          navigate("/otp_verification", {
            state: {
              reset_key: res.data.reset_key,
              email_ph_no: values.email_ph_no,
              duration: res.data.duration,
            },
          });
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error(getCatchMsg(err));
      })
      .finally(() => {
        setloader(false);
      });
  };

  /**
   * Adds an event listener to all input fields on the page to handle the "Enter" key press.
   * When the "Enter" key is pressed, the handleSubmit function is called.
   * @returns None
   */
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };
    const inputFields = document.querySelectorAll("input");
    inputFields.forEach((input) => {
      input.addEventListener("keydown", handleKeyPress);
    });
    return () => {
      inputFields.forEach((input) => {
        input.removeEventListener("keydown", handleKeyPress);
      });
    };
  }, []);

  return (
    <div className={classes.otpverifycontainer1}>
      {loader ? <Loader /> : null}
      <div className={classes.otpverifycontainer2}>
        <div className={classes.title}>Forgot Organization Code!</div>
        <div>
          <div className={classes.fororginput}>
            <div className={classes.inputsection}>
              <TextInputBox
                title="Enter admin mobile number or email"
                value={values.email_ph_no}
                onChangeText={handleChange("email_ph_no")}
                placeHolder="Enter email or mobile no"
                customInputProps={{
                  onBlur: () => {
                    try {
                      validationSchema.validateSyncAt(
                        "email_ph_no",
                        values.email_ph_no
                      );
                    } catch (error) {
                      if (error instanceof Error) {
                        setFieldTouched("email_ph_no", true);
                        setFieldError("email_ph_no", error.message);
                      }
                    }
                  },
                  maxLength: 50,
                }}
                requiredText="*"
                errorText={
                  touched.email_ph_no && errors.email_ph_no
                    ? errors.email_ph_no
                    : ""
                }
              />
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

export default Forgotorgpage;
