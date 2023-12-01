import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userSignin } from "../../Services/Services";
import { getCatchMsg } from "../../Utility/GeneralUtils";
import {
  handleStoreUserData,
  handleStoreUserToken,
} from "../../Store/Reducers/LoginReducer";
import img from "../../Assets/Images/Svg/loginimg.svg";
// import img from "../../Assets/Images/Png/bolts4.jpg";
import { setCookie } from "../../Store/Storage/Cookie";
import { Loader, TextInputBox, CustomButton } from "../../Components/index";
import classes from "./AuthScreens.module.css";
import { EMAIL_REGEX } from "../../Utility/Constants";
import { useToken } from "../../Utility/StoreData";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(EMAIL_REGEX, "Enter valid email"),
  password: Yup.string().required("Password is required"),
});

function Signin() {
  const token = useToken();
  const { REACT_APP_SALT_KEY } = process.env;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
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
  console.log(token, "CURRENTTOKEN");
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
          dispatch(handleStoreUserToken(response?.data?.data?.token));
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
  const handleEnterLogin = (key) => {
    if (key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={classes.container1}>
      <p className={classes.SignupCompanyName}>V.T. ENTERPRISE</p>
      {loader ? <Loader /> : null}
      <div className={classes.container2}>
        <div className={`col-lg-5 col-md-6 ${classes.leftcontent}`}>
          <div className={classes.title}>Welcome!</div>
          <div className={classes.desc}>Sign in with your email</div>
          <div>
            <img
              src={img}
              alt="login_img"
              style={{ width: "100%", height: "100%" }}
            ></img>
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
              handleKeyPress={(e) => handleEnterLogin(e.key)}
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

          {/* <div className={classes.forgotpassword}>
            <Link to="forgot_password ">Forgot Password?</Link>
          </div> */}
          <div className="my-3">
            <CustomButton title="Sign In" onButtonPress={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signin;
