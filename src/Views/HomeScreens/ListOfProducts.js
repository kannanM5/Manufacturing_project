import React, { useEffect } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import classes from "./Management.module.css";
import { Box, TableContainer } from "@mui/material";
import { useState } from "react";
import {
  CustomButton,
  CustomPagination,
  Loader,
  TextInputBox,
} from "../../Components";
import EditIcon from "../../Assets/Icons/Svg/edit.svg";
import {
  useEmployeeId,
  useEmployeeType,
  useToken,
} from "../../Utility/StoreData";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ALPHA_NUM, NAMES } from "../../Utility/Constants";
import {
  addProductService,
  editProductService,
  productsList,
} from "../../Services/Services";
import { getCatchMsg } from "../../Utility/GeneralUtils";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  part_no: Yup.string()
    .required("Part number is required")
    .matches(ALPHA_NUM, "Enter valid part number"),
  part_name: Yup.string()
    .matches(ALPHA_NUM, "Enter valid part name")
    .required("Part name is required"),
  customer: Yup.string()
    .matches(ALPHA_NUM, "Enter valid customer")
    .required("Customer is required"),
  customer_part_no: Yup.string()
    .matches(ALPHA_NUM, "Enter valid customer part number")
    .required("Customer part number is required"),
  drawing_issue_no: Yup.string()
    .matches(ALPHA_NUM, "Enter valid drawing issue number")
    .required("Drawing issue number is required"),
});

function ListOfProducts() {
  const token = useToken();
  const userId = useEmployeeId();
  const userType = useEmployeeType();
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [loader, setloader] = useState(false);
  const [addUpdateStatus, setAddUpdateStatus] = useState(false);
  const [listOfProducts, setListOfProducts] = useState();
  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    errors,
    touched,
    resetForm,
    setFieldError,
    setFieldTouched,
    setValues,
  } = useFormik({
    initialValues: {
      product_id: "",
      part_no: "",
      part_name: "",
      customer: "",
      customer_part_no: "",
      drawing_issue_no: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (addUpdateStatus) {
        handleUpdateproduct(values);
      } else {
        handleAddProduct(values);
      }
    },
  });

  useEffect(() => {
    handleGetProductsList();
  }, []);

  const handleAddProduct = (data) => {
    setloader(true);
    const formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("part_no", data?.part_no.trim());
    formData.append("customer_part_no", data?.customer_part_no.trim());
    formData.append("part_name", data?.part_name.trim());
    formData.append("customer", data?.customer.trim());
    formData.append("drawing_issue_no", data?.drawing_issue_no.trim());
    addProductService(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          handleGetProductsList();
          resetForm();
          toast.success(response?.data?.msg);
        } else if (response?.data?.status === 0) {
          toast.error(response?.data?.msg);
        }
      })
      .catch((err) => {
        // getCatchMsg(err);
      })
      .finally(() => {
        setloader(false);
      });
  };

  const handleGetProductsList = (page = 1, data) => {
    setloader(true);
    const formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("limit", 10);
    productsList(page, formData)
      .then((response) => {
        console.log(response?.data, "RESSSSSSSSS");
        if (response?.data?.status === 1) {
          setListOfProducts(response?.data?.data);
          // toast.success(response?.data?.msg);
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
  const handleUpdateproduct = (data) => {
    setloader(true);
    const formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("part_no", data?.part_no.trim());
    formData.append("part_name", data?.part_name.trim());
    formData.append("customer_part_no", data?.customer_part_no.trim());
    formData.append("customer", data?.customer.trim());
    formData.append("drawing_issue_no", data?.drawing_issue_no.trim());
    formData.append("product_id", data?.product_id.trim());
    editProductService(formData)
      .then((response) => {
        console.log(response?.data, "RESSSSSSSSS");
        if (response?.data?.status === 1) {
          handleGetProductsList();
          resetForm();
          setAddUpdateStatus(false);
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
      {" "}
      {loader ? <Loader /> : null}
      <div>
        <PageHeader BtnTrue heading={"List Of Products"} />
        <div className={classes.listOfProducts}>
          <div className="row">
            <div className="col-lg-2">
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
                placeHolder="Enter Part number"
                requiredText="*"
                errorText={
                  touched.part_no && errors.part_no ? errors.part_no : ""
                }
              />
            </div>
            <div className="col-lg-2">
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
                placeHolder="Enter Part name"
                requiredText="*"
                errorText={
                  touched.part_name && errors.part_name ? errors.part_name : ""
                }
              />
            </div>
            <div className="col-lg-2">
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
            <div className="col-lg-2">
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
            <div className="col-lg-2">
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
            <div className="col-lg-1 mt-4">
              <CustomButton
                title={addUpdateStatus ? "Update" : "Add"}
                onButtonPress={handleSubmit}
              />
            </div>
          </div>
          <div className={`table-responsive ${classes.Dashboard}`}>
            <table className={classes.listOfTable}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Part No</th>
                  <th>Part Name</th>
                  <th>Customer</th>
                  <th>Drawing Issue No</th>
                  <th>Customer Part number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listOfProducts?.items.map((products, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{products?.part_no}</td>
                    <td>{products?.part_name}</td>
                    <td>{products?.customer}</td>
                    <td>{products?.drawing_issue_no}</td>
                    <td>{products?.customer_part_no}</td>
                    <td>
                      <img
                        src={EditIcon}
                        alt="edit_icon"
                        style={{ width: 20, height: 20 }}
                        onClick={() => {
                          setAddUpdateStatus(true);
                          setValues({
                            ...values,
                            product_id: products?.product_id,
                            part_name: products?.part_name,
                            customer: products?.customer,
                            customer_part_no: products?.customer_part_no,
                            drawing_issue_no: products?.drawing_issue_no,
                            part_no: products?.part_no,
                          });
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {listOfProducts?.items?.length ? (
        <CustomPagination
          page={page}
          pageCount={listOfProducts?.total_page}
          handleFunction={(selected) => {
            setPage(selected);
            handleGetProductsList(selected);
          }}
        />
      ) : null}
    </>
  );
}

export default ListOfProducts;
