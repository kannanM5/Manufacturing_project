import React, { useEffect, useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import classes from "./Management.module.css";
import { CustomButton, TextInputBox } from "../../Components";
import EditIcon from "../../Assets/Icons/Svg/edit.svg";
import { useEmployeeId, useToken } from "../../Utility/StoreData";
import { savedDataList } from "../../Services/Services";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCatchMsg, getInvalidMsg } from "../../Utility/GeneralUtils";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const validationSchema = Yup.object({
  part_no: Yup.string().required("Part number is required").strict(true),
  process: Yup.string().required("Process is required").strict(true),
});

function SavedData() {
  const { state } = useLocation();
  const token = useToken();
  const userId = useEmployeeId();
  const [loader, setloader] = useState(false);
  const [isShowModal, setIsShowModal] = useState({
    status: false,
    data: null,
    viewStatus: false,
  });
  const [listInSpectionCriteria, setlistInSpectionCriteria] = useState(null);

  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    errors,
    touched,
    resetForm,
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
      handleListCriteriaService(values);
    },
  });

  const getReportType = (type) => {
    if (type == 1) {
      return "Incoming Inspection Report";
    } else if (type == 2) {
      return "Setting Approval Report";
    } else if (type == 3) {
      return "Line Inspection Report";
    } else {
      return "'Final Inspection Report";
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

  useEffect(() => {
    if (state) {
      handleListCriteriaService(state);
      setFieldValue("part_no", state?.part_no);
      setFieldValue("process", state?.process);
    }
  }, [state]);
  return (
    <div className={classes.insepectionCreteria}>
      <PageHeader heading={"Saved Logs"} BtnTrue={true} />
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <TextInputBox
            title="Part No"
            placeHolder="Enter part no"
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
            errorText={touched.part_no && errors.part_no ? errors.part_no : ""}
          />
        </div>
        <div className="col-lg-3 col-md-6">
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
            errorText={touched.process && errors.process ? errors.process : ""}
          />
        </div>

        <div className="col-lg-1 col-md-6 col-3 mt-4">
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
              {listInSpectionCriteria &&
                listInSpectionCriteria.map((products, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{products?.part_no}</td>
                    <td>{products?.process}</td>
                    <td>{getReportType(products?.report_type)}</td>
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
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SavedData;
