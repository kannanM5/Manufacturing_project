import React, { useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import { Box, TableContainer } from "@mui/material";
import classes from "./Management.module.css";
import { CustomButton, GlobalModal, TextInputBox } from "../../Components";
import AddInspectionCriteria from "../../Modals/AddInspectionCriteria";
import EditIcon from "../../Assets/Icons/Svg/edit.svg";
import { useEmployeeId, useToken } from "../../Utility/StoreData";
import { addInspectionCriteriaService } from "../../Services/Services";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  part_no: Yup.string()
    .required("Part number is required")
    .trim("Remove leading and trailing spaces")
    .strict(true),
  process: Yup.string()
    .required("Process is required")
    .trim("Remove leading and trailing spaces")
    .strict(true),
});

function InspectionCriteria() {
  const token = useToken();
  const employeeId = useEmployeeId();
  const [isShowModal, setIsShowModal] = useState({
    status: false,
    data: null,
    viewStatus: false,
  });
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
      process: "",
      part_no: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setIsShowModal((prev) => {
        return {
          ...prev,
          status: true,
        };
      });
    },
  });

  const handleAddInspectionCretieria = () => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("user_id");
    formData.append("part_no");
    formData.append("process");
    formData.append("characteristics");
    formData.append("specification");
    formData.append("units");
    addInspectionCriteriaService(formData).then((response) => {
      if (response.data.status === 1) {
      } else if (response.data.status === 0) {
      }
    });
  };
  return (
    <>
      <div>
        <PageHeader heading={"Inspection Criteria"} BtnTrue={true} />
        {isShowModal?.status && (
          <GlobalModal
            size="lg"
            ModalStyle="modalMDMaxWidth"
            isVisible={isShowModal.status}
            setIsVisible={() => {
              setIsShowModal((prev) => {
                return {
                  ...prev,
                  status: true,
                };
              });
            }}
          >
            <AddInspectionCriteria
              getValue={values}
              heading={`${
                isShowModal?.data ? "Edit" : "Add"
              } Insepction Criteria`}
              onClose={() => {
                setIsShowModal((prev) => {
                  return {
                    ...prev,
                    status: false,
                  };
                });
              }}
              modalClose={() => {
                setIsShowModal((prev) => {
                  return {
                    ...prev,
                    status: false,
                  };
                });
              }}
            />
          </GlobalModal>
        )}
        <div className={classes.insepectionCreteria}>
          <div className="row">
            <div className="col-lg-3">
              <TextInputBox
                title="Part No"
                placeHolder="Enter Part No"
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
                requiredText="*"
                errorText={
                  touched.part_no && errors.part_no ? errors.part_no : ""
                }
              />
            </div>
            <div className="col-lg-3">
              <TextInputBox
                title="Process"
                placeHolder="Enter Process"
                value={values.process}
                onChangeText={handleChange("process")}
                name="process"
                customInputProps={{
                  onBlur: () => {
                    try {
                      validationSchema.validateSyncAt("process", values.name);
                    } catch (error) {
                      if (error instanceof Error) {
                        setFieldTouched("process", true);
                        setFieldError("process", error.message);
                      }
                    }
                  },
                  maxLength: 50,
                }}
                type={"text"}
                requiredText="*"
                errorText={
                  touched.process && errors.process ? errors.process : ""
                }
              />
            </div>

            <div className="col-lg-1 mt-4">
              <CustomButton title="Enter " onButtonPress={handleSubmit} />
            </div>
          </div>

          <div className={`table-responsive ${classes.Dashboard}`}>
            <table className={classes.listOfTable}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Characteristics</th>
                  <th>Specifications</th>
                  <th>Units</th>
                  <th>Method Of Check</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>123</td>
                  <td>Bold</td>
                  <td>Ford</td>
                  <td>1</td>
                  <td>
                    <CustomButton
                      onButtonPress={() => {
                        setIsShowModal((prev) => {
                          return {
                            ...prev,
                            status: true,
                            data: 1,
                          };
                        });
                      }}
                      title="Edit"
                      customButtonStyle={{
                        width: "60px",
                        padding: "3px",
                      }}
                    />

                    <img
                      src={EditIcon}
                      alt="edit_icon"
                      style={{ width: 20, height: 20 }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>123</td>
                  <td>Bold</td>
                  <td>Ford</td>
                  <td>1</td>
                  <td>
                    <CustomButton
                      onButtonPress={() => {
                        setIsShowModal((prev) => {
                          return {
                            ...prev,
                            status: true,
                            data: 1,
                          };
                        });
                      }}
                      title="Edit"
                      customButtonStyle={{
                        width: "60px",
                        padding: "3px",
                      }}
                    />{" "}
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>123</td>
                  <td>Bold</td>
                  <td>Ford</td>
                  <td>1</td>
                  <td>
                    <CustomButton
                      onButtonPress={() => {
                        setIsShowModal((prev) => {
                          return {
                            ...prev,
                            status: true,
                            data: 1,
                          };
                        });
                      }}
                      title="Edit"
                      customButtonStyle={{
                        width: "60px",
                        padding: "3px",
                      }}
                    />{" "}
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>123</td>
                  <td>Bold</td>
                  <td>Ford</td>
                  <td>1</td>
                  <td>
                    <CustomButton
                      onButtonPress={() => {
                        setIsShowModal((prev) => {
                          return {
                            ...prev,
                            status: true,
                            data: 1,
                          };
                        });
                      }}
                      title="Edit"
                      customButtonStyle={{
                        width: "60px",
                        padding: "3px",
                      }}
                    />{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default InspectionCriteria;
