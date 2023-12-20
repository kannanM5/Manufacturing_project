import { Outlet, useLocation } from "react-router-dom";
import Header from "../../SharedComponents/Header";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  return (
    <>
      <div
        style={{
          backgroundColor:
            pathname === "/export_page/view_reports" ? "White" : "white",
          minHeight: "100vh",
        }}
      >
        <Header />
        <div
          style={{
            padding:
              pathname === "/dashboard"
                ? "65px 0px 0px 0px"
                : "65px 10px 7px 10px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
