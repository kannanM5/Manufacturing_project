import React, { useEffect, useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import classes from "./Management.module.css";
import {
  addInspectionReportList,
  editInspectionReportList,
  getInspectionReportList,
} from "../../Services/Services";
import { useEmployeeId, useToken } from "../../Utility/StoreData";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { getCatchMsg, getInvalidMsg } from "../../Utility/GeneralUtils";
import { useFormik } from "formik";
import Logo from "../../Assets/Images/Png/VTLogo.jpg";

import Commondate from "../../Components/Commondate";
import dayjs from "dayjs";
var CryptoJS = require("crypto-js");

function FinalInspectionReport() {
  const token = useToken();
  const location = useLocation();
  const userId = useEmployeeId();
  const [isFinalStatus, setisFinalstatus] = useState(null);
  const [loader, setloader] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [urlValues, setUrlValues] = useState();
  const { values, handleChange, setFieldValue, setValues } = useFormik({
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
      invoice_date: new Date(),
      final_status: isFinalStatus,
      quantity: "",
      datas: "",
      tableHeadDataApi: "",
    },
  });
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const encryptedData = urlParams.get("data");

    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, "data");
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

    const decryptedData = JSON.parse(decryptedText);
    setUrlValues(decryptedData);
  }, [location.search]);
  useEffect(() => {
    if (reportData) {
      let tempData = [...reportData?.processData];
      const getProcess = tempData.map((ele) => ele?.process);
      // setisFinalstatus(reportData?.productData?.final_status);
      const processingData = tempData.map((ele) => {
        if (ele?.observation) {
          return {
            ...ele,
            observation: JSON.parse(ele?.observation),
          };
        } else {
          return {
            ...ele,
            observation: ele?.observation ? ele?.observation : "",
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
      });
    }
  }, [reportData]);
  useEffect(() => {
    if (urlValues) {
      if (urlValues?.buttonStatus == "Edit") {
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
    formData.append("report_type", urlValues?.pageStatus);
    editInspectionReportList(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          setReportData(response?.data?.data);
          toast.success(response?.data?.msg);
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
  const handleAddIncomingReport = (data, saveStatus) => {
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
          ele?.observation == ""
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
      invoice_date: data?.invoice_date,
      quantity: data?.quantity,
      observationData: sendData,
      customer: data?.customer,
      address: "CHENNAI",
      supplier_name: "V.T. ENTERPRISE",
      checked_by: data?.checked_by,
      approved_by: data?.approved_by,
      report_type: urlValues?.pageStatus,
      save: saveStatus,
    };
    addInspectionReportList(finalData)
      .then((res) => {
        if (res?.data?.status === 1) {
          toast.success(res?.data?.msg);
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
        const dyummy = (newObservation[inputIndex] = event.target.value);
        newObservation[inputIndex] = event.target.value;
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
    updatedData[rowIndex].status = event.target.value;
    handleChange({
      target: {
        name: "datas",
        value: updatedData,
      },
    });
  };
  const handleRemarkChange = (rowIndex, event) => {
    const updatedData = [...values.datas];
    updatedData[rowIndex].remark = event.target.value;
    handleChange({
      target: {
        name: "datas",
        value: updatedData,
      },
    });
  };
  return (
    <>
      <div>
        <PageHeader
          Btntitle={"Save"}
          BtntitleOne={"Finish"}
          modal={() => handleAddIncomingReport(values, 0)}
          onPressOvertime={() => handleAddIncomingReport(values, 1)}
          heading={"Final inscepection Report"}
        />
        <div className={classes.reportInsepection}>
          <div className={`table-responsive ${classes.Dashboard}`}>
            <table>
              <thead>
                <tr>
                  <td colSpan={15} rowSpan={2}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          paddingLeft: "10px",
                        }}
                      >
                        <img
                          src={Logo}
                          alt="logo"
                          style={{ width: 50, height: 50 }}
                        />
                      </div>
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
                  <th colSpan={10}>V.T. ENTERPRISE</th>
                  <th colSpan={2} rowSpan={2}>
                    Customer:
                  </th>
                  <th colSpan={5} rowSpan={2}>
                    <input
                      maxLength={20}
                      type="text"
                      value={values?.customer}
                      onChange={(event) => {
                        const text = event.target.value;
                        const alphabeticText = text.replace(
                          /[^A-Za-z0-9 ]/g,
                          ""
                        );
                        handleChange("customer")(alphabeticText);
                      }}
                    />
                  </th>
                </tr>
                <tr className={classes.fourHeadings}>
                  <th colSpan={2}>Address:</th>
                  <th colSpan={11}>CHENNAI</th>
                </tr>
                <tr className={classes.fourHeadings}>
                  <th colSpan={2}>Part No:</th>
                  <th colSpan={10}>{values?.tableHeadDataApi?.part_no}</th>
                  <th colSpan={2}>Inv No:</th>
                  <th colSpan={5}>
                    <input
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
                  <th colSpan={10}>
                    {values?.tableHeadDataApi?.drawing_issue_no}
                  </th>
                  <th colSpan={2}>Inv Date:</th>
                  <th colSpan={5}>
                    <Commondate
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
                  <th colSpan={10}>{values?.tableHeadDataApi?.part_name}</th>
                  <th colSpan={2}>Quantity:</th>
                  <th colSpan={5}>
                    <input
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
                      {ele?.observation !== ""
                        ? ele?.observation.map((inputs, inputIndex) => (
                            <td>
                              <input
                                className={classes.observationInput}
                                maxLength={10}
                                type="text"
                                value={inputs}
                                onChange={(event) =>
                                  handleChangeValues(event, index, inputIndex)
                                }
                              />
                            </td>
                          ))
                        : [...Array(10)].map((emptyInput, inputIndex) => (
                            <td key={inputIndex}>
                              <input
                                style={{
                                  color: "red",
                                }}
                                className={classes.observationInput}
                                type="text"
                                value={emptyInput ? emptyInput : ""}
                                onChange={(event) => {
                                  handleChangeValues(event, index, inputIndex);
                                }}
                              />
                            </td>
                          ))}
                      <td>
                        <input
                          className={classes.observationInput}
                          maxLength={20}
                          type="text"
                          value={ele?.status}
                          onChange={(event) => handleStatusChange(index, event)}
                        />
                      </td>
                      <td colSpan={2}>
                        <input
                          className={classes.observationInput}
                          maxLength={20}
                          type="text"
                          value={ele?.remark}
                          onChange={(event) => handleRemarkChange(index, event)}
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
