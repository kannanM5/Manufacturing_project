import { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCatchMsg, trimString } from "../../Utility/GeneralUtils";
import { setCookie } from "../../Store/Storage/Cookie";
import { otpverifyService } from "../../Services/Services";
import { CustomButton, Loader } from "../../Components";
import classes from "./AuthScreens.module.css";

function OTPVerificationpage() {
  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .required("Otp is required")
      .length(6, "Otp must be exactly 6 characters"),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [OtpData, setOtpData] = useState([]);
  const [loader, setloader] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const isForgotPasswordPage = location?.state?.email_ph_no;
  const [emailOrNumber, setEmailOrNumber] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(
    Number(location?.state?.duration)
  );
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const { handleSubmit, values, setFieldValue, errors, touched } = useFormik({
    initialValues: {
      otp: "",
      otpfield: "",
      reset_key: location?.state?.reset_key || "",
      email: location?.state?.email || "",
      email_ph_no: location?.state?.email_ph_no || "",
      org_code: location?.state?.org_code || "",
      emp_code: location?.state?.emp_code || "",
    },
    // validationSchema,
    onSubmit: (data) => {
      handleOtpVerify(data);
    },
  });

  /**
   * Adds an event listener to disable the back navigation when the user tries to navigate
   * back using the browser's back button.
   * @returns None
   */
  // useEffect(() => {
  //   const disableBackNavigation = (event) => {
  //     event.preventDefault();
  //     window.history.pushState(null, window.location.href);
  //   };

  //   window.history.pushState(null, window.location.href);
  //   window.addEventListener("popstate", disableBackNavigation);

  //   return () => {
  //     window.removeEventListener("popstate", disableBackNavigation);
  //   };
  // }, []);

  /**
   * useEffect hook that updates the emailOrNumber state variable with the value from the location state
   * if the isForgotPasswordPage flag is true.
   * @param {boolean} isForgotPasswordPage - Flag indicating if the current page is the forgot password page.
   * @param {string} emailOrNumber - The current value of the emailOrNumber state variable.
   * @param {object} location - The location object containing the state property.
   * @returns None
   */
  // useEffect(() => {
  //   if (isForgotPasswordPage) setEmailOrNumber(location?.state?.email_ph_no);
  // }, [emailOrNumber]);

  /**
   * A useEffect hook that checks the length of OtpData and updates the otpError state accordingly.
   * If the length of OtpData is greater than 0 and otpError is true, it checks if the length is equal to 6.
   * If it is, it sets otpError to false. If the length is not equal to 6, it sets otpError to true.
   * @param {Array} OtpData - The OTP data array.
   * @returns None
   */
  // useEffect(() => {
  //   if (OtpData?.length > 0 && otpError) {
  //     if (OtpData?.length === 6 && otpError) {
  //       setOtpError(false);
  //     } else if (OtpData?.length !== 6) {
  //       setOtpError(true);
  //     }
  //   }
  // }, [OtpData]);

  /**
   * Handles the verification of OTP for a given set of data.
   * @param {otpVerificationProps} data - The data object containing the OTP verification details.
   * @returns None
   */
  const handleOtpVerify = (data) => {
    console.log(data, "data");
    if (data === "123456") navigate("/reset_password");
  };
  // const handleOtpVerify = (data) => {
  //   setloader(true);
  //   const formData = new FormData();
  //   if (values.org_code) {
  //     formData.append("otp", otp);
  //     formData.append("org_code", values?.org_code);
  //     formData.append("reset_key", data?.reset_key);
  //   } else {
  //     formData.append("otp", otp);
  //     formData.append("reset_key", data?.reset_key);
  //   }

  //   otpverifyService(formData)
  //     .then((res) => {
  //       if (res.data.status === 1) {
  //         setCookie("mconnect_resetkey", 0);
  //         setEmailOrNumber(null);
  //         setCookie("otpverification", JSON.stringify(res.data));
  //         if (data.reset_key && data.emp_code) {
  //           navigate("/orgcode_instruction", {
  //             state: {
  //               org_code: values.org_code,
  //             },
  //           });
  //           toast.success(res.data.msg);
  //         } else if (data.reset_key && data.org_code) {
  //           navigate("/reset_password", {
  //             state: {
  //               org_code: values.org_code,
  //               reset_key: values.reset_key,
  //             },
  //           });
  //         } else {
  //           navigate("/");
  //           toast.success(res.data.msg);
  //         }
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
   * Handles the resend OTP functionality.
   * Sets the loader to true to indicate that the request is being processed.
   * Creates a new FormData object and appends the necessary data based on the values provided.
   * Calls the resendotpService function with the formData.
   * If the response status is 1, updates the time remaining, reset key, and displays a success toast message.
   * If the response status is not 1, displays an error toast message.
   * If there is an error during the request, displays an error toast message with the catch message.
   * Finally, sets the loader to false to indicate that the request has finished.
   * @returns None
   */
  const handleResendOtp = () => {
    setloader(true);

    const formData = new FormData();
    // if (values.org_code && values.email_ph_no) {
    //   formData.append("reset_key", values.reset_key);
    //   formData.append("org_code", values.org_code);
    //   formData.append("email", values.email_ph_no);
    // } else if (values.email_ph_no) {
    //   formData.append("reset_key", values.reset_key);
    //   formData.append("email", values.email_ph_no);
    // } else {
    //   formData.append("email", values.email);
    //   formData.append("reset_key", values.reset_key);
    // }
    // resendotpService(formData)
    //   .then((res) => {
    //     if (res.data.status === 1) {
    //       setTimeRemaining(res.data.duration);
    //       setFieldValue("reset_key", res.data.reset_key);
    //       toast.success(res.data.msg);
    //     } else {
    //       toast.error(res.data.msg);
    //     }
    //   })
    //   .catch((err) => toast.error(getCatchMsg(err)))
    //   .finally(() => {
    //     setloader(false);
    //   });
  };

  /**
   * A useEffect hook that starts a timer and updates the time remaining every second.
   * When the time remaining reaches 0, the timer is cleared.
   * @param {number} timeRemaining - The initial time remaining in seconds.
   * @returns None
   */
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTimeRemaining((prevTime) => prevTime - 1);
  //   }, 1000);
  //   if (timeRemaining === 0) {
  //     clearTimeout(timer);
  //     // Handle timeout action here
  //   }

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [timeRemaining]);

  // const handleOTPChange = (otp) => {
  //   // Convert the OTP array to a string and set it in the state
  //   const otpString = otp.join("");
  //   setOTPValues(otpString);
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

  return (
    <div className={classes.otpverifycontainer1}>
      {loader ? <Loader /> : null}
      <div className={classes.otpverifycontainer2}>
        <div>
          <div className={classes.title}>OTP Verification</div>
          <div className={classes.desc}>
            {emailOrNumber
              ? trimString(values?.email_ph_no, 3)
              : "A Code has been sent to Email and mobile number"}
          </div>
          <div className={classes.otpfield}>
            <OtpInput
              value={otp}
              onChange={(otp) => {
                setOtp(otp);
                setFieldValue("otp", otp);
              }}
              numInputs={6}
              // renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input {...props} className={classes.otpnewinputfield} />
              )}
              inputType="tel"
            />
            {touched.otp && errors.otp ? <p>{errors.otp}</p> : ""}
          </div>

          <div className={classes.otpdesc}>
            {!timeRemaining ? (
              <>
                Don’t receive a code?
                <Link to="" onClick={handleResendOtp}>
                  Resend
                </Link>
              </>
            ) : (
              <>
                Dont’t receive a code? <span>Resend</span>
                {minutes}:{seconds < 10 ? "0" : ""}
                {seconds}
              </>
            )}
          </div>
          <div className={classes.otpbtn}>
            <CustomButton
              title="Submit"
              onButtonPress={() => navigate("/reset_password")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPVerificationpage;
