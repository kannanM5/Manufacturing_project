import React, { useEffect, useState } from "react";
import PageHeader from "../../ManagementLayoutHeader/PageHeader";
import classes from "../Management.module.css";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import * as Yup from "yup";
import Logo from "../../../Assets/Images/VTLogo.svg";
import { Commondate } from "../../../Components/index";
import LogoutConfirmationModal from "../../../Modals/LogoutConfirmationModal";
import RadiantLogo from "../../../Assets/Icons/SvgIcons/radiant Impex logo.svg";
import { useFormik } from "formik";
import { GlobalModal, Loader } from "../../../Components";
import { useEmployeeId, useToken } from "../../../Utility/StoreData";
import { useLocation, useNavigate } from "react-router-dom";
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
  supplier_name: Yup.string().required("Name is required"),
  invoice_no: Yup.string().required("Name is required"),
  quantity: Yup.string().required("Name is required"),
  // final_status: Yup.number().required("Final status is required"),
});
var CryptoJS = require("crypto-js");

export default function Emptypage({ viewReportData }) {
  const token = useToken();
  const userId = useEmployeeId();
  const location = useLocation();
  const navigate = useNavigate();
  const [urlValues, setUrlValues] = useState();
  const [saveStatus, setsaveStatus] = useState(null);
  const [isFinalStatus, setisFinalstatus] = useState(null);
  const [finalStatusRequired, setFinalStatusRequired] = useState(false);
  const [loader, setloader] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [isShowModal, setIshowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
      checked_by: "",
      approved_by: "",
      process: "",
      invoice_no: "",
      invoice_date: new Date(),
      final_status: null,
      quantity: "",
      datas: "",
      report_id: "",
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

  // useEffect(() => {
  //   if (!isShowModal) {
  //     const beforeUnloadHandler = (event) => {
  //       event.preventDefault();
  //       event.returnValue = true;
  //     };

  //     if (
  //       values.supplier_name === "" ||
  //       values.invoice_no === "" ||
  //       values.quantity === "" ||
  //       values.approved_by === "" ||
  //       values.checked_by === "" ||
  //       values.datas === ""
  //     ) {
  //       window.addEventListener("beforeunload", beforeUnloadHandler);
  //     } else {
  //       window.removeEventListener("beforeunload", beforeUnloadHandler);
  //     }
  //   }
  // }, [values, isShowModal]);

  //view report set data
  useEffect(() => {
    if (!reportData) {
      setReportData(viewReportData);
    }
  }, [viewReportData]);

  // url crypto js get value
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

  // when api call is edit/add
  useEffect(() => {
    if (urlValues) {
      if (urlValues?.buttonStatus === "Edit") {
        handleEditReport();
      } else {
        handleGetProductsList();
      }
    }
  }, [urlValues]);

  const tableHeadData = [
    {
      id: 1,
      left: "Supplier Name :",
      leftData: values?.supplier_name,
      rightData: values?.process,
      right: "Process :",
    },
    {
      id: 2,
      leftData: values?.tableHeadDataApi?.part_no,
      rightData: values?.invoice_no,
      left: "Part No :",
      right: "Inv No :",
    },
    {
      id: "3",
      left: "Drg. Issue No :",
      right: "Inv Date :",
      leftData: values?.tableHeadDataApi?.drawing_issue_no,
      rightData: values?.invoice_date,
    },
    {
      id: 4,
      left: "Part Name :",
      right: "Quantity :",
      leftData: values?.tableHeadDataApi?.part_name,
      rightData: values?.quantity,
    },
  ];

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
  // edit or add api call and get resport data set values in formik
  useEffect(() => {
    if (reportData) {
      let tempData = [...reportData?.processData];
      const getProcess = tempData.map((ele) => ele?.process);
      const processingData = tempData.map((ele) => {
        if (ele?.observationData) {
          return {
            ...ele,
            observation:
              typeof ele?.observation !== "string"
                ? ele?.observation
                : JSON.parse(ele?.observation),
            status: ele?.status ?? null,
            remark: ele?.remark ?? null,
          };
        } else {
          return {
            ...ele,
            observation: ele?.observation
              ? ele?.observation
              : Array(10).fill(null),
            status: ele?.status ?? null,
            remark: ele?.remark ?? null,
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
        report_id: reportData?.productData?.report_id,
        final_status: reportData?.productData?.final_status ?? null,
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
        report_details_id: ele?.report_details_id,
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
      process_id: data?.process_id,
      product_id: data?.product_id,
      invoice_no: data?.invoice_no,
      invoice_date: dayjs(data?.invoice_date).format("YYYY-MM-DD"),
      quantity: data?.quantity,
      observationData: sendData,
      supplier_name: data?.supplier_name,
      report_id: data?.report_id,
      checked_by: data?.checked_by ?? null,
      approved_by: data?.approved_by ?? null,
      final_status: isFinalStatus ? isFinalStatus.toString() : isFinalStatus,
      report_type: urlValues?.pageStatus,
      save: saveStatus,
    };
    updateInspectionReportList(JSON.stringify(finalData))
      .then((res) => {
        if (res?.data?.status === 1) {
          setIshowModal(true);
          // timeOutFunction();
          // toast.success(res?.data?.msg);
          // CloseTab();
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
      process_id: data?.process_id,
      product_id: data?.product_id,
      invoice_no: data?.invoice_no,
      invoice_date: dayjs(data?.invoice_date).format("YYYY-MM-DD"),
      quantity: data?.quantity,
      observationData: sendData,
      supplier_name: data?.supplier_name,
      checked_by: data?.checked_by ?? null,
      approved_by: data?.approved_by ?? null,
      final_status: isFinalStatus ? isFinalStatus.toString() : isFinalStatus,
      report_type: urlValues?.pageStatus,
      save: saveStatus,
    };
    addInspectionReportList(JSON.stringify(finalData))
      .then((res) => {
        if (res?.data?.status === 1) {
          setIshowModal(true);
          // timeOutFunction();
          // toast.success(res?.data?.msg);
          // CloseTab();
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
          : Array(10).fill("");
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

  const getColor = () => {
    const tempData = [...values.datas];
    const getCode = tempData.some((ele) =>
      ele.observation.some((value) => value)
    );
    return getCode;
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
    <div>
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
        heading={"Incoming Inspection Report"}
      />
      <div className={classes.reportInsepection}>
        <div className={`table-responsive ${classes.Dashboard}`}>
          <table>
            <thead>
              <tr>
                <th
                  style={{ padding: "0 5px" }}
                  colSpan={16}
                  className={classes.CompanyName}
                >
                  <div className={classes.rowAlignment}>
                    <img
                      src={Logo}
                      alt="logo"
                      style={{ width: 40, height: 40 }}
                    />
                    <div className={classes.heading}>
                      V.T.ENTERPRISE - RADIEANT IMPEX PVT. LTD.
                    </div>
                    <img
                      src={RadiantLogo}
                      alt="logo"
                      style={{ width: 70, height: 50 }}
                    />
                  </div>
                </th>
                <td colSpan={1} style={{ fontSize: "var(--textXs)" }}>
                  DC.No
                </td>
                <td colSpan={2} style={{ fontSize: "var(--textXs)" }}>
                  VTE/QA/R/01
                </td>
              </tr>

              <tr>
                <td colSpan={16} rowSpan={2}>
                  <div className={classes.heading}>
                    INCOMING INSPECTION REPORT
                  </div>
                </td>
              </tr>
              <td style={{ fontSize: "var(--textXs)", padding: "0 5px" }}>
                REV.No
              </td>
              <td style={{ fontSize: "var(--textXs)", padding: "0 5px" }}>
                00/05/10/2023
              </td>
              {tableHeadData.map((head, index) => (
                <tr key={index} className={classes.fourHeadings}>
                  <th colSpan={3}>{head?.left}</th>
                  <td colSpan={11} className={classes.staticHeading}>
                    {index === 0 ? (
                      <input
                        readOnly={viewReportData ? true : false}
                        style={{
                          border:
                            errors.supplier_name && touched.supplier_name
                              ? "2px solid red"
                              : "",
                        }}
                        maxLength={50}
                        type="text"
                        value={head?.leftData}
                        onChange={(event) => {
                          const text = event.target.value;
                          handleChange("supplier_name")(text);
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
                  </td>
                  <th className={classes.secondRowThirdColumn}>
                    {head?.right}
                  </th>
                  <td colSpan={3} className={classes.staticHeading}>
                    {index === 0 ? (
                      <span
                        style={{
                          paddingLeft: "10px",
                        }}
                      >
                        {head?.rightData}
                      </span>
                    ) : index === 1 ? (
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
                        value={head?.rightData}
                        onChange={(event) => {
                          const text = event.target.value;
                          handleChange("invoice_no")(text);
                        }}
                      />
                    ) : index === 2 ? (
                      <Commondate
                        disabled={viewReportData ? true : false}
                        borderNone={false}
                        onChange={(value) => {
                          setFieldValue("invoice_date", value);
                        }}
                        value={dayjs(values?.invoice_date).format("YYYY-MM-DD")}
                      />
                    ) : (
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
                        value={head?.rightData}
                        onChange={(event) => {
                          const text = event.target.value;
                          handleChange("quantity")(text);
                        }}
                      />
                    )}
                  </td>
                </tr>
              ))}
              <tr className={classes.secondHead}>
                <th
                  colSpan={1}
                  rowSpan={2}
                  className={classes.serialNo}
                  style={{
                    paddingLeft: "0",
                  }}
                >
                  S.No
                </th>
                <th
                  colSpan={2}
                  rowSpan={2}
                  style={{
                    minWidth: "200px",
                    paddingLeft: "0",
                  }}
                >
                  Characteristics
                </th>
                <th
                  colSpan={1}
                  rowSpan={2}
                  style={{
                    minWidth: "110px",
                    paddingLeft: "0",
                  }}
                >
                  Specifications
                </th>
                <th
                  colSpan={1}
                  rowSpan={2}
                  style={{
                    minWidth: "80px",
                    padding: "0",
                  }}
                >
                  Units
                </th>
                <th
                  colSpan={1}
                  rowSpan={2}
                  style={{
                    minWidth: "100px",
                    padding: "0",
                  }}
                >
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
                <th
                  colSpan={1}
                  rowSpan={2}
                  style={{
                    minWidth: "100px",
                    paddingLeft: "0",
                  }}
                >
                  Status
                </th>
                <th
                  colSpan={2}
                  rowSpan={2}
                  style={{
                    paddingLeft: "0",
                  }}
                >
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
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className={classes.tabeleBody} colSpan={2}>
                      {ele?.characteristics}
                    </td>
                    <td className={classes.tabeleBody}>{ele?.specification}</td>
                    <td className={classes.tabeleBody}>{ele?.units}</td>
                    <td className={classes.tabeleBody}>
                      {ele?.method_of_check}
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
                        readOnly={viewReportData ? true : false}
                        className={classes.observationInput}
                        maxLength={20}
                        style={{ textAlign: "center", paddingLeft: "0" }}
                        type="text"
                        value={ele?.status}
                        onChange={(event) => {
                          const text = event.target.value;
                          handleStatusChange(index, text);
                        }}
                      />
                    </td>
                    <td colSpan={2}>
                      <input
                        readOnly={viewReportData ? true : false}
                        className={classes.observationInput}
                        maxLength={20}
                        style={{
                          textAlign: "center",
                          paddingLeft: "0",
                        }}
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
                <td colSpan={18} className={classes.final}>
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
                  colSpan={4}
                >
                  Checked By
                </td>
                <td colSpan={6}>
                  <input
                    readOnly={viewReportData ? true : false}
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
                <td colSpan={6}>
                  <input
                    readOnly={viewReportData ? true : false}
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
  );
}
