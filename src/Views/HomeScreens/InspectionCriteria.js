import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { criteriaListService, listOfProcess } from "../../Services/Services";
import { getCatchMsg } from "../../Utility/GeneralUtils";
import { getTableSNO } from "../../Utility/Constants";
import EditProcess from "../../Modals/EditProcess";

function InspectionCriteria() {
  const token = useToken();
  const userId = useEmployeeId();
  const [page, setPage] = useState(0);
  const [actionStatus, setactionStatus] = useState(null);
  const [loader, setloader] = useState(false);
  const [processList, setProcessList] = useState();
  const [tableListStatus, settableListStatus] = useState(false);
  const [modalProcessStatus, setmodalProcessStatus] = useState({
    data: null,
    status: false,
  });
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
    resetForm,
  } = useFormik({
    initialValues: {
      process: "",
      part_no: "",
      activeItem: "",
    },
    validationSchema: Yup.object({
      part_no: tableListStatus
        ? Yup.string()
        : Yup.string().required("Part number is required").strict(true),
      process: tableListStatus
        ? Yup.string().required("Process is required").strict(true)
        : Yup.string(),
    }),
    onSubmit: () => {
      console.log(tableListStatus, "tableeeeeeee");
      if (tableListStatus) {
        handleGetProcess(1, values);
      } else {
        if (actionStatus) {
          if (values?.process.trim() !== "") {
            setIsShowModal((prev) => {
              return {
                ...prev,
                status: true,
                data: null,
              };
            });
          } else {
            toast.error("Process is required.");
          }
        } else {
          handleListCriteriaService(1, values);
        }
      }
    },
  });

  useEffect(() => {
    if (tableListStatus) {
      handleGetProcess();
      setPage(0);
      resetForm();
    }
  }, [tableListStatus]);

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

  const handleGetProcess = (page = 1, data) => {
    setloader(true);
    let formData = new FormData();
    formData.append("page", page);
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("limit", 10);
    if (data?.process) {
      formData.append("process", data?.process);
    }
    listOfProcess(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          setPage(parseInt(response?.data?.data?.page) - 1);
          setProcessList(response?.data?.data);
        } else if (response?.data?.status === 0) {
          setProcessList(null);
        }
      })
      .catch((err) => {
        getCatchMsg(err);
      })
      .finally(() => {
        setloader(false);
      });
  };

  const getCriteriaList = () => {
    return (
      <>
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
      </>
    );
  };

  const getProcessList = () => {
    return (
      <>
        <thead className={classes.NormalTable}>
          <tr>
            <th>S.No</th>
            <th>Process</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {processList?.items.length > 0 ? (
            processList?.items.map((products, index) => (
              <tr key={index}>
                <td>{getTableSNO(parseInt(processList?.page), 10, index)}</td>
                <td>{products?.process}</td>
                <td>
                  <img
                    src={EditIcon}
                    alt="edit_icon"
                    style={{ width: 20, height: 20, cursor: "pointer" }}
                    onClick={() => {
                      setmodalProcessStatus((prev) => {
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
              <td colSpan={3}>
                <NoDataFound />
              </td>
            </tr>
          )}
        </tbody>
      </>
    );
  };

  return (
    <>
      {loader ? <Loader /> : null}
      <PageHeader
        secondBtn={false}
        modal={() => {
          settableListStatus(!tableListStatus);
          resetForm();
          setPage(0);
          setlistInSpectionCriteria(null);
        }}
        heading={tableListStatus ? "Edit Process" : "Inspection Criteria"}
        Btntitle={
          tableListStatus ? "List of Inspection Criteria" : "Edit Process"
        }
      />

      <GlobalModal
        title={"Edit Process"}
        isOpen={modalProcessStatus.status}
        CustomWidth={500}
        onCancel={() => {
          setmodalProcessStatus((prev) => {
            return {
              ...prev,
              status: false,
            };
          });
        }}
      >
        <EditProcess
          listApiCall={() => handleGetProcess(page + 1)}
          editData={modalProcessStatus?.data}
          modalClose={() => {
            setmodalProcessStatus((prev) => {
              return {
                ...prev,
                status: false,
              };
            });
          }}
        />
      </GlobalModal>

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
            listApiCall={() => handleListCriteriaService(page + 1, values)}
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
          {tableListStatus ? (
            <div className="row">
              <div className={`col-lg-3 col-md-6 ${classes.savedLogsProcess}`}>
                <TextInputBox
                  title="Process"
                  requiredText="*"
                  placeHolder="Enter process"
                  value={values.process}
                  onChangeText={handleChange("process")}
                  name="process"
                  customInputProps={{
                    maxLength: 50,
                  }}
                  type={"text"}
                  errorText={
                    touched.process && errors.process ? errors.process : ""
                  }
                />
              </div>
              <div className="col-lg-2 col-xl-1 col-md-3 col-4 mt-4">
                <CustomButton
                  title="Search "
                  onButtonPress={handleSubmit}
                  customButtonStyle={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                />
              </div>
              <div className="col-lg-2 col-xl-1 col-md-3 col-4 mt-4">
                <CustomButton
                  title="Reset"
                  onButtonPress={() => {
                    handleGetProcess(1);
                    resetForm();
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <TextInputBox
                  title="Part Number"
                  placeHolder="Enter part number"
                  value={values.part_no}
                  onChangeText={handleChange("part_no")}
                  name="part_no"
                  customInputProps={{
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
                    maxLength: 50,
                  }}
                  type={"text"}
                  errorText={
                    touched.process && errors.process ? errors.process : ""
                  }
                />
              </div>
              <div className="col-lg-2 col-xl-1 col-md-3 col-4 mt-4">
                <CustomButton
                  title="Add"
                  onButtonPress={() => {
                    setactionStatus(true);
                    handleSubmit();
                  }}
                />
              </div>
              <div className="col-lg-2 col-xl-1 col-md-3 col-4 mt-4">
                <CustomButton
                  title="Search "
                  onButtonPress={() => {
                    setactionStatus(false);
                    handleSubmit();
                  }}
                  customButtonStyle={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                />
              </div>
            </div>
          )}
          <div style={{ margin: "20px 0" }}>
            <div className={`table-responsive ${classes.Dashboard}`}>
              <table className={classes.listOfTable}>
                {tableListStatus ? getProcessList() : getCriteriaList()}
              </table>
            </div>
          </div>
        </div>
      </div>
      {tableListStatus
        ? processList?.totalPage > 1 && (
            <CustomPagination
              pageCount={processList?.totalPage}
              currentpage={page}
              forcePage={page}
              onPageChange={(val) => {
                handleGetProcess(val + 1);
              }}
            />
          )
        : listInSpectionCriteria?.totalPage > 1 && (
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
