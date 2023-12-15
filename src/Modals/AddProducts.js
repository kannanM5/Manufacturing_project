import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import classes from "./Modal.module.css";
import UpdateDeleteActions from "./UpdateDeleteActions";
import { useFormik } from "formik";
import { useEmployeeId, useToken } from "../Utility/StoreData";
import { CustomButton, Loader, TextInputBox } from "../Components";
import { getCatchMsg, getInvalidMsg } from "../Utility/GeneralUtils";
import { addProductService, editProductService } from "../Services/Services";

const validationSchema = Yup.object({
  part_no: Yup.string().required("Part number is required"),
  part_name: Yup.string().required("Part name is required"),
  customer: Yup.string().required("Customer is required"),
  customer_part_no: Yup.string().required("Customer part number is required"),
  drawing_issue_no: Yup.string().required("Drawing issue number is required"),
});
function AddProducts({
  onClose,
  heading,
  getValue,
  modalClose,
  listApiCall,
  editData,
}) {
  const token = useToken();
  const userId = useEmployeeId();
  // const userType = useEmployeeType();
  // const [page, setPage] = useState(1);
  const [loader, setloader] = useState(false);

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    resetForm,
    setFieldError,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      product_id: editData?.product_id ? editData?.product_id : "" || "",
      part_no: editData?.part_no ? editData?.part_no : "" || "",
      part_name: editData?.part_name ? editData?.part_name : "" || "",
      customer: editData?.customer ? editData?.customer : "" || "",
      customer_part_no: editData?.customer_part_no
        ? editData?.customer_part_no
        : "" || "",
      drawing_issue_no: editData?.drawing_issue_no
        ? editData?.drawing_issue_no
        : "" || "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      if (editData) {
        handleUpdateproduct(values);
      } else {
        handleAddProduct(values);
      }
    },
  });
  const handleAddProduct = (data) => {
    setloader(true);
    const formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("part_no", data?.part_no);
    formData.append("customer_part_no", data?.customer_part_no);
    formData.append("part_name", data?.part_name);
    formData.append("customer", data?.customer);
    formData.append("drawing_issue_no", data?.drawing_issue_no);
    addProductService(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          listApiCall();
          resetForm();
          modalClose();
          toast.success(response?.data?.msg);
        } else if (response?.data?.status === 0) {
          // getInvalidMsg(response?.data?.msg);
          getInvalidMsg(response?.data?.msg);
        }
      })
      .catch((err) => {
        getCatchMsg(err);
      })
      .finally(() => {
        setloader(false);
      });
  };
  const handleUpdateproduct = (data) => {
    setloader(true);
    const formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("part_no", data?.part_no);
    formData.append("part_name", data?.part_name);
    formData.append("customer_part_no", data?.customer_part_no);
    formData.append("customer", data?.customer);
    formData.append("drawing_issue_no", data?.drawing_issue_no);
    formData.append("product_id", data?.product_id);
    editProductService(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          listApiCall();
          resetForm();
          modalClose();
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

  return (
    <>
      {loader ? <Loader /> : null}
      <div className={classes.listOfProducts}>
        <div className="row">
          <div className="col-xl-6 col-md-6 form-group mb-3 col-lg-6 ">
            <TextInputBox
              title="Part Number"
              value={values.part_no}
              onChangeText={handleChange("part_no")}
              name="part_no"
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt("part_no", values.name);
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("part_no", true);
                      setFieldError("part_no", error.message);
                    }
                  }
                },
                maxLength: 50,
              }}
              type={"text"}
              placeHolder="Enter part number"
              requiredText="*"
              errorText={
                touched.part_no && errors.part_no ? errors.part_no : ""
              }
            />
          </div>
          <div className="col-xl-6 col-md-6 form-group mb-3 col-lg-6 ">
            <TextInputBox
              title="Part Name"
              value={values.part_name}
              onChangeText={handleChange("part_name")}
              name="part_name"
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt("part_name", values.name);
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("part_name", true);
                      setFieldError("part_name", error.message);
                    }
                  }
                },
                maxLength: 50,
              }}
              type={"text"}
              placeHolder="Enter part name"
              requiredText="*"
              errorText={
                touched.part_name && errors.part_name ? errors.part_name : ""
              }
            />
          </div>
          <div className="col-xl-6 col-md-6 form-group mb-3 col-lg-6 ">
            <TextInputBox
              title="Customer"
              value={values.customer}
              onChangeText={handleChange("customer")}
              name="customer"
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt("customer", values.name);
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("customer", true);
                      setFieldError("customer", error.message);
                    }
                  }
                },
                maxLength: 50,
              }}
              type={"text"}
              placeHolder="Enter customer"
              requiredText="*"
              errorText={
                touched.customer && errors.customer ? errors.customer : ""
              }
            />
          </div>
          <div className="col-xl-6 col-md-6 form-group mb-3 col-lg-6 ">
            <TextInputBox
              title="Drawing Issue number"
              value={values.drawing_issue_no}
              onChangeText={handleChange("drawing_issue_no")}
              name="drawing_issue_no"
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt("name", values.name);
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("drawing_issue_no", true);
                      setFieldError("drawing_issue_no", error.message);
                    }
                  }
                },
                maxLength: 50,
              }}
              type={"text"}
              placeHolder="Enter drawing issue number"
              requiredText="*"
              errorText={
                touched.drawing_issue_no && errors.drawing_issue_no
                  ? errors.drawing_issue_no
                  : ""
              }
            />
          </div>
          <div className="col-xl-6 col-md-6 form-group mb-3 col-lg-6 ">
            <TextInputBox
              title="Customer Part Number"
              value={values.customer_part_no}
              onChangeText={handleChange("customer_part_no")}
              name="customer_part_no"
              customInputProps={{
                onBlur: () => {
                  try {
                    validationSchema.validateSyncAt(
                      "customer_part_no",
                      values.customer_part_no
                    );
                  } catch (error) {
                    if (error instanceof Error) {
                      setFieldTouched("customer_part_no", true);
                      setFieldError("customer_part_no", error.message);
                    }
                  }
                },
                maxLength: 50,
              }}
              type={"text"}
              placeHolder="Enter customer part number"
              requiredText="*"
              errorText={
                touched.customer_part_no && errors.customer_part_no
                  ? errors.customer_part_no
                  : ""
              }
            />
          </div>
        </div>
        {editData ? (
          <UpdateDeleteActions
            onCancelPress={() => onClose()}
            onUpdatePress={handleSubmit}
          />
        ) : (
          <div className="col-lg-2 col-md-3 col-3  mb-2">
            <CustomButton onButtonPress={handleSubmit} title="Submit" />
          </div>
        )}
      </div>
    </>
  );
}

export default AddProducts;
