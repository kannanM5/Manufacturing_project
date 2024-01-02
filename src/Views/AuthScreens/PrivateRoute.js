import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../Store/Storage/Cookie";

export const AuthPrivateRoute = () => {
  return getCookie("vt_enterprise_login") === "" ? (
    <Outlet />
  ) : (
    <Navigate to={"/dashboard"} />
  );
};

export const DashboardPrivateRoute = () => {
  return getCookie("vt_enterprise_login") !== "" ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
};

export const EmployeePrivateRoute = () => {
  const EmployeePermission = getCookie("vt_enterprise_login")
    ? getCookie("vt_enterprise_login")
    : null;
  return EmployeePermission?.data?.user_type !== 3 ? (
    <Outlet />
  ) : (
    <Navigate to={"/dashboard"} />
  );
};

export const ChangePasswordPrivateRoute = () => {
  const EmployeePermission = getCookie("vt_enterprise_login")
    ? getCookie("vt_enterprise_login")
    : null;
  return EmployeePermission?.data?.user_type === 1 ? (
    <Outlet />
  ) : (
    <Navigate to={"/dashboard"} />
  );
};
