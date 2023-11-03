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

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

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
    setTabData([
      {
        id: 21,
        name: "Incoming Inspection report",
        pathname: "/Prepareinscepectionreport/incoming_inspection_report",
        isVisible: true,
      },
      {
        id: 22,
        name: "Setting Approval Report",
        pathname: "/Prepareinscepectionreport/setting_approval_report",
        isVisible: true,
      },
      {
        id: 24,
        name: "line Inspection report",
        pathname: "/Prepareinscepectionreport/line_inspection_report",
        isVisible: true,
      },
      {
        id: 25,
        name: "Final Inspection Report",
        pathname: "/Prepareinscepectionreport/final_inspection_report",
        isVisible: true,
      },
      ,
    ]);
  }, [type]);
  return (
    <>
      {/* <div className={classes.subHead}>
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
      </div> */}
      <Outlet />
    </>
  );
}
