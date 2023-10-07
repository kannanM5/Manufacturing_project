import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Captrefres from "../../Assets/Icons/Svg/caprefres.svg";
import { captchaService } from "../../Services/Services";
import { getCatchMsg } from "../../Utility/GeneralUtils";
import { orgcodeService } from "../../Services/Services";
import { setCookie } from "../../Store/Storage/Cookie";
import { signupService } from "../../Services/Services";
import { CustomButton, Loader, TextInputBox } from "../../Components";
import classes from "./AuthScreens.module.css";

function Signup() {
  const validationSchema = Yup.object({
    company_name: Yup.string()
      .required("Company name is required")
      .trim("Remove leading and trailing spaces")
      .strict(true),
    emp_code: Yup.string()
      .matches(/^\d{1,10}$/, "Employee id atleast 4 characters")
      .required("Employee id is required"),
    name: Yup.string()
      .required("Name is required")
      .trim("Remove leading and trailing spaces")
      .strict(true),
    email: Yup.string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email address"
      )
      .required("Email is required"),
    confirm_email: Yup.string()
      .oneOf([Yup.ref("email")], "Emails must match")
      .required("Confirm email is required"),
    mobile_no: Yup.string()
      .required("Mobile number is required")
      .min(10, "Mobile number must have at least 10 digits")
      .max(10, "Mobile number must have at most 10 digits"),
    alternative_mobile_no: Yup.string()
      .min(10, "Alternative number must have at least 10 digits")
      .max(10, "Mobile number must have at most 10 digits"),
    org_code: Yup.string()
      .required("Organization code is required")
      .trim("Remove leading and trailing spaces")
      .strict(true),
    password: Yup.string()
      .required("Password is required")
      .trim("Remove leading and trailing spaces")
      .strict(true),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match")
      .trim("Remove leading and trailing spaces")
      .strict(true),
    captcha: Yup.string()
      .required("Captcha is required")
      .trim("Remove leading and trailing spaces")
      .strict(true),
  });
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(null);
  const [loader, setloader] = useState(false);
  const [captchaloader, setcaptchaloader] = useState(false);
  const [rotate, setRotate] = useState(0);

  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    errors,
    touched,
    setFieldError,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      company_name: "",
      emp_code: "",
      name: "",
      email: "",
      confirm_email: "",
      mobile_no: "",
      alternative_mobile_no: "",
      org_code: "",
      password: "",
      confirm_password: "",
      captcha: "",
      reset_key: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSignup(values);
    },
  });

  /**
   * Handles the signup process by sending the signup data to the server.
   * @param {signupDataProps} data - The signup data object containing the user's information.
   * @returns None
   */
  const handleSignup = (data) => {
    setloader(true);
    let formData = new FormData();
    formData.append("company_name", data.company_name);
    formData.append("emp_code", data.emp_code);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("confirm_email", data.confirm_email);
    formData.append("mobile_no", data.mobile_no);
    formData.append("alternative_mobile_no", data.alternative_mobile_no);
    formData.append("org_code", data.org_code);
    formData.append("password", data.password);
    formData.append("confirm_password", data.confirm_password);
    formData.append("captcha", data.captcha);

    signupService(formData)
      .then((res) => {
        if (res.data.status === 0) {
          getCaptcha();
        }
        if (res.data.status === 1) {
          // setCookie("mconnect_user_data", JSON.stringify(res.data));
          setCookie("mconnect_resetkey", 1);
          navigate("/otp_verification", {
            state: {
              emp_code: values.emp_code,
              email: values.email,
              reset_key: res.data.reset_key,
              org_code: values.org_code,
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
   * Runs the getCaptcha function once when the component is mounted.
   * @returns None
   */
  useEffect(() => {
    getCaptcha();
  }, []);

  /**
   * Retrieves a captcha from the captcha service and sets it as the current captcha.
   * @returns None
   */
  const getCaptcha = () => {
    setcaptchaloader(true);
    captchaService()
      .then((response) => {
        setCaptcha(response.data.url);
      })
      .catch((err) => {
        toast.error(getCatchMsg(err));
      })
      .finally(() => {
        setcaptchaloader(false);
      });
  };

  /**
   * Retrieves the organization code based on the provided company name.
   * If the company name is provided, it creates a new FormData object and appends
   * the organization name to it. Then, it calls the orgcodeService function with
   * the FormData object as a parameter. If the service call is successful, it sets
   * the org_code field value to the response data. If there is an error, it displays
   * an error toast message.
   * @returns None
   */
  const getOrgcode = () => {
    if (values.company_name) {
      const formData = new FormData();
      formData.append("organization_name", values.company_name);
      orgcodeService(formData)
        .then((response) => {
          setFieldValue("org_code", response.data.org_code);
        })
        .catch((err) => toast.error(getCatchMsg(err)));
    }
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
    <div className={classes.container1}>
      {loader ? <Loader /> : null}
      <div className={classes.signupcontainer2}>
        <div className={classes.title}>Registration!</div>
        <div className={classes.desc}>Sign up with your username or email</div>
        <div className="row mt-4">
          <div
            className={`col-lg-4 col-md-6 col-sm-12 ${classes.inputsection}`}
          >
            <TextInputBox
              title="Name"
              value={values.name}
              onChangeText={handleChange("name")}
              name="name"
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt("name", values.name);
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("name", true);
                      setFieldError("name", error.message);
                    }
                  }
                },
                maxLength: 50,
              }}
              type={"text"}
              placeHolder="Name"
              requiredText="*"
              errorText={touched.name && errors.name ? errors.name : ""}
            />
          </div>

          <div
            className={`col-lg-4 col-md-6 col-sm-12 ${classes.inputsection}`}
          >
            <TextInputBox
              title="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              name="email"
              type={"text"}
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt("email", values.email);
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("email", true);
                      setFieldError("email", error.message);
                    }
                  }
                },
                maxLength: 50,
                inputMode: "email",
              }}
              placeHolder="Email"
              requiredText="*"
              errorText={touched.email && errors.email ? errors.email : ""}
            />
          </div>

          {/* <div
            className={`col-lg-4 col-md-6 col-sm-12 ${classes.inputsection}`}
          >
            <TextInputBox
              title="Confirm email"
              value={values.confirm_email}
              onChangeText={handleChange("confirm_email")}
              name="confirm_email"
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt(
                      "confirm_email",
                      values.confirm_email
                    );
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("confirm_email", true);
                      setFieldError("confirm_email", error.message);
                    }
                  }
                },
                maxLength: 50,
                inputMode: "email",
              }}
              type={"text"}
              placeHolder="Confirm email"
              requiredText="*"
              errorText={
                touched.confirm_email && errors.confirm_email
                  ? errors.confirm_email
                  : ""
              }
            />
          </div> */}

          <div
            className={`col-lg-4 col-md-6 col-sm-12 ${classes.inputsection}`}
          >
            <TextInputBox
              title="Mobile number"
              value={values.mobile_no}
              infotxt={errors.mobile_no ? "" : "number only"}
              onChangeText={(text) => {
                const formattedValue = text.replace(/[^0-9]/g, "");
                const limitedValue = formattedValue.slice(0, 10);
                setFieldValue("mobile_no", limitedValue);
              }}
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt(
                      "mobile_no",
                      values.mobile_no
                    );
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("mobile_no", true);
                      setFieldError("mobile_no", error.message);
                    }
                  }
                },
                maxLength: 10,
              }}
              name="mobile_no"
              placeHolder="Mobile number"
              requiredText="*"
              errorText={
                touched.mobile_no && errors.mobile_no ? errors.mobile_no : ""
              }
            />
          </div>
          <div
            className={`col-lg-4 col-md-6 col-sm-12 ${classes.inputsection}`}
          >
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

          <div
            className={`col-lg-4 col-md-6 col-sm-12 ${classes.inputsection}`}
          >
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

        <div className={classes.btncontent}>
          <div className={classes.signupbtn}>
            <CustomButton
              title="Sign up"
              onButtonPress={() => handleSubmit()}
            />
          </div>
          <div className={classes.alreadyhvacc}>
            Already have an account
            <div>
              {" "}
              <Link to="/">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
