import React, { useState } from "react";
import { useEmployeeId, useToken } from "../Utility/StoreData";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getCatchMsg, getInvalidMsg } from "../Utility/GeneralUtils";
import toast from "react-hot-toast";
import { CustomButton, Loader, TextInputBox } from "../Components";
import { updateProcess } from "../Services/Services";

const validationSchema = Yup.object({
  process: Yup.string().required("Process is required"),
});
function EditProcess({ onClose, modalClose, listApiCall, editData }) {
  const token = useToken();
  const userId = useEmployeeId();
  const [loader, setloader] = useState(false);
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      process: editData?.process,
      id: editData?.id,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleAddProcess(values);
    },
  });
  console.log(editData, "edidatat");

  const handleAddProcess = (data) => {
    setloader(true);
    const formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("process", data?.process);
    formData.append("id", data?.id);
    updateProcess(formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          listApiCall();
          modalClose();
          toast.success(response?.data?.msg);
        } else if (response?.data?.status === 0) {
          if (typeof response?.data?.msg === "object") {
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
  return (
    <>
      {loader ? <Loader /> : null}
      <div className="my-3">
        <TextInputBox
          title="Process"
          value={values?.process}
          onChangeText={handleChange("process")}
          requiredText="*"
          name="process"
          placeHolder="Enter Process"
          customInputProps={{
            maxLength: 50,
          }}
          errorText={errors?.process && touched?.process ? errors?.process : ""}
        />
        <div className="col-3 mt-3">
          <CustomButton title="Update" onButtonPress={handleSubmit} />
        </div>
      </div>
    </>
  );
}

export default EditProcess;
