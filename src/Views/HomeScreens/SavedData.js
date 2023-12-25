import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import classes from "./Management.module.css";
import {
  CustomButton,
  GlobalModal,
  Loader,
  TextInputBox,
} from "../../Components";
import EditIcon from "../../Assets/Icons/SvgIcons/edit.svg";
import { useEmployeeId, useToken } from "../../Utility/StoreData";
import { deleteSavedLogs, savedDataList } from "../../Services/Services";
import { getCatchMsg, getInvalidMsg } from "../../Utility/GeneralUtils";
import CustomPagination from "../../Components/CustomPagination";
import deleteIcon from "../../Assets/Icons/SvgIcons/delete.svg";
import CustomToolTip from "../../Components/CustomToolTip";
import LogoutConfirmationModal from "../../Modals/LogoutConfirmationModal";
import NoDataFound from "../../Components/NoDataFound";

const validationSchema = Yup.object({
  part_no: Yup.string().required("Part number is required").strict(true),
  process: Yup.string().required("Process is required").strict(true),
});
var CryptoJS = require("crypto-js");

function SavedData() {
  const { state } = useLocation();
  const token = useToken();
  const userId = useEmployeeId();
  const [pageNo, setpageNo] = useState(1);
  const [loader, setloader] = useState(false);
  const [deleteModal, setdeleteModal] = useState({
    modal: false,
    data: "",
  });
  const [listInSpectionCriteria, setlistInSpectionCriteria] = useState();

  const {
    handleSubmit,
    handleChange,
    setFieldValue,
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
    validationSchema: validationSchema,
    onSubmit: () => {
      handleListCriteriaService(values);
    },
  });

  const getReportType = (type) => {
    if (parseInt(type) === 1) {
      return "Incoming Inspection Report";
    } else if (parseInt(type) === 2) {
      return "Setting Approval Report";
    } else if (parseInt(type) === 3) {
      return "Line Inspection Report";
    } else {
      return "'Final Inspection Report";
    }
  };

  const dropDownItem = [
    {
      key: 1,
      label: "Incoming Inspection Report",
      path: "/#/incoming_inspection_report",
    },
    {
      key: 2,
      label: "Setting Approval Report",
      path: "/#/setting_approval_report",
    },
    {
      key: 3,
      label: "Line Inspection Report",
      path: "/#/line_inspection_report",
    },
    {
      key: 4,
      label: "Final Inspection Report",
      path: "/#/final_inspection_report",
    },
  ];

  const sendData = (data) => {
    resetForm();
    var encrypted = CryptoJS.AES.encrypt(
      JSON.stringify({
        part_no: data?.part_no,
        process: data?.process,
        pageStatus: data?.report_type,
        buttonStatus: "Edit",
      }),
      "data"
    ).toString();
    return encrypted;
  };

  const handleClick = (data) => {
    const getDetails = dropDownItem.find(
      (ele) => ele.key === parseInt(data.report_type)
    );
    if (getDetails) {
      const encryptedData = sendData(data);
      const newTab = window.open(getDetails.path, "_blank");
      if (newTab) {
        newTab.location.href = `${getDetails.path}?data=${encodeURIComponent(
          encryptedData
        )}`;
      }
    }
  };

  const handleListCriteriaService = (data) => {
    setloader(true);
    let formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("part_no", data?.part_no);
    formData.append("process", data?.process);
    formData.append("option", 0);
    savedDataList(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          setlistInSpectionCriteria(response?.data?.data);
        } else if (response?.data?.status === 0) {
          if (Array.isArray(response?.data?.msg)) {
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

  const listSavedDataApiCall = (page = pageNo, limit = 10) => {
    setloader(true);
    let formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("option", 3);
    formData.append("page", page);
    formData.append("limit", limit);
    savedDataList(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          setpageNo(parseInt(response?.data?.data?.page) - 1);
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

  useEffect(() => {
    if (token) {
      listSavedDataApiCall();
    }
  }, [token]);

  useEffect(() => {
    if (state && token) {
      handleListCriteriaService(state);
      setFieldValue("part_no", state?.part_no);
      setFieldValue("process", state?.process);
    }
  }, [state, token]);

  const handleDeleteReportData = () => {
    setloader(true);
    let formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("part_no", deleteModal?.data?.part_no);
    formData.append("process", deleteModal?.data?.process);
    formData.append("report_type", deleteModal?.data?.report_type);
    deleteSavedLogs(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          listSavedDataApiCall(1, 10);
          toast.success(response?.data?.msg);
          // setlistInSpectionCriteria(response?.data);
        } else if (response?.data?.status === 0) {
          if (Array.isArray(response?.data?.msg)) {
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
        setdeleteModal((prev) => {
          return {
            ...prev,
            data: null,
            modal: false,
          };
        });
      });
  };

  //child tab is close parent is refresh function
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === "childTabClosed") {
        window.location.reload();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      {loader ? <Loader /> : null}
      <PageHeader heading={"Saved Logs"} BtnTrue={true} />
      <GlobalModal
        CustomWidth={500}
        isOpen={deleteModal.modal}
        onCancel={() => {
          setdeleteModal((prev) => {
            return {
              ...prev,
              modal: false,
            };
          });
        }}
      >
        <LogoutConfirmationModal
          msg={"Are you sure do you want to Delete."}
          positiveButtonText="Delete"
          onPositiveButtonPressed={handleDeleteReportData}
          onNegativeButtonPressed={() => {
            setdeleteModal((prev) => {
              return {
                ...prev,
                modal: false,
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
                    validationSchema.validateSyncAt("part_no", values.part_no);
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
                    validationSchema.validateSyncAt("process", values.process);
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
            <CustomButton title="Search" onButtonPress={handleSubmit} />
          </div>
        </div>

        <div style={{ margin: "20px 0" }}>
          <div className={`table-responsive ${classes.Dashboard}`}>
            <table className={classes.listOfTable}>
              <thead className={classes.NormalTable}>
                <tr>
                  <th>S.No</th>
                  <th>Part No</th>
                  <th>Process</th>
                  <th>Report Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listInSpectionCriteria?.items.length > 0 ? (
                  listInSpectionCriteria?.items.map((products, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{products?.part_no}</td>
                      <td>{products?.process}</td>
                      <td>{getReportType(products?.report_type)}</td>
                      <td>
                        <div className={classes.icons}>
                          <CustomToolTip title={"Edit"}>
                            <img
                              src={EditIcon}
                              alt="edit_icon"
                              onClick={() => handleClick(products)}
                            />
                          </CustomToolTip>
                          <CustomToolTip title={"Delete"}>
                            <img
                              src={deleteIcon}
                              alt="delete"
                              onClick={() =>
                                setdeleteModal((prev) => {
                                  return {
                                    ...prev,
                                    data: products,
                                    modal: true,
                                  };
                                })
                              }
                            />
                          </CustomToolTip>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <NoDataFound />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {listInSpectionCriteria?.totalPage > 1 && (
        <CustomPagination
          defaultCurrent={1}
          showSizeChanger={true}
          totalCount={listInSpectionCriteria?.totalCount}
          onChange={(page) => {
            listSavedDataApiCall(page + 1, 10);
          }}
          onShowSizeChange={(current, pageSize) => {
            console.log(current, pageSize);
          }}
        />
      )}
    </>
  );
}

export default SavedData;
