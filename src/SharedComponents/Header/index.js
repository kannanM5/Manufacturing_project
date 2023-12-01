import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import dash from "../../Assets/Icons/Svg/Dashboard.svg";
import { getCookie, setCookie } from "../../Store/Storage/Cookie";
import { GlobalModal, Loader } from "../../Components";
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
import dummyIcon from "../../Assets/Images/Png/dummy.png";
import downArrow from "../../Assets/Icons/SvgIcons/dropdownarrow.svg";
import downUpArrow from "../../Assets/Icons/SvgIcons/dropUpArrow.svg";
import { getCatchMsg } from "../../Utility/GeneralUtils";

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
  const loginUserData = getCookie("mconnect_user_data")
    ? JSON.parse(getCookie("mconnect_user_data"))?.permission
    : null;

  // const getManagementInitialRoute = () => {
  //   const loginUserData = getCookie("mconnect_user_data")
  //     ? JSON.parse(getCookie("mconnect_user_data"))?.permission
  //     : null;
  //   const manageSubheadingData = [
  //     {
  //       pathname: "/dashboard/management/device",
  //       isVisible: loginUserData?.device === 1 ? true : false,
  //     },
  //     {
  //       pathname: "/dashboard/management/machine",
  //       isVisible: loginUserData?.machine === 1 ? true : false,
  //     },
  //     {
  //       pathname: "/dashboard/management/employee_management",
  //       isVisible: loginUserData?.employee === 1 ? true : false,
  //     },
  //     {
  //       pathname: "/dashboard/management/shift",
  //       isVisible: loginUserData?.shift === 1 ? true : false,
  //     },
  //     {
  //       pathname: "/dashboard/management/work_shedule",
  //       isVisible: loginUserData?.work_orders === 1 ? true : false,
  //     },
  //   ];

  //   let refData = [...manageSubheadingData];
  //   refData = refData.filter((ele) => ele.isVisible);
  //   return refData.length > 0 ? refData?.[0]?.pathname : "/dashboard";
  // };

  const userInformation = [
    {
      key: 1,
      label: "Create Account",
      photo: create_account,
      pathname: "/employee_list",
    },
    {
      key: 2,
      label: "Change Password",
      photo: change_password,
      pathname: "/change_password",
    },
    {
      key: 3,
      label: "Logout",
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
      name: "Saved Logs",
      naviagationPath: "/saved_logs",
    },
    {
      id: 5,
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
    setcurrentTab(data);
    const getPath = menuData.find(
      (ele) => ele?.id === parseInt(data)
    )?.naviagationPath;
    navigate(getPath);
  };
  const handleClick = (e) => {
    setArrow((prev) => !prev);
    if (parseInt(e.key) === 3) {
      setdeleteModal((prev) => {
        return {
          ...prev,
          modal: true,
        };
      });
    } else if (parseInt(e.key) == 2) {
      navigate("/change_password");
    } else {
      navigate("/employee_list");
    }
  };
  useEffect(() => {
    if (pathname === "/product_list") {
      setcurrentTab("1");
    } else if (pathname === "/inspection_criteria") {
      setcurrentTab("2");
    } else if (pathname === "/Prepareinscepectionreport") {
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
            <h5
              style={{ color: "white", marginLeft: "10px", cursor: "pointer" }}
            >
              V.T. ENTERPRISE
            </h5>
          </div>
          <div className={classes.offcanvas}>
            <Drawer open={show} onClose={toggleShow} placement="left">
              {/* <div className={classes.child3}>
                <p>{userName}</p>
                <button onClick={toggleShow} className="btn-close" />
              </div> */}

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
            <h5
              style={{ color: "white", marginLeft: "10px", cursor: "pointer" }}
            >
              V.T. ENTERPRISE
            </h5>
          </div>
          <div className={classes.child2}>
            <Tabs
              activeKey={currenetTab ? currenetTab : ""}
              onChange={(value) => handleNavigateTabs(value)}
              tabBarStyle={{ marginBottom: 0 }}
            >
              {menuData.map((item) => (
                <TabPane
                  tab={item?.name}
                  key={item.id}
                  style={{ margin: 0, color: "white" }}
                />
              ))}
            </Tabs>
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
                  <img
                    src={dummyIcon}
                    alt="dummy"
                    className={classes.dummyImage}
                  />
                  <p className={classes.user_name}>{userName}</p>
                  <img
                    src={Arrow ? downUpArrow : downArrow}
                    alt="downArrow"
                    className={classes.downArrow}
                  />
                </div>
              </div>
              {Arrow && <Menu items={userInformation} onClick={handleClick} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
