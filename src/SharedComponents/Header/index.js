import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import dash from "../../Assets/Icons/SvgIcons/dash.svg";
import { getCookie, setCookie } from "../../Store/Storage/Cookie";
import { GlobalModal, Loader } from "../../Components";
import export_icon from "../../Assets/Icons/SvgIcons/export_icon.svg";
import prepare_report_icon from "../../../src/Assets/Icons/SvgIcons/prepare_report_icon.svg";
// import incoming_icon from "../../Assets/Icons/SvgIcons/incoming_icon.svg";
import incoming_icon from "../../Assets/Icons/SvgIcons/change_password.svg";
import menuIcon from "../../Assets/Icons/SvgIcons/menuIcon.svg";
import classes from "./header.module.css";
import LogoutConfirmationModal from "../../Modals/LogoutConfirmationModal";
import CompanyLogo from "../../Assets/Images/VTLogo.svg";
import create_account from "../../Assets/Icons/SvgIcons/create_account.svg";
import change_password from "../../Assets/Icons/SvgIcons/change_password.svg";
import logout from "../../Assets/Icons/SvgIcons/logout.svg";
import { useEmployeeId, useToken, useUserName } from "../../Utility/StoreData";
import { signOut } from "../../Services/Services";
import { handleStoreUserData } from "../../Store/Reducers/LoginReducer";
import { Drawer, Tabs } from "antd";
import dummyIcon from "../../Assets/Icons/SvgIcons/dummy.svg.svg";
import { getCatchMsg } from "../../Utility/GeneralUtils";
import { Dropdown, Space } from "antd";
import {
  LockOutlined,
  LogoutOutlined,
  CaretDownOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

export default function Header() {
  const token = useToken();
  const userId = useEmployeeId();
  const userName = useUserName();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loader, setloader] = useState(false);
  const [currenetTab, setcurrentTab] = useState(null);
  const [Arrow, setArrow] = useState(false);
  const [deleteModal, setdeleteModal] = useState({
    modal: false,
    id: "",
  });

  const loginUserData = getCookie("vt_enterprise_login")
    ? getCookie("vt_enterprise_login")?.data
    : null;

  const menuData = [
    {
      key: "1",
      label: "List Of Products",
      naviagationPath:
        loginUserData?.user_type !== 3 ? "/product_list" : "/dashboard",
      isVisible: loginUserData?.user_type !== 3 ? true : false,
    },

    {
      key: "2",
      label: "Inspection Criteria",
      naviagationPath:
        loginUserData?.user_type !== 3 ? "/inspection_criteria" : "/dashboard",
      isVisible: loginUserData?.user_type !== 3 ? true : false,
    },

    {
      key: "3",
      label: "Prepare Inspection Report",
      naviagationPath: "/prepare_inspection_report",
      isVisible: loginUserData?.user_type !== 3 ? true : false,
    },

    {
      key: "4",
      label: "Saved Logs",
      naviagationPath: "/saved_logs",
      isVisible: loginUserData?.user_type !== 3 ? true : false,
    },
    {
      key: "5",
      label: "Export",
      naviagationPath: "/export_page",
      isVisible: loginUserData?.user_type !== 3 ? true : false,
    },
  ];

  const filteredItems = [
    {
      key: "1",
      label: "Create Account",
      icon: <UserAddOutlined />,
    },
    {
      key: "2",
      label: "Change Password",
      icon: <LockOutlined />,
    },
    {
      key: "3",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
  ];
  const items =
    loginUserData?.user_type !== 3 ? filteredItems : filteredItems.slice(2);

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
      pathname: "prepare_inspection_report",
      naviagationPath: "/prepare_inspection_report",
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

  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
  };

  const handleLogout = () => {
    setloader(true);
    let formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    signOut(formData)
      .then((response) => {
        dispatch(handleStoreUserData(null));
      })
      .catch((err) => {
        getCatchMsg(err);
      })
      .finally(() => {
        setloader(false);
      });
    setCookie("vt_enterprise_login", "");
    document.cookie =
      "mconnect_user_data" + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
    navigate("/");
  };

  const handleNavigateTabs = (data) => {
    setcurrentTab(parseInt(data));
    const getPath = menuData.find(
      (ele) => parseInt(ele?.key) === parseInt(data)
    )?.naviagationPath;
    navigate(getPath);
  };
  const onClick = (value) => {
    if (parseInt(value.key) === 1) {
      navigate("/employee_list");
    } else if (parseInt(value.key) === 2) {
      navigate("/change_password");
    } else if (parseInt(value.key) === 3) {
      setdeleteModal((prev) => {
        return {
          ...prev,
          modal: true,
        };
      });
    }
  };

  useEffect(() => {
    if (pathname === "/product_list") {
      setcurrentTab("1");
    } else if (pathname === "/inspection_criteria") {
      setcurrentTab("2");
    } else if (pathname === "/prepare_inspection_report") {
      setcurrentTab("3");
    } else if (pathname === "/saved_logs") {
      setcurrentTab("4");
    } else if (pathname === "/export_page") {
      setcurrentTab("5");
    } else {
      setcurrentTab(null);
    }
  }, [pathname]);
  return (
    <>
      {loader ? <Loader /> : null}
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
          msg={"Are you sure do you want to logout"}
          closeIcon={false}
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
            <h5
              style={{ color: "black", marginLeft: "10px", cursor: "pointer" }}
            >
              V.T. ENTERPRISE
            </h5>
          </div>
          <div className={classes.offcanvas}>
            <Drawer
              open={show}
              onClose={toggleShow}
              placement="left"
              closeIcon={false}
            >
              <div className={classes.child3}>
                <div style={{ display: "flex" }}>
                  <img
                    src={dummyIcon}
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                    alt="icon"
                  />
                  <p
                    style={{
                      padding: "0 5px",
                      textAlign: "center",
                      alignSelf: "center",
                      fontFamily: "var(--fontMedium)",
                    }}
                  >
                    {userName}
                  </p>
                </div>
                <button
                  onClick={toggleShow}
                  className="btn-close"
                  style={{
                    width: "10px",
                    height: "10px",
                  }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "black",
                  marginTop: "20px",
                }}
              ></div>

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
                                ele.name === "Logout" &&
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
            onClick={() => navigate("/dashboard")}
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
            <h5
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                color: "black",
              }}
            >
              V.T. ENTERPRISE
            </h5>
          </div>
          <div className={classes.child2}>
            <Tabs
              items={menuData}
              activeKey={
                currenetTab
                  ? currenetTab
                  : pathname === "/export_page/view_reports"
                  ? "5"
                  : ""
              }
              onChange={(value) => {
                handleNavigateTabs(value);
                setcurrentTab(parseFloat(value));
              }}
              tabBarStyle={{ marginBottom: 0 }}
            />
          </div>
          <div>
            <div
              onClick={() => {
                setArrow((pre) => !pre);
              }}
            >
              <div
                className={classes.tabContent}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "65px",
                  cursor: "pointer",
                }}
              >
                <div className={classes.nameContainer}>
                  <Dropdown menu={{ items, onClick }} trigger={["click"]}>
                    <a
                      onClick={(e) => {
                        console.log(e, "EEEEEE");
                      }}
                    >
                      <img
                        src={dummyIcon}
                        alt="Profile icon"
                        className={classes.dummyImage}
                      />

                      <Space
                        style={{
                          color: "black",
                          padding: "0 8px",
                          fontFamily: "var(--fontMedium)",
                        }}
                      >
                        {userName}
                        <CaretDownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
