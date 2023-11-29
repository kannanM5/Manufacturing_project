import React, { useEffect, useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import classes from "./Management.module.css";
import Logo from "../../Assets/Images/Png/VTLogo.jpg";
import {
  addInspectionReportList,
  editInspectionReportList,
  getInspectionReportList,
} from "../../Services/Services";
import { getCatchMsg, getInvalidMsg } from "../../Utility/GeneralUtils";
import { useEmployeeId, useToken } from "../../Utility/StoreData";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import moment from "moment";
import { CustomButton } from "../../Components";
import Commondate from "../../Components/Commondate";
import dayjs from "dayjs";
var CryptoJS = require("crypto-js");

function SettingInspectionReport() {
  const token = useToken();
  const location = useLocation();
  const [urlValues, setUrlValues] = useState();
  const userId = useEmployeeId();
  const [isFinalStatus, setisFinalstatus] = useState(null);
  const [loader, setloader] = useState(false);
  const [reportData, setReportData] = useState(null);
  const { values, handleChange, setFieldValue, setValues } = useFormik({
    initialValues: {
      product_id: "",
      process_id: "",
      mvc_no: "",
      setter_name: "",
      part_no: "",
      part_name: "",
      process: "",
      setter_name: "",
      report_header_date: new Date(),
      report_shift: "",
      inspector_name: "",
      report_header_status: Array(5).fill(null),
      final_status: isFinalStatus,
      checked_by: "",
      approved_by: "",
      datas: "",
      tableHeadDataApi: "",
    },
  });
  const tableHeadData = [
    {
      id: 1,
      left: "M/C N0.",
      right: "Setter Name:",
      leftData: values?.mvc_no,
      rightData: values?.setter_name,
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
      id: 4,
      left: "Process:",
      right: "Inspector Name",
      leftData: values?.process,
      rightData: values?.inspector_name,
    },
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const encryptedData = urlParams.get("data");

    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, "data");
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

    const decryptedData = JSON.parse(decryptedText);
    setUrlValues(decryptedData);
  }, [location.search]);

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
        process_id: reportData?.productData?.process_id,
        product_id: reportData?.productData?.product_id,
        datas: processingData,
        tableHeadDataApi: reportData?.productData,
        checked_by: reportData?.productData?.checked_by,
        approved_by: reportData?.productData?.approved_by,
        report_header_date: reportData?.productData?.report_header_date
          ? reportData?.productData?.report_header_date
          : values?.report_header_date,
      });
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
    const emptyObserveData = [null, null, null, null, null];
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
      mvc_no: data?.mvc_no,
      process_id: data?.process_id,
      setter_name: data?.setter_name,
      report_header_date: data?.report_header_date,
      report_shift: data?.report_shift,
      inspector_name: data?.inspector_name,
      report_header_status: data?.report_header_status,
      final_status: isFinalStatus
        ? isFinalStatus.toString()
        : isFinalStatus.toString(),
      checked_by: data?.checked_by,
      approved_by: data?.approved_by,
      observationData: sendData,
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
  console.log(token, "CURRENTTOKEN");
  const handleChangeValues = (event, index, inputIndex) => {
    const tempData = [...values.datas];
    const newData = tempData.map((ele, dataIndex) => {
      if (dataIndex === index) {
        const newObservation = Array.isArray(ele.observation)
          ? [...ele.observation]
          : Array(5).fill(""); // Assuming a default value of an empty string for non-array observations
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

  const handleChangeStatus = (event, index) => {
    const newData = [...values?.report_header_status];
    newData[index] = event.target?.value;
    setFieldValue("report_header_status", newData);
  };

  return (
    <>
      <div>
        <PageHeader
          Btntitle={"Save"}
          BtntitleOne={"Finish"}
          modal={() => handleAddIncomingReport(values, 0)}
          onPressOvertime={() => handleAddIncomingReport(values, 1)}
          heading={"Setting Approval Report"}
        />
        <div className={classes.reportInsepection}>
          <div className={`table-responsive ${classes.Dashboard}`}>
            <table>
              <thead>
                <tr>
                  <th colSpan={18} className={classes.CompanyName}>
                    VT ENTERPRISES
                  </th>
                </tr>
                <tr>
                  <td colSpan={16} rowSpan={2}>
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
                        SETTING APPROVAL REPORT
                      </div>
                      <div></div>
                    </div>
                  </td>
                  <td style={{ fontSize: "var(--textXs)" }}>DC.No</td>
                  <td style={{ fontSize: "var(--textXs)" }}>VTE/QA/R/02</td>
                </tr>
                <td style={{ fontSize: "var(--textXs)" }}>REV.No</td>
                <td style={{ fontSize: "var(--textXs)" }}>00/05/10/2023</td>
                {tableHeadData.map((head, index) => (
                  <tr key={index} className={classes.fourHeadings}>
                    <th colSpan={3}>{head?.left}</th>
                    <th colSpan={11} className={classes.staticHeading}>
                      {index === 0 ? (
                        <input
                          maxLength={50}
                          type="text"
                          value={head?.leftData}
                          onChange={(event) => {
                            const text = event.target.value;
                            const alphabeticText = text.replace(
                              /[^A-Za-z0-9 ]/g,
                              ""
                            );
                            handleChange("mvc_no")(alphabeticText);
                          }}
                        />
                      ) : (
                        head?.leftData
                      )}
                    </th>
                    <th colSpan={1}>{head?.right}</th>
                    <th colSpan={3}>
                      {index === 0 ? (
                        <input
                          maxLength={20}
                          type="text"
                          value={head?.rightData}
                          onChange={(event) => {
                            const text = event.target.value;
                            const alphabeticText = text.replace(
                              /[^A-Za-z0-9 ]/g,
                              ""
                            );
                            handleChange("setter_name")(alphabeticText);
                          }}
                        />
                      ) : index === 1 ? (
                        <Commondate
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
                          maxLength={20}
                          type="text"
                          value={head?.rightData}
                          onChange={(event) => {
                            const text = event.target.value;
                            const alphabeticText = text.replace(
                              /[^A-Za-z0-9. ]/g,
                              ""
                            );
                            handleChange("report_shift")(alphabeticText);
                          }}
                        />
                      ) : (
                        <input
                          maxLength={20}
                          type="text"
                          value={head?.rightData}
                          onChange={(event) => {
                            const text = event.target.value;
                            const alphabeticText = text.replace(
                              /[^A-Za-z0-9. ]/g,
                              ""
                            );
                            handleChange("inspector_name")(alphabeticText);
                          }}
                        />
                      )}
                    </th>
                  </tr>
                ))}
                <tr className={classes.secondHead}>
                  <th colSpan={1} rowSpan={2} className={classes.serialNo}>
                    S.No
                  </th>
                  <th colSpan={2} rowSpan={2}>
                    Characteristics
                  </th>
                  <th colSpan={1} rowSpan={2}>
                    Specifications
                  </th>
                  <th colSpan={1} rowSpan={2}>
                    Units
                  </th>
                  <th colSpan={1} rowSpan={2}>
                    Method Of Check
                  </th>
                  <th colSpan={5} className={classes.secondFourtColumn}>
                    Observations
                  </th>
                  <th colSpan={10} rowSpan={2}>
                    Remarks
                  </th>
                </tr>
                <th className={classes.observe}>1</th>
                <th className={classes.observe}>2</th>
                <th className={classes.observe}>3</th>
                <th className={classes.observe}>4</th>
                <th className={classes.observe}>5</th>
              </thead>
              <tbody>
                {values?.datas &&
                  values?.datas.map((ele, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td colSpan={2}>{ele?.characteristics}</td>
                      <td colSpan={1}>{ele?.specification}</td>
                      <td colSpan={1}>{ele?.units}</td>
                      <td colSpan={1}>{ele?.method_of_check}</td>
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
                        : [...Array(5)].map((emptyInput, inputIndex) => (
                            <td key={inputIndex}>
                              <input
                                // style={{
                                //   color: getColor(index, inputIndex),
                                // }}
                                className={classes.observationInput}
                                type="text"
                                value={emptyInput ? emptyInput : ""}
                                onChange={(event) => {
                                  handleChangeValues(event, index, inputIndex);
                                }}
                              />
                            </td>
                          ))}
                      <td colSpan={10}>
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
                  <td
                    style={{ textAlign: "right", padding: "0 15px" }}
                    colSpan={6}
                  >
                    Status
                  </td>
                  {values?.report_header_status &&
                    values?.report_header_status.map((ele, index) => (
                      <td>
                        <input
                          className={classes.observationInput}
                          maxLength={10}
                          type="text"
                          value={ele}
                          onChange={(event) => handleChangeStatus(event, index)}
                        />
                      </td>
                    ))}
                  <td colSpan={8}></td>
                </tr>
                <tr>
                  <td colSpan={26} className={classes.final}>
                    <div className={classes.finalStatus}>
                      <p>Final Status</p>
                      <div className={classes.checkBoxContainer}>
                        <input
                          className={classes.checkBox}
                          type="checkbox"
                          onClick={() => setisFinalstatus(1)}
                          checked={isFinalStatus == 1 ? true : false}
                        ></input>
                        <p>Accepted</p>
                      </div>
                      <div className={classes.checkBoxContainer}>
                        <input
                          className={classes.checkBox}
                          type="checkbox"
                          checked={isFinalStatus == 0 ? true : false}
                          onClick={() => setisFinalstatus(0)}
                        ></input>
                        <p>Rejected</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>Checked BY</td>
                  <td colSpan={9}>
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
                  <td colSpan={4}>Appproved By</td>
                  <td colSpan={10}>
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

export default SettingInspectionReport;
