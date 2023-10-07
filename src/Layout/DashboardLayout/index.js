import { Outlet } from "react-router-dom";
import Header from "../../SharedComponents/Header";
import classes from "./DashboardLayout.module.css";

export default function DashboardLayout() {
  return (
    <>
      <div className={classes.container}>
        <Header />
        <div className={classes.bg_img}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
