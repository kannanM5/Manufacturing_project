import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useEmployeeId, useToken } from "../../../Utility/StoreData";
import { useLocation } from "react-router-dom";
import { viewReports } from "../../../Services/Services";
import { Loader } from "../../../Components";
import FinalInspectionReport from "./Finalinspectionreport";
import SettingInspectionReport from "./Settingapprovalreport";
import LineInspectionReport from "./LineInspectionReport";
import Emptypage from "./Incominginspectionreport";

function ViewReports() {
  const token = useToken();
  const userId = useEmployeeId();
  const { state } = useLocation();
  const [loader, setloader] = useState(false);
  const [reportList, setReportList] = useState();
  //   console.log(state, "STATE");
  // const {values} = useFormik({
  //   initialValues: {
  //     process
  //   },
  // });

  const handleGetViewReport = (data) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("process_id", data?.process_id);
    formData.append("product_id", data?.product_id);
    formData.append("report_id", data?.report_id);
    formData.append("report_type", data?.report_type);
    viewReports(formData).then((response) => {
      if (response?.data?.status === 1) {
        setReportList(response?.data?.data);
        console.log(response?.data?.data, "RESPONSE");
      }
    });
  };
  const getReportPage = () => {
    if (state?.report_type === 1) {
      return <Emptypage viewReportData={reportList} />;
    } else if (state?.report_type === 2) {
      return <SettingInspectionReport viewReportData={reportList} />;
    } else if (state?.report_type === 3) {
      return <LineInspectionReport viewReportData={reportList} />;
    } else {
      return <FinalInspectionReport viewReportData={reportList} />;
    }
  };
  useEffect(() => {
    if ((state, token)) handleGetViewReport(state);
  }, [state, token]);
  return (
    <div>
      {loader ? <Loader /> : null}
      {reportList && getReportPage()}
    </div>
  );
}

export default ViewReports;
