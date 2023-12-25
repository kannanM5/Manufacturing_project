import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  CustomButton,
  CustomDropDown,
  Loader,
  TextInputBox,
} from "../Components";
import { EMAIL_REGEX } from "../Utility/Constants";
import { userSignUp } from "../Services/Services";
import { getCatchMsg, getInvalidMsg } from "../Utility/GeneralUtils";
import { getCookie } from "../Store/Storage/Cookie";
import { useEmployeeId, useEmployeeType, useToken } from "../Utility/StoreData";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .matches(EMAIL_REGEX, "Invalid email address")
    .required("Email is required"),
  confirm_email: Yup.string()
    .oneOf([Yup.ref("email")], "Emails must match")
    .required("Confirm email is required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  type: Yup.string().required("User type is required"),
});

function AddEmployee({ listApiCall, modalClose }) {
  const token = useToken();
  const userId = useEmployeeId();
  const userType = useEmployeeType();
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
      name: "",
      email: "",
      confirm_email: "",
      password: "",
      confirm_password: "",
      userTypeName: "",
      type: "",
      created_by: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSignup(values);
    },
  });

  const [loader, setloader] = useState(false);
  const Items = [
    {
      key: 2,
      label: "Admin",
    },
    {
      key: 3,
      label: "Line Inspector",
    },
  ];

  const loginUserData = getCookie("vt_enterprise_login")
    ? getCookie("vt_enterprise_login")?.data
    : null;

  const userTypes = loginUserData?.user_type === 1 ? Items : Items.slice(1);

  const handleSignup = (data) => {
    setloader(true);
    let formData = new FormData();
    formData.append("token", token);
    formData.append("id", userId);
    formData.append("created_by", userType);
    formData.append("name", data?.name.trim());
    formData.append("email", data?.email.trim());
    formData.append("password", data?.password.trim());
    formData.append("confirm_password", data?.confirm_password.trim());
    formData.append("user_type", data?.type);
    userSignUp(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          toast.success(response?.data?.msg);
          modalClose();
          listApiCall();
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
      {loader ? <Loader /> : null}

      <div className="row mt-4">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3 ">
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
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
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
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
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
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
          <TextInputBox
            requiredText="*"
            value={values.password}
            isSecure={true}
            onChangeText={handleChange("password")}
            name="password"
            customInputProps={{
              onBlur: () => {
                try {
                  validationSchema.validateSyncAt("password", values.password);
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
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
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
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
          <CustomDropDown
            placeholderText={"user type"}
            requiredText="*"
            items={[...userTypes]}
            value={
              [...userTypes].find((ele) => ele.key === parseInt(values.type))
                ?.label
            }
            title="User Type"
            onSelect={(val) => {
              setFieldValue("type", val);
            }}
            errorText={errors.type && touched.type ? errors?.type : ""}
          />
        </div>
      </div>
      <div className="col-lg-2  col-xl-1 col-md-3 col-3 mb-2">
        <CustomButton title="Submit" onButtonPress={handleSubmit} />
      </div>
    </>
  );
}

export default AddEmployee;
