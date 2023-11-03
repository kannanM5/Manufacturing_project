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
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import dropdownarrow from "../../Assets/Icons/Svg/dropdownarrow.svg";
import dropdownUparrow from "../../Assets/Icons/Svg/dropdownUparrow.svg";
import dash from "../../Assets/Icons/Svg/Dashboard.svg";
import manage from "../../Assets/Icons/Svg/manage.svg";
import workorder from "../../Assets/Icons/Svg/workorder.svg";
import logout2 from "../../Assets/Icons/Svg/logout2.svg";
import instance from "../../Services/Axios";
import defaultProfileImg from "../../Assets/Images/Png/dummy.png";
import { getCookie, setCookie } from "../../Store/Storage/Cookie";
import { muiStyles } from "../../Utility/Constants";
// import { LogoutConfirmationModal } from "../../Modals";
import { GlobalModal } from "../../Components";
import menuIcon from "../../Assets/Icons/png/menuIcon.png";
import classes from "./header.module.css";
import GetPrepareReport from "../../Modals/GetPrepareReport";
import LogoutConfirmationModal from "../../Modals/LogoutConfirmationModal";
import CompanyLogo from "../../Assets/Images/Png/VTLogo.jpg";
import create_account from "../../Assets/Icons/SvgIcons/create_account.svg";
import change_password from "../../Assets/Icons/SvgIcons/change_password.svg";
import logout from "../../Assets/Icons/SvgIcons/logout.svg";
import { useEmployeeId, useToken, useUserName } from "../../Utility/StoreData";
import { signOut } from "../../Services/Services";
import { handleStoreUserData } from "../../Store/Reducers/LoginReducer";

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
    paddingTop: "8px !important",
    paddingBottom: "8px !important",
  },
}));
export default function Header() {
  const token = useToken();
  const userId = useEmployeeId();
  const userName = useUserName();
  console.log(token, "userName");
  const { REACT_APP_BASEURL } = process.env;
  const styles = muiStyles();
  const muiStyle = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [managementActive, setmanagementActive] = useState(false);
  const [reportActive, setreportActive] = useState(false);
  const [Arrow, setArrow] = useState(false);
  const [isShowModal, setIsShowModal] = useState({
    status: false,
    data: null,
  });
  const [deleteModal, setdeleteModal] = useState({
    modal: false,
    id: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [prepareInsepection, setPrepareInsepection] = useState(false);
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
  const userInformation = [
    {
      id: 1,
      name: "Create Account",
      photo: create_account,
      pathname: "/employee_list",
    },
    {
      id: 2,
      name: "Change Password",
      photo: change_password,
      pathname: "/change_password",
    },
    {
      id: 3,
      name: "Logout",
      photo: logout,
    },
  ];
  const menuData = [
    {
      id: 1,
      name: "List Of Products",
      naviagationPath: "/product_list",
    },

    {
      id: 2,
      name: "Inspection Criteria",
      naviagationPath: "/inspection_criteria",
    },

    {
      id: 3,
      name: "Prepare Inspection Report",
      naviagationPath: "/Prepareinscepectionreport",
    },
    {
      id: 4,
      name: "Export",
      naviagationPath: "/export_page",
    },
  ];

  const hamburgerData = [
    {
      id: 1,
      name: "List of Products",
      naviagationPath: "/product_list",
      icon: dash,
      isVisible: true,
      privatePermission: true,
    },
    {
      id: 2,
      name: "Inspection Criteria",
      naviagationPath: "/inspection_criteria",
      downarrow: dropdownarrow,
      uparrow: dropdownUparrow,
      icon: manage,
      isVisible: true,
    },
    {
      id: 3,
      name: "Prepare Inspection Report",
      pathname: "Prepareinscepectionreport",
      naviagationPath: "/Workorder",
      icon: workorder,
      privatePermission: true,
      isVisible: loginUserData?.work_orders === 1 ? true : false,
      prepareInpectionSubHead: [
        {
          id: 31,
          name: "Incoming Inspection Report",
          navigationPath: "/incoming_inspection_report",
        },
        {
          id: 32,
          name: "Setting Approval Report",
          navigationPath: "/setting_approval_report",
        },
        {
          id: 33,
          name: "Line Inspection Report",
          navigationPath: "/line_inspection_report",
        },
        {
          id: 34,
          name: "Final Inspection Report",
          navigationPath: "/final_inspection_report",
        },
      ],
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
    // setloader(true);
    let formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    signOut(formData).then((response) => {
      dispatch(handleStoreUserData(null));
    });
    setCookie("vt_enterprise_login", "");
    document.cookie =
      "mconnect_user_data" + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
    navigate("/");
  };

  return (
    <>
      {/* {isShowModal?.status && (
        <GlobalModal
          size="md"
          ModalStyle="modalMDMaxWidth"
          isVisible={isShowModal.status}
          setIsVisible={() => {
            setIsShowModal((prev) => {
              return {
                ...prev,
                status: true,
              };
            });
          }}
        >
          <GetPrepareReport
            modalClose={() => {
              setIsShowModal((prev) => {
                return {
                  ...prev,
                  status: false,
                };
              });
            }}
            heading={"Get Report"}
            onClose={() => {
              setIsShowModal((prev) => {
                return {
                  ...prev,
                  status: false,
                };
              });
            }}
          />
        </GlobalModal>
      )} */}
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
        <LogoutConfirmationModal
          msg={"Are you sure do you want to Logout."}
          onClose={() => {
            setdeleteModal((prev) => {
              return {
                ...prev,
                modal: false,
              };
            });
          }}
          onPositiveButtonPressed={handleLogout}
          onNegativeButtonPressed={() => {
            setdeleteModal((prev) => {
              return {
                ...prev,
                modal: false,
              };
            });
          }}
        />
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
                <p>User Name</p>
                <button onClick={toggleShow} className="btn-close" />
              </div>

              <div className={classes.child2}>
                {hamburgerData.map((ele, i) => {
                  return (
                    <div key={ele.id.toString()}>
                      <div
                        onClick={() => {
                          setPrepareInsepection(!prepareInsepection);
                        }}
                        // onClick={() => {
                        //   if (ele.id === 3) {
                        //     setmanagementActive(!managementActive);
                        //     setreportActive(false);
                        //   } else if (ele?.id === 4) {
                        //     setmanagementActive(false);
                        //     setreportActive((pre) => !pre);
                        //   } else {
                        //     setmanagementActive(false);
                        //     setreportActive(false);
                        //     if (ele?.naviagationPath) {
                        //       navigate(ele?.naviagationPath);
                        //     }
                        //     toggleShow();
                        //   }
                        // }}
                      >
                        <div className={classes.sideMenu}>
                          <div className={classes.menu_content}>
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
                              (ele.id === 3 &&
                                [
                                  "/Prepareinscepectionreport/incoming_inspection_report",
                                  "/Prepareinscepectionreport/final_inspection_report",
                                  "/Prepareinscepectionreport/setting_approval_report",
                                  "/Prepareinscepectionreport/line_inspection_report",
                                ].includes(pathname)),
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Drawer>
          </div>
        </div>
        <div className={classes.content}>
          <div
            style={{
              height: "65px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={CompanyLogo}
              alt="logo"
              style={{ width: 40, height: 40 }}
            />
            <h4
              style={{ color: "black", marginLeft: "10px", cursor: "pointer" }}
            >
              V.T. ENTERPRISE
            </h4>
          </div>
          <div className={classes.child2}>
            {/* {menuData.map((ele, i) => {
              return (
                <>
                  <div
                    onClick={() => {
                      if (ele?.id === 3) {
                        navigate(ele?.naviagationPath);
                        setIsShowModal((prev) => {
                          return {
                            ...prev,
                            status: true,
                          };
                        });
                      } else {
                        navigate(ele?.naviagationPath);
                      }
                    }}
                    className={classes.tablist}
                    key={i}
                  >
                    <p style={{ cursor: "pointer" }}>{ele?.name}</p>
                  </div>
                </> */}
            {menuData.map((ele, i) => {
              return (
                <TabContext value={pathname} key={i}>
                  <div className={"headerTab"}>
                    <TabList
                      onChange={handleTabChange}
                      aria-label="lab API tabs example"
                      className={
                        ele.naviagationPath === pathname
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
                          ele.naviagationPath === pathname
                            ? `${styles.activeTab}`
                            : ""
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
            {/* );
            })} */}
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
                  <p className={classes.user_name}>User Name : {userName}</p>
                </div>
                <ArrowDropDownIcon
                  style={{
                    transition: "0.3s",
                    transform: `rotate(${Arrow ? 180 : 0}deg)`,
                    marginTop: "2px",
                    fill: "black",
                    // backgroundColor: "black",
                  }}
                />
              </div>
              {Arrow && (
                <Menu
                  className={muiStyle.Menu}
                  open={Arrow}
                  style={{
                    marginTop: "1px",
                  }}
                >
                  {userInformation.map((ele, index) => (
                    <MenuItem>
                      <div
                        onClick={() => {
                          if (ele?.id === 3) {
                            setdeleteModal((prev) => {
                              return {
                                ...prev,
                                modal: true,
                              };
                            });
                          } else {
                            navigate(ele?.pathname);
                          }
                        }}
                        className={muiStyle.menuList}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          // marginBottom: "8px",
                        }}
                      >
                        <img
                          src={ele?.photo}
                          width="20px"
                          height="20px"
                          alt="password"
                          style={{ marginRight: "8px" }}
                        />
                        <p style={{ marginBottom: "3px" }}>{ele?.name}</p>
                      </div>
                    </MenuItem>
                  ))}
                  {/* <MenuItem
                    onClick={() => {
                      setdeleteModal({
                        modal: true,
                        id: "",
                      });
                    }}
                    className={muiStyle.menuList}
                  >
                    <div className={classes.profileLogout}>
                      <div style={{ display: "flex", marginBottom: 7 }}>
                        <img
                          src={defaultProfileImg}
                          width="17px"
                          height="17px"
                          alt="password"
                          style={{ marginRight: "8px" }}
                        />
                        <p style={{ marginBottom: "3px" }}>Create account</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img
                          src={logout}
                          width="17px"
                          height="17px"
                          alt="password"
                          style={{ marginRight: "8px" }}
                        />
                        <p style={{ marginTop: "2px" }}>Logout</p>
                      </div>
                    </div>
                  </MenuItem> */}
                </Menu>
              )}
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}
