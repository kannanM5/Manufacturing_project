import { Outlet, useLocation } from "react-router-dom";
import Header from "../../SharedComponents/Header";
import classes from "./DashboardLayout.module.css";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  return (
    <>
      <div className={classes.container}>
        <Header />
        <div
          className={classes.bg_img}
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
