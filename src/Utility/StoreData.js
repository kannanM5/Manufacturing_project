import { useSelector } from "react-redux";
export const UserData = () => {
  return useSelector((state) => state.login?.userData);
};
export const useToken = () => {
  return useSelector((state) => state.login?.token);
};

export const useEmployeeId = () => {
  return useSelector((state) => state.login?.userData?.user_id);
};

export const useEmployeeType = () => {
  return useSelector((state) => state.login?.userData?.user_type);
};

export const useUserName = () => {
  return useSelector((state) => state.login?.userData?.username);
};
