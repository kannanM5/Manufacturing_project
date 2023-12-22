import { useState } from "react";
import classes from "./AuthScreens.module.css";
import toast from "react-hot-toast";
import img from "../../Assets/Images/loginimg.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignin } from "../../Services/Services";
import { getCatchMsg } from "../../Utility/GeneralUtils";
import { setCookie } from "../../Store/Storage/Cookie";
import { Loader, TextInputBox, CustomButton } from "../../Components/index";
import { EMAIL_REGEX } from "../../Utility/Constants";
import {
  handleStoreUserData,
  handleStoreUserToken,
} from "../../Store/Reducers/LoginReducer";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(EMAIL_REGEX, "Enter valid email")
    .trim(),
  password: Yup.string().required("Password is required"),
});

function Signin() {
  const dispatch = useDispatch();
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
    formData.append("email", data?.email.trim());
    formData.append("password", data?.password);
    userSignin(formData)
      .then((response) => {
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
      {loader ? <Loader /> : null}
      <p className={classes.SignupCompanyName}>V.T. ENTERPRISE</p>
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
          <div className={`mb-3 ${classes.inputsection}`}>
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
          <div className={`mb-2 ${classes.inputsection}`}>
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

          <div className="my-4">
            <CustomButton title="Sign In" onButtonPress={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signin;
