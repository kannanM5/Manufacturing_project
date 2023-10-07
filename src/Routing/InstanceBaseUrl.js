import { useEffect } from "react";
import { useDispatch } from "react-redux";

import instance from "../Services/Axios";
import {
  handleStoreDeviceBaseUrl,
  handleStoreToken,
  handleStoreUserData,
  handleStoreUserDetails,
} from "../Store/Reducers/LoginReducer";
import { getProfile } from "../Services/Services";
import { getCookie, setCookie } from "../Store/Storage/Cookie";
import {
  useToken,
  useDeviceBaseUrl,
  UserDetail,
  Userdata,
} from "../Utility/StoreData";
import { getCatchMsg } from "../Utility/GeneralUtils";

export default function InstanceBaseUrl() {
  const dispatch = useDispatch();
  const deviceBaseUrl = useDeviceBaseUrl();
  const token = useToken();
  const userDetails = UserDetail();
  const userData = Userdata();

  /**
   * Handles the retrieval of user profile data.
   * @returns None
   */
  const handleGetProfile = () => {
    let formData = new FormData();
    formData.append("token", token);
    getProfile(formData).then((response) => {
      if (response.data.status === 1) {
        dispatch(handleStoreUserDetails(response.data.data));
      }
    });
  };

  /**
   * useEffect hook that triggers the handleGetProfile function when the token is present
   * and the userDetails is null.
   * @param {string} token - The authentication token.
   * @param {function} handleGetProfile - The function to handle getting the user profile.
   * @param {object} userDetails - The user details object.
   * @returns None
   */
  useEffect(() => {
    if (token && userDetails === null) {
      handleGetProfile();
    }
  }, [token]);

  /**
   * useEffect hook that runs once when the component mounts. It checks if the token and userData
   * are null, and if so, calls the handleCheckUserData function. It also checks if the deviceBaseUrl
   * is null, and if so, tries to retrieve it from a cookie. If the cookie exists, it updates the
   * instance's baseURL and dispatches the handleStoreDeviceBaseUrl action.
   * @returns None
   */
  useEffect(() => {
    if (token === null || userData === null) {
      handleCheckUserData();
    }
    if (deviceBaseUrl === null) {
      try {
        const cookieUserData = getCookie("mconnect_user_data");
        let parsedData = JSON.parse(cookieUserData);
        if (cookieUserData) {
          instance.defaults.baseURL = parsedData?.base_url;
          dispatch(handleStoreDeviceBaseUrl(parsedData?.base_url));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  /**
   * Handles checking user data by retrieving the user data from a cookie, parsing it,
   * and dispatching actions to store the user data and token if the cookie data exists.
   * @returns None
   */
  const handleCheckUserData = async () => {
    try {
      const cookieUserData = getCookie("mconnect_user_data");
      let parsedData = JSON.parse(cookieUserData);
      if (cookieUserData) {
        dispatch(handleStoreUserData(parsedData));
        dispatch(handleStoreToken(parsedData?.token));
      }
    } catch (error) {}
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
        setCookie("mconnect_user_data", "");
        window.location.assign("/");
      }
      return response;
    },
    function (error) {
      getCatchMsg(error);
    }
  );

  return <></>;
}
