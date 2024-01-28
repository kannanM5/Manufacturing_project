import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import CustomPagination from "../../Components/CustomPagination";
import ViewIcons from "../../Assets/Icons/SvgIcons/view.svg";
import { Commondate, NoDataFound } from "../../Components/index";
import CustomDropDown from "../../Components/CustomDropDown";
import DownloadIcon from "../../Assets/Icons/SvgIcons/download_icon.svg";
import CustomToolTip from "../../Components/CustomToolTip";
import classes from "./Management.module.css";
import { CustomButton, Loader, TextInputBox } from "../../Components";
import { getCatchMsg } from "../../Utility/GeneralUtils";
import {
  exportReportService,
  getExportList,
  unlinkExcelTableReport,
} from "../../Services/Services";
import { useEmployeeId, useToken } from "../../Utility/StoreData";
import { DOWNLOAD_URL, getTableSNO } from "../../Utility/Constants";

const dropdownItem = [
  {
    key: 1,
    label: "Incoming Inspection Report",
  },
  {
    key: 2,
    label: "Setting Approval Report",
  },
  {
    key: 3,
    label: "Line Inspection Report",
  },
  {
    key: 4,
    label: "Final Inspection Report",
  },
];

function Export() {
  const [isOpen, setisOpen] = useState(false);
  const [loader, setloader] = useState(false);
  const token = useToken();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const userId = useEmployeeId();
  const [exportDataList, setexportDataList] = useState();

  const { handleChange, setFieldValue, values, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        reportType: "",
        date: null,
        part_no: "",
        process: "",
        customer: "",
      },
      onSubmit: () => {
        handleGetExportDataList(1, 10, true);
      },
    });

  useEffect(() => {
    if (token) handleGetExportDataList();
  }, [token]);

  const handleGetExportDataList = (
    page = 1,
    limit = 10,
    resetValue = false
  ) => {
    setloader(true);
    const formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    if (resetValue) {
      formData.append("part_no", values?.part_no);
      formData.append("process", values?.process);
      if (values?.date)
        formData.append("date", dayjs(values?.date).format("YYYY-MM-DD"));
      formData.append("report_type", values?.reportType);
      formData.append("customer", values?.customer);
    }
    formData.append("limit", limit);
    formData.append("page", page);
    getExportList(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          setPage(parseInt(response?.data?.data?.page) - 1);
          setexportDataList(response?.data?.data);
        } else if (response?.data?.status === 0) {
          setexportDataList(null);
        }
      })
      .catch((err) => {
        getCatchMsg(err);
      })
      .finally(() => {
        setloader(false);
      });
  };

  const reportType = (id) => {
    let obj = [...dropdownItem].find((ele) => ele.key === parseInt(id));
    return obj?.label;
  };

  const handleUnLinkDownloadExportReport = (data) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("filename", data);
    unlinkExcelTableReport(formData)
      .then((response) => {
        console.log("Success", response?.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDownloadExportReport = (data) => {
    setloader(true);
    const formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("process_id", data?.process_id);
    formData.append("product_id", data?.product_id);
    formData.append("report_id", data?.report_id);
    formData.append("report_type", data?.report_type);
    exportReportService(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          const downloadUrl = `${DOWNLOAD_URL}${response?.data?.filename}`;
          if (downloadUrl) {
            const linkSource = downloadUrl;
            const downloadLink = document.createElement("a");
            downloadLink.href = linkSource;
            downloadLink.click();
            // window.opener(downloadUrl);
            // handleUnLinkDownloadExportReport(response?.data?.filename);
          }
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

  return (
    <>
      <PageHeader
        heading={"Export"}
        BtnTrue={false}
        Btntitle={isOpen ? "Close" : "Search"}
        modal={() => {
          setisOpen((prev) => !prev);
          resetForm();
        }}
        secondBtn={false}
      />
      {loader ? <Loader /> : null}
      <div className={classes.Export}>
        {isOpen && (
          <div className={classes.serachOptionConatiner}>
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3 ">
                <CustomDropDown
                  placeholderText={"report type"}
                  items={[...dropdownItem]}
                  value={
                    [...dropdownItem].find(
                      (ele) => ele.key === parseInt(values.reportType)
                    )?.label
                  }
                  title="Select Report Type"
                  onSelect={(val) => {
                    setFieldValue("reportType", val);
                  }}
                />
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3 ">
                <Commondate
                  title="Date"
                  onChange={(value) => {
                    setFieldValue("date", value);
                  }}
                  placeholder={"Select date"}
                  value={values?.date}
                />
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3 ">
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
                />
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3 ">
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
                />
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3 ">
                <TextInputBox
                  title="Customer"
                  placeHolder="Enter customer"
                  value={values.customer}
                  onChangeText={handleChange("customer")}
                  name="customer"
                  customInputProps={{
                    maxLength: 50,
                  }}
                  type={"text"}
                />
              </div>
              <div
                className={`col-lg-2 col-xl-1 col-md-3 col-4 mt-4 ${classes.exportBtns}`}
              >
                <CustomButton title="Search" onButtonPress={handleSubmit} />
              </div>
              <div
                className={`col-lg-2 col-xl-1 col-md-3 col-4 mt-4 ${classes.exportBtns}`}
              >
                <CustomButton
                  title="Reset"
                  onButtonPress={() => {
                    handleGetExportDataList(1, 10, false);
                    resetForm();
                  }}
                  customButtonStyle={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                />
              </div>
            </div>
          </div>
        )}
        <div className={`table-responsive ${classes.Dashboard}`}>
          <table className={classes.listOfTable}>
            <thead className={classes.NormalTable}>
              <tr>
                <th>S.No</th>
                <th>Part No</th>
                <th>Process</th>
                <th>Customer</th>
                <th>Inspection Report Type</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {exportDataList?.items.length > 0 ? (
                exportDataList?.items.map((ele, ind) => (
                  <tr key={ind}>
                    <td>
                      {getTableSNO(parseInt(exportDataList?.page), 10, ind)}
                    </td>
                    <td>{ele?.part_no ? ele?.part_no : "-"}</td>
                    <td>{ele?.process ? ele?.process : "-"}</td>
                    <td>{ele?.customer ? ele?.customer : "-"}</td>
                    <td>
                      {ele?.report_type ? reportType(ele?.report_type) : "-"}
                    </td>
                    <td>
                      {ele?.date ? dayjs(ele?.date).format("YYYY-MM-DD") : "-"}
                    </td>
                    <td>
                      <div className={classes.icons}>
                        <CustomToolTip title={"View"}>
                          <img
                            onClick={() =>
                              navigate(
                                { pathname: "view_reports" },
                                { state: ele }
                              )
                            }
                            src={ViewIcons}
                            alt="View icon"
                          />
                        </CustomToolTip>
                        <CustomToolTip title={"Download"}>
                          <img
                            src={DownloadIcon}
                            alt="Download icon"
                            onClick={() => handleDownloadExportReport(ele)}
                          />
                        </CustomToolTip>
                      </div>
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
      {exportDataList?.totalPage > 1 && (
        <CustomPagination
          pageCount={exportDataList?.totalPage}
          currentpage={page}
          forcePage={page}
          onPageChange={(val) => {
            handleGetExportDataList(val + 1, 10, false);
          }}
        />
      )}
    </>
  );
}

export default Export;
