import React, { useEffect } from "react";
import { useToken } from "../Utility/StoreData";
import { useDispatch } from "react-redux";
import {
  handleStoreUserData,
  handleStoreUserToken,
} from "../Store/Reducers/LoginReducer";
import { getCookie, setCookie } from "../Store/Storage/Cookie";
import instance from "../Services/Axios";
import { getCatchMsg } from "../Utility/GeneralUtils";

function InstanceBase() {
  const token = useToken();
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (token === null) {
      try {
        const cookieUserData = getCookie("vt_enterprise_login");
        if (cookieUserData) {
          dispatch(handleStoreUserToken(cookieUserData?.data?.token));
          dispatch(handleStoreUserData(cookieUserData?.data));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [token]);
  return <div></div>;
}

export default InstanceBase;
