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
  return getCookie("vt_enterprise_login") === "" ? (
    <Outlet />
  ) : (
    <Navigate to={"/dashboard"} />
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
  return getCookie("vt_enterprise_login") !== "" ? (
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
