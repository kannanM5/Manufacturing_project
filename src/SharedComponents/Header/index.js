import React, { useEffect, useState } from "react";
import { TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import {
  Drawer,
  Grid,
  Menu,
  MenuItem,
  Theme,
  makeStyles,
} from "@material-ui/core";
// import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "../../Assets/Images/Svg/logo.svg";
import dropdownarrow from "../../Assets/Icons/Svg/dropdownarrow.svg";
import dropdownUparrow from "../../Assets/Icons/Svg/dropdownUparrow.svg";
import dash from "../../Assets/Icons/Svg/Dashboard.svg";
import manage from "../../Assets/Icons/Svg/manage.svg";
import workorder from "../../Assets/Icons/Svg/workorder.svg";
import changepass from "../../Assets/Icons/Svg/changepass.svg";
import logout2 from "../../Assets/Icons/Svg/logout2.svg";
import report from "../../Assets/Icons/Svg/report.svg";
import logout from "../../Assets/Icons/png/logout.png";
import changepassword from "../../Assets/Icons/Svg/changePassword.svg";
import person from "../../Assets/Icons/Svg/person.svg";
import instance from "../../Services/Axios";
import defaultProfileImg from "../../Assets/Images/Png/dummy.png";
import { handleStoreUserDetails } from "../../Store/Reducers/LoginReducer";
import { getCookie, setCookie } from "../../Store/Storage/Cookie";
import { muiStyles } from "../../Utility/Constants";
// import { LogoutConfirmationModal } from "../../Modals";
import { GlobalModal } from "../../Components";
import menuIcon from "../../Assets/Icons/png/menuIcon.png";
import { UserDetail } from "../../Utility/StoreData";
import classes from "./header.module.css";

const useStyles = makeStyles((theme) => ({
  DropdownArrow: {
    "& .dropdown-toggle::after": {
      display: "none",
    },
    "&>div": {
      padding: "1px 0px",
    },
  },
  Drawer: {
    "&>div:nth-child(3)": {
      backgroundColor: "var(--menuBg) !important",
      color: "#fff !important",
      padding: "15px 12px",
      minWidth: "265px",
    },
  },
  Menu: {
    "&>div:nth-child(3)": {
      top: "51px !important",
      left: "0 !important",
      right: "37px",
      width: "200px",
      marginLeft: "auto",
      border: "1px solid #0000003d",
    },
    "& ul": {
      padding: "0px !important",
    },
  },
  menuList: {
    paddingTop: "12px !important",
    paddingBottom: "12px !important",
  },
}));
export default function Header() {
  const userDetails = UserDetail();
  const { REACT_APP_BASEURL } = process.env;
  const styles = muiStyles();
  const muiStyle = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [managementActive, setmanagementActive] = useState(false);
  const [reportActive, setreportActive] = useState(false);
  const [Arrow, setArrow] = useState(false);
  const [deleteModal, setdeleteModal] = useState({
    modal: false,
    id: "",
  });
  const loginUserData = getCookie("mconnect_user_data")
    ? JSON.parse(getCookie("mconnect_user_data"))?.permission
    : null;

  const getManagementInitialRoute = () => {
    const loginUserData = getCookie("mconnect_user_data")
      ? JSON.parse(getCookie("mconnect_user_data"))?.permission
      : null;
    const manageSubheadingData = [
      {
        pathname: "/dashboard/management/device",
        isVisible: loginUserData?.device === 1 ? true : false,
      },
      {
        pathname: "/dashboard/management/machine",
        isVisible: loginUserData?.machine === 1 ? true : false,
      },
      {
        pathname: "/dashboard/management/employee_management",
        isVisible: loginUserData?.employee === 1 ? true : false,
      },
      {
        pathname: "/dashboard/management/shift",
        isVisible: loginUserData?.shift === 1 ? true : false,
      },
      {
        pathname: "/dashboard/management/work_shedule",
        isVisible: loginUserData?.work_orders === 1 ? true : false,
      },
    ];

    let refData = [...manageSubheadingData];
    refData = refData.filter((ele) => ele.isVisible);
    return refData.length > 0 ? refData?.[0]?.pathname : "/dashboard";
  };

  

  const menuData = [
    {
      id: 1,
      name: "List Of Products",
      pathname: "product_list",
      naviagationPath: "/product_list",
      isVisible: true,
    },
    {
      id: 2,
      name: "Add Inscepection Report",
      // name: getManagementInitialRoute() == "/dashboard" ? "" : "Management",
      pathname: "management",
      naviagationPath: "/LineInspectionReport",
      downarrow: dropdownarrow,
      uparrow: dropdownUparrow,
      isVisible: true,
    },
    {
      id: 3,
      name: "Edit Incepection Report",
      pathname: "EditinscepectionReprt",
      naviagationPath: "/EditinscepectionReprt",
      isVisible: loginUserData?.work_orders === 1 ? true : false,
    },

    {
      id: 4,
      name: "Prepare Incepection Report",
      naviagationPath: "/Prepareinscepectionreport",
      pathname: "report/employee_report",
      downarrow: dropdownarrow,
      isVisible: loginUserData?.report === 1 ? true : false,
    },
  ];

  const hamburgerData = [
    {
      id: 1,
      name: "Dashboard",
      naviagationPath: "/dashboard",
      icon: dash,
      isVisible: true,
      privatePermission: true,
    },
    {
      id: 2,
      name: "Management",
      naviagationPath: "/dashboard/management/device",
      downarrow: dropdownarrow,
      uparrow: dropdownUparrow,
      icon: manage,
      isVisible: true,
      privatePermission:
        getManagementInitialRoute() == "/dashboard" ? false : true,
      manageSubheadingData: [
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
          name: "Shift ",
          pathname: "/dashboard/management/shift",
          isVisible: loginUserData?.shift === 1 ? true : false,
        },
        {
          id: 26,
          name: "Work Shedule ",
          pathname: "/dashboard/management/work_shedule",
          isVisible: loginUserData?.work_orders === 1 ? true : false,
        },
      ],
    },
    {
      id: 3,
      name: "Work Order",
      pathname: "Workorder",
      naviagationPath: "/Workorder",
      icon: workorder,
      privatePermission: true,
      isVisible: loginUserData?.work_orders === 1 ? true : false,
    },

    {
      id: 4,
      name: "Report",
      pathname: "report/employee_report",
      naviagationPath: "/report/employee_report",
      downarrow: dropdownarrow,
      uparrow: dropdownUparrow,
      privatePermission: true,
      icon: report,
      isVisible: loginUserData?.report === 1 ? true : false,
      manageSubheadingData: [
        {
          id: 21,
          name: "Employee Login Report",
          pathname: "/report/employee_report",
          isVisible: true,
        },
        {
          id: 22,
          name: "Machine Report",
          pathname: "/report/machine_report",
          isVisible: true,
        },
        {
          id: 22,
          name: "Workorder Plan Report",
          pathname: "/report/workorderplan_report",
          isVisible: true,
        },
      ],
    },
    {
      id: 6,
      name: "Change password",
      naviagationPath: "/dashboard/profile/change_password",
      icon: changepass,
      privatePermission: true,
      isVisible: true,
    },
    {
      id: 7,
      name: "Logout",
      icon: logout2,
      privatePermission: true,
      isVisible: true,
    },
  ];

  const [value, setValue] = React.useState("1");
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };


  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
  };

  /**
   * Handles the logout functionality.
   * - Dispatches an action to store user details as null.
   * - Removes the "mconnectLoginData" item from localStorage if "Remember" is not set.
   * - Clears the "mconnect_user_data" cookie.
   * - Navigates to the home page ("/").
   * - Resets the baseURL of the instance to the default baseUrl.
   * @returns None
   */
  const handleLogout = () => {
    // @ts-ignore
    dispatch(handleStoreUserDetails(null));
    if (!localStorage.getItem("Remember")) {
      localStorage.removeItem("mconnectLoginData");
    }
    setCookie("mconnect_user_data", "");
    document.cookie =
      "mconnect_user_data" + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
    navigate("/");
    // instance.defaults.baseURL = baseUrl;
    instance.defaults.baseURL = REACT_APP_BASEURL;
  };

  /**
   * useEffect hook that updates the active tab based on the current pathname.
   * @param {string} pathname - the current pathname of the page
   * @returns None
   */
  useEffect(() => {
    if (pathname.includes("management")) {
      setmanagementActive(true);
    }
    if (pathname.includes("report")) {
      setreportActive(true);
    }
    let findActiveTab = menuData.map((ele) => {
      if (ele.pathname) {
        if (pathname.includes(ele.pathname)) {
          if (pathname.includes("management")) {
            return { name: "Management" };
          } else if (pathname.includes("report")) {
            return { name: "Report" };
          }
          return ele;
        } else {
          return null;
        }
      }
    });
    
    findActiveTab = findActiveTab.filter((ele) => ele);
    if (findActiveTab && findActiveTab?.[0]?.name) {
      setValue(findActiveTab?.[0]?.name);
      
    }
  }, [pathname]);

  

  




  /**
   * Executes a side effect when the value of `deleteModal` changes.
   * @param {function} effect - The side effect to execute.
   * @param {Array} dependencies - An array of dependencies that the effect depends on.
   * @returns None
   */

  return (
    <>
      <GlobalModal
        isVisible={deleteModal.modal}
        setIsVisible={() => {
          setdeleteModal((prev) => {
            return {
              ...prev,
              modal: false,
            };
          });
        }}
      >
        {/* <LogoutConfirmationModal
          msg={"Are you sure do you want to Logout."}
          onClose={() => {
            setdeleteModal((prev) => {
              return {
                ...prev,
                modal: false,
              };
            });
          }}
          onPositiveButtonPressed={() => handleLogout()}
          onNegativeButtonPressed={() => {
            setdeleteModal((prev) => {
              return {
                ...prev,
                modal: false,
              };
            });
          }}
        /> */}
      </GlobalModal>
      <div className={classes.container}>
        <div className={classes.menu}>
          <div onClick={toggleShow} className={classes.menuIcon}>
            <img src={menuIcon} alt="menuIcon" />
          </div>
          {/* <div>
            <img src={logo} alt="logo" />
          </div> */}
          <div className={classes.offcanvas}>
            <Drawer
              className={muiStyle.Drawer}
              open={show}
              onClose={toggleShow}
            >
              <div className={classes.child3}>
                <img
                  onError={({ currentTarget }) => {
                    currentTarget.src = defaultProfileImg;
                  }}
                  src={userDetails?.pic}
                  alt="your image"
                  className={classes.user_image}
                  onClick={() => navigate("/dashboard/profile/my_profile")}
                />
                <div>
                  <p
                    className={classes.user_name}
                    onClick={() => {
                      navigate("/dashboard/profile/my_profile");
                      toggleShow();
                    }}
                  >
                    {userDetails?.name}
                  </p>
                  <p
                    className={classes.user_id}
                    onClick={() => {
                      navigate("/dashboard/profile/my_profile");
                      toggleShow();
                    }}
                  >
                    ID: {userDetails?.user_id}
                  </p>
                </div>
                <button onClick={toggleShow} className="btn-close" />
              </div>

              <div className={classes.child2}>
                {hamburgerData.map((ele, i) => {
                  if (ele?.isVisible && ele?.privatePermission) {
                    return (
                      <div key={ele.id.toString()}>
                        <div
                          onClick={() => {
                            if (ele.id === 2) {
                              setmanagementActive(!managementActive);
                              setreportActive(false);
                            } else if (ele?.id === 4) {
                              setmanagementActive(false);
                              setreportActive((pre) => !pre);
                            } else {
                              setmanagementActive(false);
                              setreportActive(false);
                              if (ele?.naviagationPath) {
                                navigate(ele?.naviagationPath);
                              }
                              toggleShow();
                            }
                          }}
                        >
                          <div className={classes.sideMenu}>
                            <div className={classes.menu_content}>
                              <img
                                src={ele.icon}
                                className={classes.sideIcons}
                                alt="icon"
                              />
                              <p
                                onClick={() =>
                                  ele.name == "Logout" &&
                                  setdeleteModal((prev) => {
                                    return {
                                      ...prev,
                                      modal: true,
                                      id: "",
                                    };
                                  })
                                }
                              >
                                {ele.name}
                              </p>

                              <div className={classes.menubar_dropdown}>
                                {ele.id === 2 || ele.id === 4 ? (
                                  <img
                                    src={
                                      (managementActive && ele.id === 2) ||
                                      (reportActive && ele.id === 4)
                                        ? ele.uparrow
                                        : ele.downarrow
                                    }
                                    alt={ele.downarrow}
                                  />
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              marginTop: "-10px",
                              marginBottom: "3px",
                              width: "45px",
                              marginLeft: "45px",
                              borderBottom:
                                pathname === ele.naviagationPath ||
                                (ele.id === 2 &&
                                  [
                                    "/dashboard/management/device",
                                    "/dashboard/management/machine",
                                    "/dashboard/management/machine/macine_details_list",
                                    "/dashboard/management/machine_group",
                                    "/dashboard/management/employee_management",
                                    "/dashboard/management/shift",
                                    "/dashboard/management/work_shedule",
                                  ].includes(pathname)) ||
                                (ele?.id === 4 && pathname.includes("report"))
                                  ? "2px solid #F25922"
                                  : undefined,
                            }}
                          ></div>

                          {((managementActive && ele?.id === 2) ||
                            (reportActive && ele?.id === 4)) &&
                            ele?.manageSubheadingData?.map((element, i) => {
                              return (
                                <div
                                  key={element.id.toString()}
                                  style={{
                                    display: element.isVisible
                                      ? "block"
                                      : "none",
                                    cursor: "pointer",
                                    color:
                                      pathname === element.pathname
                                        ? "#fff"
                                        : "rgba(255, 255, 255, 0.5)",
                                    marginLeft: "50px",
                                  }}
                                  onClick={() => {
                                    navigate(element.pathname);
                                    toggleShow();
                                  }}
                                >
                                  {element.name}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </Drawer>
          </div>
        </div>
        <div className={classes.content}>
          {/* <img
            onClick={() => {
              navigate("/dashboard");
            }}
            src={logo}
            alt="logo"
          /> */}
          <div>
            <h3 style={{ color: "white" }}>logo</h3>
          </div>
          <div className={classes.child2}>
            {menuData.map((ele, i) => {
              return (
                <TabContext value={value} key={i}>
                  <div className={"headerTab"}>
                    <TabList
                      onChange={handleTabChange}
                      aria-label="lab API tabs example"
                      className={
                        ele.name === value
                          ? `${styles.activeTab} ${styles.tabColor}`
                          : `${styles.tabColor}`
                      }
                      style={{
                        background: "rgb(242, 89, 34) !important",
                      }}
                    >
                      <Tab
                        // style={{
                        //   display: ele.isVisible ? "block" : "none",
                        // }}
                        label={ele.name}
                        value={ele.name}
                        className={`${classes.tabContent} ${
                          ele.name === value ? `activeTab ` : ""
                        }`}
                        onClick={() => {
                          navigate(ele?.naviagationPath);
                        }}
                      />
                    </TabList>
                  </div>
                </TabContext>
              );
            })}
          </div>
          <div>
            <Grid
              onClick={() => {
                setArrow((pre) => !pre);
              }}
              style={{ padding: "5px 12px" }}
            >
              <div style={{ display: "flex", cursor: "pointer" }}>
                {/* <img
                  onError={({ currentTarget }) => {
                    currentTarget.src = defaultProfileImg;
                  }}
                  src={userDetails?.pic}
                  // alt="your image"
                  className={classes.user_image}
                /> */}
                <div className={classes.nameContainer}>
                  <p className={classes.user_name}>{userDetails?.name}</p>
                  <p className={classes.user_id}>
                    User name {userDetails?.user_id}
                  </p>
                </div>
                {/* <ArrowDropDownIcon
                  style={{
                    transition: "0.3s",
                    transform: `rotate(${Arrow ? 180 : 0}deg)`,
                    marginTop: "2px",
                    fill: "white",
                  }}
                /> */}
              </div>
              {Arrow && (
                <Menu className={muiStyle.Menu} open={Arrow}>
                  <MenuItem
                    onClick={() => {
                      navigate("/dashboard/profile/my_profile");
                    }}
                    className={muiStyle.menuList}
                  >
                    <div className={classes.perofile_icons}>
                      <img src={person} alt="person" />
                      <p>Profile</p>
                    </div>
                    <div className={classes.borderBottom} />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/dashboard/profile/change_password");
                    }}
                    className={muiStyle.menuList}
                  >
                    <div className={classes.perofile_icons}>
                      <img src={changepassword} alt="changepassword" />
                      <p>Change Password</p>
                    </div>
                    <div className={classes.borderBottom} />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setdeleteModal({
                        modal: true,
                        id: "",
                      });
                    }}
                    className={muiStyle.menuList}
                  >
                    <div className={classes.profileLogout}>
                      <img
                        src={logout}
                        width="17px"
                        height="17px"
                        alt="password"
                        style={{ marginRight: "8px" }}
                      />
                      <p style={{ marginTop: "-1px" }}>Logout</p>
                    </div>
                  </MenuItem>
                </Menu>
              )}
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}
