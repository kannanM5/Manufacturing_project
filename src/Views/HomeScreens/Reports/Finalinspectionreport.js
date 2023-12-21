import React, { useEffect, useState } from "react";
import PageHeader from "../../ManagementLayoutHeader/PageHeader";
import classes from "../Management.module.css";
import Logo from "../../../Assets/Images/VTLogo.svg";
import { Commondate } from "../../../Components/index";
import dayjs from "dayjs";
import * as Yup from "yup";
import toast from "react-hot-toast";
import LogoutConfirmationModal from "../../../Modals/LogoutConfirmationModal";
import { useFormik } from "formik";
import { useEmployeeId, useToken } from "../../../Utility/StoreData";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalModal, Loader } from "../../../Components";
import {
  CloseTab,
  getCatchMsg,
  getInvalidMsg,
  getObserVationColorCode,
} from "../../../Utility/GeneralUtils";
import {
  addInspectionReportList,
  getInspectionReportList,
  savedDataList,
  updateInspectionReportList,
} from "../../../Services/Services";

const validationSchema = Yup.object({
  invoice_no: Yup.string().required("Name is required"),
  quantity: Yup.string().required("Name is required"),
});
var CryptoJS = require("crypto-js");

function FinalInspectionReport({ viewReportData }) {
  const token = useToken();
  const location = useLocation();
  const userId = useEmployeeId();
  const navigate = useNavigate();
  const [saveStatus, setsaveStatus] = useState(null);
  const [isFinalStatus, setisFinalstatus] = useState(null);
  const [loader, setloader] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [urlValues, setUrlValues] = useState();
  const [isShowModal, setIshowModal] = useState(false);
  const {
    values,
    handleChange,
    setFieldValue,
    setValues,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      process_id: "",
      product_id: "",
      part_no: "",
      supplier_name: "",
      report_status: "",
      customer: "",
      checked_by: "",
      approved_by: "",
      process: "",
      invoice_no: "",
      report_id: "",
      invoice_date: new Date(),
      final_status: isFinalStatus,
      quantity: "",
      datas: "",
      tableHeadDataApi: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      if (getColor()) {
        if (urlValues?.buttonStatus === "Edit") {
          handleUpdateReport(values);
        } else {
          handleAddIncomingReport(values);
        }
      } else {
        toast.error("Observation is required");
      }
    },
  });

  // child tab close parent tab is refresh
  useEffect(() => {
    if (!viewReportData) {
      const handleClose = () => {
        window.opener.postMessage("childTabClosed", "*");
      };
      window.addEventListener("beforeunload", handleClose);
      return () => {
        window.removeEventListener("beforeunload", handleClose);
      };
    }
  }, []);

  const getColor = () => {
    const tempData = [...values.datas];
    const getCode = tempData
      .map((ele) => ele?.observation)
      .some((text) => text !== "");
    return getCode;
  };

  useEffect(() => {
    if (!reportData) {
      setReportData(viewReportData);
    }
  }, [viewReportData]);

  useEffect(() => {
    if (!viewReportData) {
      const urlParams = new URLSearchParams(location.search);
      const encryptedData = urlParams.get("data");

      const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, "data");
      const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

      const decryptedData = JSON.parse(decryptedText);
      setUrlValues(decryptedData);
    }
  }, [location.search]);

  useEffect(() => {
    if (reportData) {
      let tempData = [...reportData?.processData];
      const getProcess = tempData.map((ele) => ele?.process);
      // setisFinalstatus(reportData?.productData?.final_status);
      const processingData = tempData.map((ele) => {
        if (ele?.observationData) {
          return {
            ...ele,
            observation: JSON.parse(ele?.observation),
            status: ele?.status ?? "",
            remark: ele?.remark ?? "",
          };
        } else {
          return {
            ...ele,
            observation: ele?.observation
              ? ele?.observation
              : Array(10).fill(null),
            status: ele?.status ?? "",
            remark: ele?.remark ?? "",
          };
        }
      });
      setValues({
        ...values,
        process: getProcess[0],
        product_id: reportData?.productData?.product_id,
        datas: processingData,
        tableHeadDataApi: reportData?.productData,
        supplier_name: reportData?.productData?.supplier_name,
        checked_by: reportData?.productData?.checked_by,
        approved_by: reportData?.productData?.approved_by,
        invoice_date: reportData?.productData?.invoice_date
          ? reportData?.productData?.invoice_date
          : values?.invoice_date,
        invoice_no: reportData?.productData?.invoice_no,
        quantity: reportData?.productData?.quantity,
        process_id: reportData?.productData?.process_id,
        customer: reportData?.productData?.customer,
        report_id: reportData?.productData?.report_id,
      });
    }
  }, [reportData, viewReportData]);
  useEffect(() => {
    if (urlValues) {
      if (urlValues?.buttonStatus === "Edit") {
        handleEditReport();
      } else {
        handleGetProductsList();
      }
    }
  }, [urlValues]);
  const handleEditReport = () => {
    setloader(true);
    let formData = new FormData();
    formData.append("token", token);
    formData.append("part_no", urlValues?.part_no);
    formData.append("process", urlValues?.process);
    formData.append("user_id", userId);
    formData.append("option", 1);
    formData.append("report_type", urlValues?.pageStatus);
    savedDataList(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          setReportData(response?.data?.data);
        } else if (response?.data?.status === 0) {
          CloseTab();
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
  const handleGetProductsList = () => {
    setloader(true);
    const formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("part_no", urlValues?.part_no);
    formData.append("process", urlValues?.process);
    formData.append("report_type", urlValues?.pageStatus);
    formData.append("newTab", 1);
    getInspectionReportList(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          setReportData(response?.data?.data);
        } else if (response?.data?.status === 0) {
          CloseTab();
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

  const handleUpdateReport = (data) => {
    setloader(true);
    const emptyObserveData = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    const observeData = [...data?.datas];
    const sendData = observeData.map((ele) => {
      return {
        report_details_id: ele?.report_details_id,
        process_details_id: ele?.process_details_id,
        status: ele?.status ? ele?.status : null,
        remark: ele?.remark ? ele?.remark : null,
        observationData:
          ele?.observation === ""
            ? emptyObserveData
            : ele?.observation.map((observe) => (observe ? observe : null)),
      };
    });
    const finalData = {
      user_id: userId,
      token: token,
      product_id: data?.product_id,
      process_id: data?.process_id,
      invoice_no: data?.invoice_no,
      invoice_date: dayjs(data?.invoice_date).format("YYYY-MM-DD"),
      quantity: data?.quantity,
      observationData: sendData,
      customer: data?.customer,
      address: "CHENNAI",
      supplier_name: "V.T. ENTERPRISE",
      report_id: data?.report_id,
      checked_by: data?.checked_by ?? null,
      approved_by: data?.approved_by ?? null,
      report_type: urlValues?.pageStatus,
      save: saveStatus,
    };
    updateInspectionReportList(JSON.stringify(finalData))
      .then((res) => {
        if (res?.data?.status === 1) {
          setIshowModal(true);
        } else if (res?.data?.status === 0) {
          if (typeof res?.data?.msg === "object") {
            getInvalidMsg(res?.data?.msg);
          } else {
            toast.error(res?.data?.msg);
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

  const handleAddIncomingReport = (data) => {
    setloader(true);
    const emptyObserveData = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    const observeData = [...data?.datas];
    const sendData = observeData.map((ele) => {
      return {
        process_details_id: ele?.process_details_id,
        status: ele?.status ? ele?.status : null,
        remark: ele?.remark ? ele?.remark : null,
        observationData:
          ele?.observation === ""
            ? emptyObserveData
            : ele?.observation.map((observe) => (observe ? observe : null)),
      };
    });
    const finalData = {
      user_id: userId,
      token: token,
      product_id: data?.product_id,
      process_id: data?.process_id,
      invoice_no: data?.invoice_no,
      invoice_date: dayjs(data?.invoice_date).format("YYYY-MM-DD"),
      quantity: data?.quantity,
      observationData: sendData,
      customer: data?.customer,
      address: "CHENNAI",
      supplier_name: "V.T. ENTERPRISE",
      checked_by: data?.checked_by ?? null,
      approved_by: data?.approved_by ?? null,
      report_type: urlValues?.pageStatus,
      save: saveStatus,
    };
    addInspectionReportList(JSON.stringify(finalData))
      .then((res) => {
        if (res?.data?.status === 1) {
          setIshowModal(true);
        } else if (res?.data?.status === 0) {
          if (typeof res?.data?.msg === "object") {
            getInvalidMsg(res?.data?.msg);
          } else {
            toast.error(res?.data?.msg);
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

  const handleChangeValues = (event, index, inputIndex) => {
    const tempData = [...values.datas];
    const newData = tempData.map((ele, dataIndex) => {
      if (dataIndex === index) {
        const newObservation = Array.isArray(ele.observation)
          ? [...ele.observation]
          : Array(10).fill(""); // Assuming a default value of an empty string for non-array observations
        newObservation[inputIndex] = event;
        return {
          ...ele,
          observation: newObservation,
        };
      }
      return ele;
    });
    setFieldValue("datas", newData);
  };
  const handleStatusChange = (rowIndex, event) => {
    const updatedData = [...values.datas];
    updatedData[rowIndex].status = event;
    handleChange({
      target: {
        name: "datas",
        value: updatedData,
      },
    });
  };
  const handleRemarkChange = (rowIndex, event) => {
    const updatedData = [...values.datas];
    updatedData[rowIndex].remark = event;
    handleChange({
      target: {
        name: "datas",
        value: updatedData,
      },
    });
  };
  return (
    <>
      {loader ? <Loader /> : null}
      <GlobalModal
        CustomWidth={500}
        isOpen={isShowModal}
        closeIcon={false}
        onCancel={() => setIshowModal(false)}
      >
        <LogoutConfirmationModal
          cancelBtn={false}
          positiveButtonText="Ok"
          msg={`Data ${
            urlValues?.buttonStatus === "Add" && saveStatus === 0
              ? "saved successfully"
              : urlValues?.buttonStatus === "Edit" && saveStatus === 0
              ? "updated successfully"
              : "submitted successfully"
          }`}
          secondaryMsg={
            "After clicking the button Tab will be closed automatically"
          }
          onPositiveButtonPressed={() => {
            CloseTab();
            setIshowModal(false);
          }}
        />
      </GlobalModal>
      <div>
        <PageHeader
          Btntitle={
            viewReportData
              ? "Back"
              : urlValues?.buttonStatus === "Edit"
              ? "Update"
              : "Save"
          }
          BtntitleOne={"Finish"}
          secondBtn={viewReportData ? false : true}
          modal={() => {
            //save
            if (!viewReportData) {
              setsaveStatus(0);
              handleSubmit();
            } else {
              navigate(-1);
            }
          }}
          //submit
          onPressOvertime={() => {
            setsaveStatus(1);
            handleSubmit();
          }}
          heading={"Final Inspection Report"}
        />
        <div className={classes.reportInsepection}>
          <div className={`table-responsive ${classes.Dashboard}`}>
            <table>
              <thead>
                <tr>
                  <td style={{ paddingLeft: "5px" }} colSpan={15} rowSpan={2}>
                    <div className={classes.rowAlignment}>
                      <img
                        src={Logo}
                        alt="logo"
                        style={{ width: 40, height: 40 }}
                      />

                      <div className={classes.heading}>
                        FINAL INSPECTION REPORT
                      </div>
                      <div></div>
                    </div>
                  </td>
                  <td style={{ fontSize: "var(--textXs)" }}>DC.No</td>
                  <td style={{ fontSize: "var(--textXs)" }}>VTE/QA/R/04</td>
                </tr>
                <td style={{ fontSize: "var(--textXs)" }}>REV.No</td>
                <td style={{ fontSize: "var(--textXs)" }}>00/05/10/2023</td>
                <tr className={classes.fourHeadings}>
                  <th colSpan={2}>Supplier Name:</th>
                  <th colSpan={11}>V.T. ENTERPRISE</th>
                  <th rowSpan={2}>Customer:</th>
                  <th colSpan={6} rowSpan={2}>
                    {values?.tableHeadDataApi?.customer}
                  </th>
                </tr>
                <tr className={classes.fourHeadings}>
                  <th colSpan={2}>Address:</th>
                  <th colSpan={11}>CHENNAI</th>
                </tr>
                <tr className={classes.fourHeadings}>
                  <th colSpan={2}>Part No:</th>
                  <th colSpan={11}>{values?.tableHeadDataApi?.part_no}</th>
                  <th>Inv No:</th>
                  <th colSpan={5}>
                    <input
                      readOnly={viewReportData ? true : false}
                      style={{
                        border:
                          errors.invoice_no && touched.invoice_no
                            ? "2px solid red"
                            : "",
                      }}
                      maxLength={20}
                      type="text"
                      value={values?.invoice_no}
                      onChange={(event) => {
                        const text = event.target.value;
                        const alphabeticText = text.replace(
                          /[^A-Za-z0-9 ]/g,
                          ""
                        );
                        handleChange("invoice_no")(alphabeticText);
                      }}
                    />
                  </th>
                </tr>
                <tr className={classes.fourHeadings}>
                  <th colSpan={2}>Drg Issue No:</th>
                  <th colSpan={11}>
                    {values?.tableHeadDataApi?.drawing_issue_no}
                  </th>
                  <th>Inv Date:</th>
                  <th colSpan={5} style={{ paddingLeft: "0" }}>
                    <Commondate
                      disabled={viewReportData ? true : false}
                      borderNone={false}
                      onChange={(value) => {
                        setFieldValue("invoice_date", value);
                      }}
                      value={dayjs(values?.invoice_date).format("YYYY-MM-DD")}
                    />
                  </th>
                </tr>
                <tr className={classes.fourHeadings}>
                  <th colSpan={2}>Part Name:</th>
                  <th colSpan={11}>{values?.tableHeadDataApi?.part_name}</th>
                  <th>Quantity:</th>
                  <th colSpan={5}>
                    <input
                      readOnly={viewReportData ? true : false}
                      style={{
                        border:
                          errors.quantity && touched.quantity
                            ? "2px solid red"
                            : "",
                      }}
                      maxLength={20}
                      type="text"
                      value={values?.quantity}
                      onChange={(event) => {
                        const text = event.target.value;
                        const alphabeticText = text.replace(/[^0-9]/g, "");
                        handleChange("quantity")(alphabeticText);
                      }}
                    />
                  </th>
                </tr>
                <tr className={classes.secondHead}>
                  <th colSpan={1} rowSpan={2} className={classes.serialNo}>
                    S.No
                  </th>
                  <th colSpan={1} rowSpan={2}>
                    Characteristics
                  </th>
                  <th colSpan={1} rowSpan={2}>
                    Specifications
                  </th>
                  <th colSpan={1} rowSpan={2}>
                    Units
                  </th>
                  <th colSpan={1} rowSpan={2}>
                    Method Of
                    <br /> Check
                  </th>
                  <th
                    colSpan={10}
                    rowSpan={1}
                    className={classes.secondFourtColumn}
                  >
                    Observations
                  </th>
                  <th colSpan={1} rowSpan={2}>
                    Status
                  </th>
                  <th colSpan={2} rowSpan={2}>
                    Remarks
                  </th>
                </tr>
                <th className={classes.observe}>1</th>
                <th className={classes.observe}>2</th>
                <th className={classes.observe}>3</th>
                <th className={classes.observe}>4</th>
                <th className={classes.observe}>5</th>
                <th className={classes.observe}>6</th>
                <th className={classes.observe}>7</th>
                <th className={classes.observe}>8</th>
                <th className={classes.observe}>9</th>
                <th className={classes.observe}>10</th>
              </thead>
              <tbody>
                {values?.datas &&
                  values?.datas.map((ele, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{ele?.characteristics}</td>
                      <td>{ele?.specification}</td>
                      <td>{ele?.units}</td>
                      <td>{ele?.method_of_check}</td>
                      {ele?.observation.map((inputs, inputIndex) => (
                        <td>
                          <input
                            style={{
                              color: getObserVationColorCode(
                                ele?.specification,
                                inputs
                              ),
                            }}
                            readOnly={viewReportData ? true : false}
                            className={classes.observationInput}
                            maxLength={10}
                            type="text"
                            value={inputs}
                            onChange={(event) => {
                              const text = event.target.value;
                              const alphabeticText = text.replace(
                                /[^A-Za-z0-9 ]/g,
                                ""
                              );
                              handleChangeValues(
                                alphabeticText,
                                index,
                                inputIndex
                              );
                            }}
                          />
                        </td>
                      ))}
                      <td>
                        <input
                          readOnly={viewReportData ? true : false}
                          className={classes.observationInput}
                          maxLength={20}
                          type="text"
                          value={ele?.status}
                          onChange={(event) => {
                            const text = event.target.value;
                            const alphabeticText = text.replace(
                              /[^A-Za-z0-9 ]/g,
                              ""
                            );
                            handleStatusChange(index, alphabeticText);
                          }}
                        />
                      </td>
                      <td colSpan={2}>
                        <input
                          readOnly={viewReportData ? true : false}
                          className={classes.observationInput}
                          maxLength={20}
                          type="text"
                          value={ele?.remark}
                          onChange={(event) => {
                            const text = event.target.value;
                            const alphabeticText = text.replace(
                              /[^A-Za-z0-9 ]/g,
                              ""
                            );
                            handleRemarkChange(index, alphabeticText);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td style={{ fontSize: "var(--textXs)" }} colSpan={4}>
                    Checked By
                  </td>
                  <td colSpan={5}>
                    <input
                      readOnly={viewReportData ? true : false}
                      className={classes.observationInput}
                      maxLength={50}
                      type="text"
                      name="checked_by"
                      value={values?.checked_by}
                      onChange={(event) => {
                        const text = event.target.value;
                        const alphabeticText = text.replace(
                          /[^A-Za-z0-9 ]/g,
                          ""
                        );
                        handleChange("checked_by")(alphabeticText);
                      }}
                    />
                  </td>
                  <td style={{ fontSize: "var(--textXs)" }} colSpan={4}>
                    Approved By
                  </td>
                  <td colSpan={5}>
                    <input
                      readOnly={viewReportData ? true : false}
                      className={classes.observationInput}
                      maxLength={50}
                      type="text"
                      name="approved_by"
                      value={values?.approved_by}
                      onChange={(event) => {
                        const text = event.target.value;
                        const alphabeticText = text.replace(
                          /[^A-Za-z0-9 ]/g,
                          ""
                        );
                        handleChange("approved_by")(alphabeticText);
                      }}
                    />
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

export default FinalInspectionReport;
