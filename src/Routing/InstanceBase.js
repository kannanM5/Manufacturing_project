import React, { useEffect } from "react";
import { UserData, useEmployeeId, useToken } from "../Utility/StoreData";
import instance from "../Services/Axios";
import { useDispatch } from "react-redux";
import { getUserService } from "../Services/Services";
import { getCookie, setCookie } from "../Store/Storage/Cookie";
import { getCatchMsg } from "../Utility/GeneralUtils";
import { handleStoreUserData } from "../Store/Reducers/LoginReducer";

function InstanceBase() {
  const UserData = UserData();
  const token = useToken();
  const employeeId = useEmployeeId();
  const dispatch = useDispatch();
  const cookieData = getCookie("vt_enterprise_login");
  useEffect(() => {
    if (UserData === null) {
      console.log("effffff");
      hendleCheckUserData();
    }
  }, [UserData]);

  const hendleCheckUserData = async () => {
    console.log("Before try");
    const cookieData = getCookie("vt_enterprise_login");
    if (cookieData) {
      console.log("try");
      dispatch(handleStoreUserData(cookieData));
      handleGetEmployeeDetails();
    }
  };
  const handleGetEmployeeDetails = () => {
    console.log("check");
    let formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", employeeId);
    getUserService(formData).then((response) => {
      if (response.data.status === 1) {
        dispatch(handleStoreUserData(response.data.data));
      }
    });
  };
  instance.interceptors.request.use(
    (request) => {
      return request;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => {
      if (response.data.status === -1) {
        setCookie("vt_enterprise_login", "");
        window.location.assign("/");
      }
      return response;
    },
    function (error) {
      getCatchMsg(error);
    }
  );
  return <div></div>;
}

export default InstanceBase;
