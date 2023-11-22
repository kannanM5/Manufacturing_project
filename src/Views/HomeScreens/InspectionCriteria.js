import React, { useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import classes from "./Management.module.css";
import { CustomButton, GlobalModal, TextInputBox } from "../../Components";
import AddInspectionCriteria from "../../Modals/AddInspectionCriteria";
import EditIcon from "../../Assets/Icons/Svg/edit.svg";
import { useEmployeeId, useToken } from "../../Utility/StoreData";
import { criteriaListService } from "../../Services/Services";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCatchMsg } from "../../Utility/GeneralUtils";

const validationSchema = Yup.object({
  part_no: Yup.string().required("Part number is required").strict(true),
  process: Yup.string().required("Process is required").strict(true),
});

function InspectionCriteria() {
  const token = useToken();
  const userId = useEmployeeId();
  const [loader, setloader] = useState(false);
  const [listInSpectionCriteria, setlistInSpectionCriteria] = useState();

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
      activeItem: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleListCriteriaService(1, values);
    },
  });

  const handleListCriteriaService = (page = 1, data) => {
    setloader(true);
    let formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("limit", 10);
    formData.append("part_no", data?.part_no);
    formData.append("process", data?.process);
    criteriaListService(page, formData)
      .then((response) => {
        console.log(response?.data, "RESSSSSSS");
        if (response?.data?.status === 1) {
          setlistInSpectionCriteria(response?.data?.data);
          // toast.success(response?.data?.msg);
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
      <PageHeader heading={"Inspection Criteria"} BtnTrue={true} />
      <div>
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
              listApiCall={() => handleListCriteriaService(1, values)}
              getValue={values}
              editData={isShowModal?.data}
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
            <div className="col-lg-3 col-md-6">
              <TextInputBox
                title="Part No"
                placeHolder="Enter Part No"
                value={values.part_no}
                onChangeText={handleChange("part_no")}
                name="part_no"
                customInputProps={{
                  onBlur: () => {
                    try {
                      validationSchema.validateSyncAt(
                        "part_no",
                        values.part_no
                      );
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
            <div className="col-lg-3 col-md-6">
              <TextInputBox
                title="Process"
                placeHolder="Enter Process"
                value={values.process}
                onChangeText={handleChange("process")}
                name="process"
                customInputProps={{
                  onBlur: () => {
                    try {
                      validationSchema.validateSyncAt(
                        "process",
                        values.process
                      );
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

            <div className="col-lg-1 col-md-6 col-3 mt-4">
              <CustomButton
                title="Enter "
                onButtonPress={() => {
                  if (values.part_no && values.process) {
                    setIsShowModal((prev) => {
                      return {
                        ...prev,
                        status: true,
                        data: null,
                      };
                    });
                  } else {
                    handleSubmit();
                  }
                }}
              />
            </div>
            <div className="col-lg-1 col-md-6 col-3 mt-4">
              <CustomButton title="Search " onButtonPress={handleSubmit} />
            </div>
          </div>

          <div className={`table-responsive ${classes.Dashboard}`}>
            <table className={classes.listOfTable}>
              <thead className={classes.NormalTable}>
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
                {listInSpectionCriteria?.items.map((products, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{products?.characteristics}</td>
                    <td>{products?.specification}</td>
                    <td>{products?.units}</td>
                    <td>{products?.method_of_check}</td>
                    <td>
                      <img
                        src={EditIcon}
                        alt="edit_icon"
                        style={{ width: 20, height: 20, cursor: "pointer" }}
                        onClick={() => {
                          setIsShowModal((prev) => {
                            return {
                              ...prev,
                              data: products,
                              status: true,
                            };
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
    </>
  );
}

export default InspectionCriteria;
