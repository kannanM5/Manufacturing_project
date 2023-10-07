import { useSelector } from "react-redux";

/**
 * Custom React hook that retrieves the login token from the Redux store.
 * @returns {string} The login token.
 */
export const useToken = () => {
  return useSelector((state) => state.login.token);
};

/**
 * Custom React hook that returns the base URL of the device from the Redux store.
 * @returns {string | undefined} The base URL of the device.
 */
export const useDeviceBaseUrl = () => {
  return useSelector((state) => state?.login.deviceBaseUrl);
};

/**
 * Retrieves the user details from the Redux store using the useSelector hook.
 * @returns The user details object from the Redux store.
 */
export const UserDetail = () => {
  return useSelector((state) => state.login.userDetails);
};
/**
 * Retrieves the user data from the Redux store using the useSelector hook.
 * @returns The user data object from the Redux store.
 */
export const Userdata = () => {
  return useSelector((state) => state.login.userData);
};
