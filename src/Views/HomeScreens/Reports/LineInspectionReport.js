import React, { useEffect, useState } from "react";
import PageHeader from "../../ManagementLayoutHeader/PageHeader";
import classes from "../Management.module.css";
import LogoutConfirmationModal from "../../../Modals/LogoutConfirmationModal";
import RadiantLogo from "../../../Assets/Icons/SvgIcons/radiant Impex logo.svg";
import Logo from "../../../Assets/Images/VTLogo.svg";
import { Commondate } from "../../../Components/index";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEmployeeId, useToken } from "../../../Utility/StoreData";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalModal, Loader } from "..//../../Components";
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
  mvc_no: Yup.string().required("Machine number is required"),
  operator_name: Yup.string().required("Operator name is required"),
  report_shift: Yup.string().required("Shift is required"),
  inspector_name: Yup.string().required("Name is required"),
});
var CryptoJS = require("crypto-js");

function LineInspectionReport({ viewReportData }) {
  const token = useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const [urlValues, setUrlValues] = useState();
  const userId = useEmployeeId();
  const [finalStatusRequired, setFinalStatusRequired] = useState(false);
  const [isFinalStatus, setisFinalstatus] = useState(null);
  const [loader, setloader] = useState(false);
  const [saveStatus, setsaveStatus] = useState(null);
  const [reportData, setReportData] = useState(null);
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
      mvc_no: "",
      report_shift: "",
      operator_name: "",
      supplier_name: "",
      report_status: "",
      checked_by: "",
      approved_by: "",
      process: "",
      invoice_no: "",
      inspector_name: "",
      report_header_status: null,
      report_header_date: new Date(),
      final_status: null,
      quantity: "",
      report_id: "",
      datas: "",
      tableHeadDataApi: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      if (getColor()) {
        const final =
          parseInt(isFinalStatus) === 0 || parseInt(isFinalStatus) === 1
            ? parseInt(isFinalStatus)
            : null;
        if (urlValues?.buttonStatus === "Edit") {
          if (saveStatus === 1 && final !== 0 && final !== 1) {
            toast.error("Final status is required");
          } else {
            handleUpdateReport(values);
          }
        } else {
          if (saveStatus === 1 && !finalStatusRequired) {
            toast.error("Final status is required");
          } else {
            handleAddIncomingReport(values);
          }
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
  const tableHeadData = [
    {
      id: 1,
      left: "M/C No:",
      right: "Operator Name:",
      leftData: values?.mvc_no,
      rightData: values?.operator_name,
    },
    {
      id: 2,
      left: "Part No:",
      right: "Date:",
      leftData: values?.tableHeadDataApi?.part_no,
      rightData: values?.report_header_date,
    },
    {
      id: "3",
      left: "Part Name:",
      right: "Shift:",
      leftData: values?.tableHeadDataApi?.part_name,
      rightData: values?.report_shift,
    },
    {
      id: "4",
      left: "Process:",
      right: "Inspector Name:",
      leftData: values?.process,
      rightData: values?.inspector_name,
    },
  ];
  const getColor = () => {
    const tempData = [...values.datas];
    const getCode = tempData.some((ele) =>
      ele.observation.some((value) => value)
    );
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

  useEffect(() => {
    if (reportData) {
      let tempData = [...reportData?.processData];
      const getProcess = tempData.map((ele) => ele?.process);
      const processingData = tempData.map((ele) => {
        if (ele?.observationData) {
          return {
            ...ele,
            observation: JSON.parse(ele?.observation),
            first_half: ele?.first_half ?? null,
            last_half: ele?.last_half ?? null,
            remark: ele?.remark ?? null,
          };
        } else {
          return {
            ...ele,
            observation: ele?.observation
              ? ele?.observation
              : Array(8).fill(null),
            first_half: ele?.first_half ?? null,
            last_half: ele?.last_half ?? null,
            remark: ele?.remark ?? null,
          };
        }
      });
      setValues({
        ...values,
        process: getProcess[0],
        mvc_no: reportData?.productData?.mvc_no,
        operator_name: reportData?.productData?.operator_name,
        report_shift: reportData?.productData?.report_shift,
        inspector_name: reportData?.productData?.inspector_name,
        product_id: reportData?.productData?.product_id,
        datas: processingData,
        tableHeadDataApi: reportData?.productData,
        supplier_name: reportData?.productData?.supplier_name,
        checked_by: reportData?.productData?.checked_by,
        approved_by: reportData?.productData?.approved_by,
        report_header_date: reportData?.productData?.report_header_date
          ? reportData?.productData?.report_header_date
          : values?.report_header_date,
        invoice_no: reportData?.productData?.invoice_no,
        quantity: reportData?.productData?.quantity,
        process_id: reportData?.productData?.process_id,
        report_id: reportData?.productData?.report_id,
        final_status: reportData?.productData?.final_status ?? null,
        report_header_status:
          reportData?.productData?.report_header_status ?? Array(8).fill(null),
      });
      setisFinalstatus(reportData?.productData?.final_status ?? null);
      const temp = reportData?.productData?.final_status;
      if (parseInt(temp) === 1 || parseInt(temp) === 0) {
        setFinalStatusRequired(false);
      }
    }
  }, [reportData]);

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
    const emptyObserveData = [null, null, null, null, null, null, null, null];
    const observeData = [...data?.datas];
    const sendData = observeData.map((ele) => {
      return {
        process_details_id: ele?.process_details_id,
        report_details_id: ele?.report_details_id,
        last_half: ele?.last_half ? ele?.last_half : null,
        first_half: ele?.first_half ? ele?.first_half : null,
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
      mvc_no: data?.mvc_no,
      process_id: data?.process_id,
      operator_name: data?.operator_name,
      product_id: data?.product_id,
      report_shift: data?.report_shift,
      invoice_no: data?.invoice_no,
      report_header_date: dayjs(data?.report_header_date).format("YYYY-MM-DD"),
      observationData: sendData,
      report_id: data?.report_id,
      report_header_status: data?.report_header_status,
      checked_by: data?.checked_by ?? null,
      approved_by: data?.approved_by ?? null,
      inspector_name: data?.inspector_name,
      final_status: isFinalStatus ? isFinalStatus.toString() : isFinalStatus,
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
    const emptyObserveData = [null, null, null, null, null, null, null, null];
    const observeData = [...data?.datas];
    const sendData = observeData.map((ele) => {
      return {
        process_details_id: ele?.process_details_id,
        last_half: ele?.last_half ? ele?.last_half : null,
        first_half: ele?.first_half ? ele?.first_half : null,
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
      mvc_no: data?.mvc_no,
      process_id: data?.process_id,
      operator_name: data?.operator_name,
      product_id: data?.product_id,
      report_shift: data?.report_shift,
      invoice_no: data?.invoice_no,
      report_header_date: dayjs(data?.report_header_date).format("YYYY-MM-DD"),
      observationData: sendData,
      report_header_status: data?.report_header_status,
      checked_by: data?.checked_by ?? null,
      approved_by: data?.approved_by ?? null,
      inspector_name: data?.inspector_name,
      final_status: isFinalStatus ? isFinalStatus.toString() : isFinalStatus,
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
          : Array(8).fill("");
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
  const handleFirstOfChange = (rowIndex, event) => {
    const updatedData = [...values.datas];
    updatedData[rowIndex].first_half = event;
    handleChange({
      target: {
        name: "datas",
        value: updatedData,
      },
    });
  };

  const handleLastOfChange = (rowIndex, event) => {
    const updatedData = [...values.datas];
    updatedData[rowIndex].last_half = event;
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
  const handleChangeStatus = (event, index) => {
    const newData = [...values?.report_header_status];
    newData[index] = event;
    setFieldValue("report_header_status", newData);
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
          heading={"Line Inspection Report"}
        />
        <div className={classes.reportInsepection}>
          <div className={`table-responsive ${classes.Dashboard}`}>
            <table>
              <thead>
                <tr>
                  <th
                    style={{ paddingLeft: "5px" }}
                    colSpan={14}
                    className={classes.CompanyName}
                  >
                    <div className={classes.rowAlignment}>
                      <div>
                        <img
                          src={Logo}
                          alt="logo"
                          style={{ width: 40, height: 40 }}
                        />
                      </div>
                      <div className={classes.heading}>
                        V.T.ENTERPRISE - RADIEANT IMPEX PVT. LTD.
                      </div>
                      <div>
                        <img
                          src={RadiantLogo}
                          alt="logo"
                          style={{ width: 70, height: 50 }}
                        />
                      </div>
                    </div>
                  </th>
                  <td colSpan={1} style={{ fontSize: "var(--textXs)" }}>
                    DC.No
                  </td>
                  <td
                    colSpan={1}
                    style={{ fontSize: "var(--textXs)", padding: "0 5px" }}
                  >
                    VTE/QA/R/03
                  </td>
                </tr>
                <tr>
                  <td colSpan={14} rowSpan={2}>
                    <div className={classes.heading}>
                      LINE INSPECTION REPORT
                    </div>
                  </td>
                </tr>
                <td style={{ fontSize: "var(--textXs)" }}>REV.No</td>
                <td style={{ fontSize: "var(--textXs)", padding: "0 5px" }}>
                  00/05/10/2023
                </td>
                {tableHeadData.map((head, index) => (
                  <tr key={index} className={classes.fourHeadings}>
                    <th colSpan={2}>{head?.left}</th>
                    <th
                      colSpan={10}
                      style={{
                        paddingLeft: "0",
                      }}
                    >
                      {index === 0 ? (
                        <input
                          readOnly={viewReportData ? true : false}
                          style={{
                            border:
                              errors.mvc_no && touched.mvc_no
                                ? "2px solid red"
                                : "",
                            paddingLeft: "10px",
                          }}
                          maxLength={50}
                          type="text"
                          value={head?.leftData}
                          onChange={(event) => {
                            const text = event.target.value;
                            handleChange("mvc_no")(text);
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            paddingLeft: "10px",
                          }}
                        >
                          {head?.leftData}
                        </span>
                      )}
                    </th>
                    <th colSpan={2}>{head?.right}</th>
                    <th colSpan={4} style={{ paddingLeft: "0" }}>
                      {index === 0 ? (
                        <input
                          readOnly={viewReportData ? true : false}
                          style={{
                            paddingLeft: "10px",
                            border:
                              errors.operator_name && touched.operator_name
                                ? "2px solid red"
                                : "",
                          }}
                          maxLength={20}
                          type="text"
                          value={head?.rightData}
                          onChange={(event) => {
                            const text = event.target.value;
                            handleChange("operator_name")(text);
                          }}
                        />
                      ) : index === 1 ? (
                        <Commondate
                          disabled={viewReportData ? true : false}
                          borderNone={false}
                          onChange={(value) => {
                            setFieldValue("report_header_date", value);
                          }}
                          value={dayjs(values?.report_header_date).format(
                            "YYYY-MM-DD"
                          )}
                        />
                      ) : index === 2 ? (
                        <input
                          readOnly={viewReportData ? true : false}
                          style={{
                            paddingLeft: "10px",
                            border:
                              errors.report_shift && touched.report_shift
                                ? "2px solid red"
                                : "",
                          }}
                          maxLength={20}
                          type="text"
                          value={head?.rightData}
                          onChange={(event) => {
                            const text = event.target.value;
                            handleChange("report_shift")(text);
                          }}
                        />
                      ) : (
                        <input
                          readOnly={viewReportData ? true : false}
                          style={{
                            paddingLeft: "10px",
                            border:
                              errors.inspector_name && touched.inspector_name
                                ? "2px solid red"
                                : "",
                          }}
                          maxLength={20}
                          type="text"
                          value={head?.rightData}
                          onChange={(event) => {
                            const text = event.target.value;
                            handleChange("inspector_name")(text);
                          }}
                        />
                      )}
                    </th>
                  </tr>
                ))}
                <tr className={classes.secondHead}>
                  <th
                    rowSpan={2}
                    className={classes.serialNo}
                    style={{ paddingLeft: "0" }}
                  >
                    S.No
                  </th>
                  <th
                    style={{ paddingLeft: "0", minWidth: "200px" }}
                    rowSpan={2}
                  >
                    Characteristics
                  </th>
                  <th
                    style={{ paddingLeft: "0", minWidth: "110px" }}
                    colSpan={1}
                    rowSpan={2}
                  >
                    Specifications
                  </th>
                  <th
                    style={{ paddingLeft: "0", minWidth: "80px" }}
                    rowSpan={2}
                  >
                    Units
                  </th>
                  <th
                    colSpan={1}
                    style={{ paddingLeft: "0", minWidth: "100px" }}
                    rowSpan={2}
                  >
                    Method Of
                    <br /> Check
                  </th>
                  <th
                    colSpan={10}
                    rowSpan={1}
                    className={classes.secondFourtColumn}
                    style={{ paddingLeft: "0" }}
                  >
                    Observations
                  </th>
                  <th colSpan={1} rowSpan={2} style={{ paddingLeft: "0" }}>
                    Remarks
                  </th>
                </tr>
                <th className={classes.observe}>First Off</th>
                <th className={classes.observe}>1</th>
                <th className={classes.observe}>2</th>
                <th className={classes.observe}>3</th>
                <th className={classes.observe}>4</th>
                <th className={classes.observe}>5</th>
                <th className={classes.observe}>6</th>
                <th className={classes.observe}>7</th>
                <th className={classes.observe}>8</th>
                <th className={classes.observe}>Last Off</th>
              </thead>
              <tbody>
                {values?.datas &&
                  values?.datas.map((ele, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className={classes.tabeleBody}>
                        {ele?.characteristics}
                      </td>
                      <td className={classes.tabeleBody}>
                        {ele?.specification}
                      </td>
                      <td className={classes.tabeleBody}>{ele?.units}</td>
                      <td className={classes.tabeleBody}>
                        {ele?.method_of_check}
                      </td>
                      <td>
                        <input
                          style={{
                            color: getObserVationColorCode(
                              ele?.specification,
                              ele?.first_half
                            ),
                          }}
                          readOnly={viewReportData ? true : false}
                          className={classes.observationInput}
                          maxLength={20}
                          type="text"
                          value={ele?.first_half}
                          onChange={(event) => {
                            const text = event.target.value;
                            handleFirstOfChange(index, text);
                          }}
                        />
                      </td>
                      {ele?.observation.map((inputs, inputIndex) => (
                        <td key={inputIndex}>
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

                              handleChangeValues(text, index, inputIndex);
                            }}
                          />
                        </td>
                      ))}
                      <td>
                        <input
                          style={{
                            color: getObserVationColorCode(
                              ele?.specification,
                              ele?.last_half
                            ),
                          }}
                          readOnly={viewReportData ? true : false}
                          className={classes.observationInput}
                          maxLength={20}
                          type="text"
                          value={ele?.last_half}
                          onChange={(event) => {
                            const text = event.target.value;
                            handleLastOfChange(index, text);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          readOnly={viewReportData ? true : false}
                          className={classes.observationInput}
                          maxLength={20}
                          type="text"
                          value={ele?.remark}
                          onChange={(event) => {
                            const text = event.target.value;
                            handleRemarkChange(index, text);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "0 15px",
                      fontFamily: "var(--fontSemibold)",
                    }}
                    colSpan={6}
                  >
                    Status
                  </td>
                  {values?.report_header_status &&
                    values?.report_header_status.map((ele, index) => (
                      <td key={index}>
                        <input
                          readOnly={viewReportData ? true : false}
                          className={classes.observationInput}
                          maxLength={10}
                          type="text"
                          value={ele}
                          onChange={(event) => {
                            const text = event.target.value;
                            handleChangeStatus(text, index);
                          }}
                        />
                      </td>
                    ))}
                  <td></td>
                  <td colSpan={1}></td>
                </tr>
                <tr>
                  <td colSpan={16} className={classes.final}>
                    <div className={classes.finalStatus}>
                      <p style={{ fontFamily: "var(--fontSemibold)" }}>
                        Final Status
                      </p>
                      <div className={classes.checkBoxContainer}>
                        <input
                          disabled={viewReportData ? true : false}
                          className={classes.checkBox}
                          type="checkbox"
                          onClick={() => {
                            setisFinalstatus(1);
                            setFinalStatusRequired(true);
                            setFieldValue("final_status", 1);
                          }}
                          checked={parseInt(isFinalStatus) === 1 ? true : false}
                        />
                        <p>Accepted</p>
                      </div>
                      <div className={classes.checkBoxContainer}>
                        <input
                          disabled={viewReportData ? true : false}
                          className={classes.checkBox}
                          type="checkbox"
                          checked={parseInt(isFinalStatus) === 0 ? true : false}
                          onClick={() => {
                            setisFinalstatus(0);
                            setFinalStatusRequired(true);
                            setFieldValue("final_status", 0);
                          }}
                        />
                        <p>Rejected</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "right",
                    }}
                    className={classes.checkedBy}
                    colSpan={3}
                  >
                    Checked By
                  </td>
                  <td colSpan={6}>
                    <input
                      className={classes.observationInput}
                      maxLength={50}
                      type="text"
                      name="checked_by"
                      value={values?.checked_by}
                      onChange={(event) => {
                        const text = event.target.value;
                        handleChange("checked_by")(text);
                      }}
                    />
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                    }}
                    className={classes.checkedBy}
                    colSpan={2}
                  >
                    Approved By
                  </td>
                  <td colSpan={5}>
                    <input
                      className={classes.observationInput}
                      maxLength={50}
                      type="text"
                      name="approved_by"
                      value={values?.approved_by}
                      onChange={(event) => {
                        const text = event.target.value;
                        handleChange("approved_by")(text);
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

export default LineInspectionReport;
