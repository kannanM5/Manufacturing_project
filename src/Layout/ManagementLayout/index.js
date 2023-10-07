import React, { useEffect, SetStateAction, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../Store/Storage/Cookie";
import { muiStyles } from "../../Utility/Constants";
import classes from "./Manage.module.css";

export default function ManagementLayout({ type }) {
  const { pathname } = useLocation();
  const styles = muiStyles();
  const navigate = useNavigate();
  const loginUserData = getCookie("mconnect_user_data")
    ? JSON.parse(getCookie("mconnect_user_data"))?.permission
    : null;
  const [TabData, setTabData] = useState([]);
  const [value, setValue] = useState("1");

  /**
   * Handles the change event when the tab value is changed.
   * @param {React.ChangeEvent<{}>} event - The change event object.
   * @param {string} newValue - The new value of the tab.
   * @returns None
   */
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  /**
   * useEffect hook that updates the value based on the active tab in the TabData array.
   * @param {pathnameType[]} TabData - An array of objects representing tabs.
   * @param {string} pathname - The current pathname.
   * @returns None
   */
  useEffect(() => {
    let findActiveTab = TabData.map((ele) => {
      if (pathname === ele.pathname) {
        return ele;
      } else {
        return null;
      }
    });
    findActiveTab = findActiveTab.filter((ele) => ele);
    if (findActiveTab) {
      setValue(findActiveTab[0]?.name);
    }
  }, [pathname]);

  useEffect(() => {
    if (type === 1) {
      setTabData([
        {
          id: 21,
          name: "Device Management",
          pathname: "/dashboard/management/device",
          isVisible: loginUserData?.device === 1 ? true : false,
        },
        {
          id: 22,
          name: "Machine Management",
          pathname: "/dashboard/management/machine",
          isVisible: loginUserData?.machine === 1 ? true : false,
        },
        {
          id: 24,
          name: "Employee Management",
          pathname: "/dashboard/management/employee_management",
          isVisible: loginUserData?.employee === 1 ? true : false,
        },
        {
          id: 25,
          name: "Shift",
          pathname: "/dashboard/management/shift",
          isVisible: loginUserData?.shift === 1 ? true : false,
        },
        {
          id: 26,
          name: "Work Schedule",
          pathname: "/dashboard/management/work_shedule",
          isVisible: loginUserData?.work_orders === 1 ? true : false,
        },
      ]);
    } else if (type === 2) {
      setTabData([
        {
          id: 27,
          name: "Employee Login Report",
          pathname: "/report/employee_report",
          isVisible: true,
        },
        {
          id: 28,
          name: "Machine Report",
          pathname: "/report/machine_report",
          isVisible: true,
        },
        {
          id: 29,
          name: "Workorder Plan Report",
          pathname: "/report/workorderplan_report",
          isVisible: true,
        },
      ]);
    }
  }, [type]);
  return (
    <>
      <div className={classes.subHead}>
        {TabData.map((ele, ind) => {
          return (
            <>
              <TabContext value={value}>
                <Box>
                  <TabList
                    onChange={handleTabChange}
                    aria-label="lab API tabs example"
                    className={
                      ele.name === value || pathname.includes(ele?.pathname)
                        ? `${styles.activeTab} ${styles.tabColor}`
                        : `${styles.tabColor}`
                    }
                  >
                    <Tab
                      style={{
                        display: ele.isVisible ? "block" : "none",
                      }}
                      label={ele.name}
                      value={ele.name}
                      disableRipple={true}
                      className={`${classes.tabContent} ${
                        ele.name === value || pathname.includes(ele?.pathname)
                          ? `activeTab ${styles.tabContent}`
                          : ""
                      }`}
                      onClick={() => navigate(ele?.pathname)}
                    />
                  </TabList>
                </Box>
              </TabContext>
            </>
          );
        })}
      </div>
      <Outlet />
    </>
  );
}
