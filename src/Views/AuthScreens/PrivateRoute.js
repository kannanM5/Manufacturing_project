import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../Store/Storage/Cookie";

/**
 * A higher-order component that acts as a private route for authenticated users.
 * If the user is not authenticated (based on the presence of a specific cookie),
 * it renders the child components wrapped in an Outlet component from React Router.
 * If the user is authenticated, it redirects them to the "/dashboard/management/device" route.
 * @returns {JSX.Element} - The rendered component or redirect.
 */
export const AuthPrivateRoute = () => {
  return getCookie("mconnect_user_data") === "" ? (
    <Outlet />
  ) : (
    <Navigate to={"/dashboard/management/device"} />
  );
};
/**
 * A private route component for resetting password. If the "otpverification" cookie is present,
 * it renders the child components. Otherwise, it redirects to the home page.
 * @returns {JSX.Element} - The rendered component or the redirect component.
 */
export const ResetPasswordPrivateRoute = () => {
  return getCookie("otpverification") === "" ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
};
/**
 * A private route component for the dashboard that checks if the user is authenticated.
 * If the user is authenticated, it renders the child components. Otherwise, it redirects
 * the user to the login page.
 * @returns {JSX.Element} - The rendered component or the redirect component.
 */
export const DashboardPrivateRoute = () => {
  return getCookie("mconnect_user_data") === "" ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
};

/**
 * A private route component that checks if the employee reset key cookie exists and
 * its value is equal to 1. If the condition is true, it renders the child components
 * wrapped in an Outlet component. Otherwise, it redirects to the home page.
 * @returns The rendered components or a redirect to the home page.
 */
export const OtpPrivateRoute = () => {
  const EmployeeResetkey = getCookie("mconnect_resetkey")
    ? getCookie("mconnect_resetkey")
    : null;
  return EmployeeResetkey === null && parseInt(EmployeeResetkey) !== 1 ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
};

/**
 * A private route component that only allows access to the route if the user has
 * the necessary permission.
 * @returns {JSX.Element} - The component to render based on the user's permission.
 */
export const DevicePrivateRoute = () => {
  const EmployeePermission = getCookie("mconnect_user_data")
    ? JSON.parse(getCookie("mconnect_user_data"))?.permission?.device
    : null;
  return EmployeePermission === 1 ? <Outlet /> : <Navigate to={"/dashboard"} />;
};
/**
 * A private route component for employees. It checks if the user has the necessary
 * permission to access the route and renders the appropriate component.
 * @returns {JSX.Element} - The rendered component based on the user's permission.
 */
export const EmployeePrivateRoute = () => {
  const EmployeePermission = getCookie("mconnect_user_data")
    ? JSON.parse(getCookie("mconnect_user_data"))?.permission?.employee
    : null;
  return EmployeePermission === 1 ? <Outlet /> : <Navigate to={"/dashboard"} />;
};
/**
 * A private route component for machines that checks the user's permission level
 * before rendering the content.
 * @returns {JSX.Element} - The rendered component.
 */
export const MachinePrivateRoute = () => {
  const EmployeePermission = getCookie("mconnect_user_data")
    ? JSON.parse(getCookie("mconnect_user_data"))?.permission?.machine
    : null;
  return EmployeePermission === 1 ? <Outlet /> : <Navigate to={"/dashboard"} />;
};
/**
 * Renders a private route component that only allows access to employees with a specific permission level.
 * @returns {JSX.Element} - The rendered private route component.
 */
export const ShiftPrivateRoute = () => {
  const EmployeePermission = getCookie("mconnect_user_data")
    ? JSON.parse(getCookie("mconnect_user_data"))?.permission?.shift
    : null;
  return EmployeePermission === 1 ? <Outlet /> : <Navigate to={"/dashboard"} />;
};
/**
 * A private route component for the work schedule page that checks the employee's permission
 * before rendering the content.
 * @returns {JSX.Element} - The rendered component based on the employee's permission.
 */
export const WorkShedulePrivateRoute = () => {
  const EmployeePermission = getCookie("mconnect_user_data")
    ? JSON.parse(getCookie("mconnect_user_data"))?.permission?.work_orders
    : null;
  return EmployeePermission === 1 ? <Outlet /> : <Navigate to={"/dashboard"} />;
};
/**
 * A private route component for work orders that checks the employee's permission level.
 * If the employee has permission to access work orders, it renders the child components.
 * Otherwise, it redirects the user to the dashboard.
 * @returns {JSX.Element} - The rendered components based on the employee's permission level.
 */
export const WorkOrderPrivateRoute = () => {
  const EmployeePermission = getCookie("mconnect_user_data")
    ? JSON.parse(getCookie("mconnect_user_data"))?.permission?.work_orders
    : null;
  return EmployeePermission === 1 ? <Outlet /> : <Navigate to={"/dashboard"} />;
};
