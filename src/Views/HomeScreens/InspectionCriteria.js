import React, { useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import classes from "./Management.module.css";
import {
  CustomButton,
  GlobalModal,
  Loader,
  TextInputBox,
} from "../../Components";
import AddInspectionCriteria from "../../Modals/AddInspectionCriteria";
import EditIcon from "../../Assets/Icons/SvgIcons/edit.svg";
import NoDataFound from "../../Components/NoDataFound";
import CustomPagination from "../../Components/CustomPagination";
import { useEmployeeId, useToken } from "../../Utility/StoreData";
import { criteriaListService } from "../../Services/Services";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCatchMsg } from "../../Utility/GeneralUtils";
import { getTableSNO } from "../../Utility/Constants";

const validationSchema = Yup.object({
  part_no: Yup.string().required("Part number is required").strict(true),
  process: Yup.string().required("Process is required").strict(true),
});

function InspectionCriteria() {
  const token = useToken();
  const userId = useEmployeeId();
  const [page, setPage] = useState(0);
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
    values,
    errors,
    touched,
    setFieldError,
    setFieldTouched,
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
        if (response?.data?.status === 1) {
          setPage(parseInt(response?.data?.data?.page) - 1);
          setlistInSpectionCriteria(response?.data?.data);
        } else if (response?.data?.status === 0) {
          setlistInSpectionCriteria(null);
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
      <PageHeader heading={"Inspection Criteria"} BtnTrue={true} />
      <div>
        <GlobalModal
          title={`${isShowModal?.data ? "Edit" : "Add"} Insepction Criteria`}
          isOpen={isShowModal.status}
          onCancel={() => {
            setIsShowModal((prev) => {
              return {
                ...prev,
                status: false,
              };
            });
          }}
        >
          <AddInspectionCriteria
            listApiCall={() => handleListCriteriaService(1, values)}
            getValue={values}
            editData={isShowModal?.data}
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

        <div className={classes.insepectionCreteria}>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <TextInputBox
                title="Part Number"
                placeHolder="Enter part number"
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
            <div className={`col-lg-3 col-md-6 ${classes.savedLogsProcess}`}>
              <TextInputBox
                title="Process"
                placeHolder="Enter process"
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

            <div className="col-lg-2 col-xl-1 col-md-3 col-3 mt-4">
              <CustomButton
                title="Enter"
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
            <div className="col-lg-2 col-xl-1 col-md-3 col-3 mt-4">
              <CustomButton
                title="Search "
                onButtonPress={handleSubmit}
                customButtonStyle={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              />
            </div>
          </div>

          <div style={{ margin: "20px 0" }}>
            <div className={`table-responsive ${classes.Dashboard}`}>
              <table className={classes.listOfTable}>
                <thead className={classes.NormalTable}>
                  <tr>
                    <th>S.No</th>
                    <th>Process</th>
                    <th>Characteristics</th>
                    <th>Specifications</th>
                    <th>Units</th>
                    <th>Method Of Check</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listInSpectionCriteria?.items.length > 0 ? (
                    listInSpectionCriteria?.items.map((products, index) => (
                      <tr key={index}>
                        <td>
                          {getTableSNO(
                            parseInt(listInSpectionCriteria?.page),
                            10,
                            index
                          )}
                        </td>
                        <td>{products?.process}</td>
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7}>
                        <NoDataFound />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {listInSpectionCriteria?.totalPage > 1 && (
        <CustomPagination
          pageCount={listInSpectionCriteria?.totalPage}
          currentpage={page}
          forcePage={page}
          onPageChange={(val) => {
            handleListCriteriaService(val + 1, values);
          }}
        />
      )}
    </>
  );
}

export default InspectionCriteria;
