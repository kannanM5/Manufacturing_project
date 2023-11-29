import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import dash from "../../Assets/Icons/Svg/Dashboard.svg";
import { getCookie, setCookie } from "../../Store/Storage/Cookie";
import { GlobalModal } from "../../Components";
import export_icon from "../../Assets/Icons/SvgIcons/export_icon.svg";
import prepare_report_icon from "../../../src/Assets/Icons/SvgIcons/prepare_report_icon.svg";
import incoming_icon from "../../Assets/Icons/SvgIcons/incoming_Icon.svg";
import menuIcon from "../../Assets/Icons/SvgIcons/menuIcon.svg";
import classes from "./header.module.css";
import LogoutConfirmationModal from "../../Modals/LogoutConfirmationModal";
import CompanyLogo from "../../Assets/Images/Png/VTLogo.jpg";
import create_account from "../../Assets/Icons/SvgIcons/create_account.svg";
import change_password from "../../Assets/Icons/SvgIcons/change_password.svg";
import logout from "../../Assets/Icons/SvgIcons/logout.svg";
import { useEmployeeId, useToken, useUserName } from "../../Utility/StoreData";
import { signOut } from "../../Services/Services";
import { handleStoreUserData } from "../../Store/Reducers/LoginReducer";
import { Drawer, Menu, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import MenuItem from "antd/es/menu/MenuItem";

export default function Header() {
  const token = useToken();
  const userId = useEmployeeId();
  const userName = useUserName();
  const { REACT_APP_BASEURL } = process.env;
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
      id: 5,
      name: "Saved Logs",
      naviagationPath: "/saved_logs",
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
      icon: incoming_icon,
      isVisible: true,
    },
    {
      id: 3,
      name: "Prepare Inspection Report",
      pathname: "Prepareinscepectionreport",
      naviagationPath: "/Prepareinscepectionreport",
      icon: prepare_report_icon,
      privatePermission: true,
      isVisible: loginUserData?.work_orders === 1 ? true : false,
    },
    {
      id: 4,
      name: "Export",
      naviagationPath: "/export_page",
      icon: export_icon,
      isVisible: true,
    },
    {
      id: 5,
      name: "Create Account",
      naviagationPath: "/employee_list",
      icon: create_account,
      isVisible: true,
    },
    {
      id: 6,
      name: "Change Password",
      naviagationPath: "/change_password",
      icon: change_password,
      isVisible: true,
    },
    {
      id: 7,
      name: "Logout",
      icon: logout,
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
  const handleNavigateTabs = (data) => {
    const getPath = menuData.find((ele) => ele?.id == data)?.naviagationPath;
    navigate(getPath);
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
        CustomWidth={500}
        isOpen={deleteModal.modal}
        onCancel={() => {
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
          <div className={classes.sideMenuLogo}>
            {/* <img src={CompanyLogo} alt="logo" /> */}
            <h4
              style={{ color: "black", marginLeft: "10px", cursor: "pointer" }}
            >
              V.T. ENTERPRISE
            </h4>
          </div>
          <div className={classes.offcanvas}>
            <Drawer open={show} onClose={toggleShow}>
              <div className={classes.child3}>
                <p>{userName}</p>
                <button onClick={toggleShow} className="btn-close" />
              </div>

              <div className={classes.child2}>
                {hamburgerData.map((ele, i) => {
                  return (
                    <div key={ele.id.toString()}>
                      <div
                        onClick={() => {
                          if (ele?.id === 7) {
                            setdeleteModal((prev) => {
                              return {
                                ...prev,
                                modal: true,
                              };
                            });
                          } else {
                            toggleShow();
                            navigate(ele?.naviagationPath);
                          }
                        }}
                      >
                        <div className={classes.sideMenu}>
                          <div className={classes.menu_content}>
                            <img
                              style={{
                                width: "20px",
                                height: "20px",
                              }}
                              src={ele?.icon}
                              alt="icons"
                            ></img>
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
            <Tabs
              activeKey={menuData
                .find((ele) => ele?.naviagationPath === pathname)
                ?.id.toString()}
              defaultActiveKey={menuData
                .find((ele) => ele?.naviagationPath === pathname)
                ?.id.toString()}
              onChange={(value) => handleNavigateTabs(value)}
              tabBarStyle={{ marginBottom: 0 }}
            >
              {menuData.map((item) => (
                <TabPane tab={item?.name} key={item.id} />
              ))}
            </Tabs>
            {/* {menuData.map((ele, i) => {
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
            })} */}
          </div>
          <div>
            <div
              onClick={() => {
                setArrow((pre) => !pre);
              }}
              style={{ padding: "5px" }}
            >
              <div
                className={classes.tabContent}
                style={{
                  padding: "4px",
                  display: "flex",
                  cursor: "pointer",
                }}
              >
                <div className={classes.nameContainer}>
                  <p className={classes.user_name}>User Name : {userName}</p>
                </div>
                {/* <ArrowDropDownIcon
                  style={{
                    transition: "0.3s",
                    transform: `rotate(${Arrow ? 180 : 0}deg)`,
                    marginTop: "2px",
                    fill: "black",
                  }}
                /> */}
              </div>
              {Arrow && (
                <Menu
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
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
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
                </Menu>
              )}
              {/* i chnage in grid under div*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
