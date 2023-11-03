import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { captchaService, userSignin } from "../../Services/Services";
import { getCatchMsg } from "../../Utility/GeneralUtils";
import { handleStoreUserData } from "../../Store/Reducers/LoginReducer";
import img from "../../Assets/Images/Svg/loginimg.svg";
import { setCookie } from "../../Store/Storage/Cookie";
import { Loader, TextInputBox, CustomButton } from "../../Components/index";
import classes from "./AuthScreens.module.css";
import { EMAIL_REGEX } from "../../Utility/Constants";
import { useToken } from "../../Utility/StoreData";

function Signin() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .matches(EMAIL_REGEX, "Enter valid email"),
    password: Yup.string().required("Password is required"),
  });
  const { REACT_APP_SALT_KEY } = process.env;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sha1 = require("sha1");
  const [loader, setloader] = useState(false);
  const [rememberChecked, setcheck] = useState(false);
  const [captchaloader, setcaptchaloader] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [rotate, setRotate] = useState(0);
  const {
    handleSubmit,
    handleChange,
    setValues,
    values,
    errors,
    touched,
    setFieldError,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  const handleLogin = (data) => {
    setloader(true);
    let formData = new FormData();
    formData.append("email", data?.email);
    formData.append("password", data?.password);
    userSignin(formData)
      .then((response) => {
        console.log(response, "RESPONSE");
        if (response?.data?.status === 1) {
          navigate("/dashboard");
          toast.success(response?.data?.msg);
          dispatch(handleStoreUserData(response?.data?.data));
          setCookie("vt_enterprise_login", response?.data);
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
  /**
   * Handles the login process with the provided login data.
   * @param {loginDataProps} data - The login data object containing user code, organization code, password, device type, and captcha.
   * @returns None
   */
  // const handleLogin = (data) => {
  //   setloader(true);
  //   let formData = new FormData();
  //   formData.append("user_code", data.user_code);
  //   formData.append("organization_code", data.organization_code);
  //   formData.append("password", data.password);
  //   formData.append("auth_code", sha1(REACT_APP_SALT_KEY + data.user_code));
  //   formData.append("device_type", data.device_type.toString());
  //   formData.append("captcha", data.captcha);

  //   loginService(formData)
  //     .then((res) => {
  //       const rememberData = localStorage.getItem("mconnect_user_data");
  //       if (res.data.status === 0) {
  //         getCaptcha();
  //       }
  //       if (res.data.status === 1) {
  //         instance.defaults.baseURL = res.data?.base_url;
  //         setCookie("mconnect_user_data", JSON.stringify(res.data));
  //         dispatch(handleStoreUserData(res.data));
  //         dispatch(handleStoreToken(res.data.token));
  //         navigate("/dashboard");
  //         if (rememberChecked) {
  //           localStorage.setItem("Remember", "1");
  //           localStorage.setItem("mconnect_login_data", JSON.stringify(data));
  //         } else {
  //           localStorage.clear();
  //         }
  //         toast.success(res.data.msg);
  //       } else {
  //         toast.error(res.data.msg);
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error(getCatchMsg(error));
  //     })
  //     .finally(() => {
  //       setloader(false);
  //     });
  // };
  /**
   * useEffect hook that runs once when the component mounts. It retrieves login data from
   * localStorage and sets the corresponding values in the component's state if the data exists.
   * @returns None
   */
  useEffect(() => {
    const rememberData = localStorage.getItem("mconnect_login_data");
    if (rememberData) {
      const parsedData = JSON.parse(rememberData);
      const employeeId = parsedData.user_code;
      const OrganizationCode = parsedData.organization_code;
      const Password = parsedData.password;
      setValues({
        ...values,
        user_code: employeeId,
        organization_code: OrganizationCode,
        password: Password,
      });
      setcheck(true);
    }
  }, []);

  /**
   * Runs the getCaptcha function once when the component is mounted.
   * @returns None
   */
  // useEffect(() => {
  //   getCaptcha();
  // }, []);

  /**
   * Retrieves a captcha from the captcha service and sets it as the current captcha.
   * @returns None
   */
  // const getCaptcha = () => {
  //   setcaptchaloader(true);
  //   captchaService()
  //     .then((response) => {
  //       setCaptcha(response.data.url);
  //     })
  //     .catch((error) => {
  //       toast.error(getCatchMsg(error));
  //     })
  //     .finally(() => {
  //       setcaptchaloader(false);
  //     });
  // };

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

  /**
   * useEffect hook that clears the "otpverification" cookie when the component mounts.
   * @returns None
   */
  useEffect(() => {
    setCookie("otpverification", "");
  }, []);
  return (
    <div className={classes.container1}>
      <p className={classes.SignupCompanyName}>V.T. ENTERPRISE</p>
      {loader ? <Loader /> : null}
      <div className={classes.container2}>
        <div className={`col-lg-5 col-md-6 ${classes.leftcontent}`}>
          <div className={classes.title}>Welcome!</div>
          <div className={classes.desc}>Sign in with your email</div>
          <div>
            <img src={img} alt="login_img"></img>
          </div>
        </div>
        <div
          className={`col-lg-6 offset-lg-1 col-md-6 ${classes.rightcontent}`}
        >
          <div className={classes.inputsection}>
            <TextInputBox
              title="Email"
              value={values.email}
              placeHolder="Enter your email"
              onChangeText={handleChange("email")}
              customInputProps={{
                maxLength: 50,
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt("email", values.user_code);
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("email", true);
                      setFieldError("email", error.message);
                    }
                  }
                },
              }}
              name="email"
              type={"text"}
              requiredText="*"
              errorText={touched.email && errors.email ? errors.email : ""}
            />
          </div>
          <div className={`mb-3 ${classes.inputsection}`}>
            <TextInputBox
              requiredText="*"
              type={"text"}
              isSecure={true}
              placeHolder="Enter your password"
              value={values.password}
              name="password"
              customInputProps={{
                maxLength: 50,
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
              }}
              onChangeText={handleChange("password")}
              title="Password"
              errorText={
                touched.password && errors.password ? errors.password : ""
              }
            />
          </div>

          <div className={classes.forgotpassword}>
            <Link to="forgot_password ">Forgot Password?</Link>
          </div>
          <div className="my-3">
            <CustomButton title="Sign In" onButtonPress={handleSubmit} />
          </div>
          {/* <div style={{ justifyContent: "center", display: "flex" }}>
            <p style={{ marginRight: "10px" }}> Dont’t have an account ?</p>
            <div>
              <Link to="Signup">Sign up</Link>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default Signin;
