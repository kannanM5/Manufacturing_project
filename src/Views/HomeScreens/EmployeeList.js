import React, { useEffect, useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import classes from "./Management.module.css";
import { GlobalModal } from "../../Components";
import AddEmployee from "../../Modals/AddEmployee";
import EmployeeChangePassword from "../../Modals/EmployeeChangePassword";
import { employeeList } from "../../Services/Services";
import { getCookie } from "../../Store/Storage/Cookie";
import { getCatchMsg } from "../../Utility/GeneralUtils";
import chagepassword_Icon from "../../Assets/Icons/SvgIcons/password_key.svg";
function EmployeeList() {
  const [isShowModal, setIsShowModal] = useState({
    status: false,
    changePasswordStatus: false,
    id: "",
  });
  const [listOfEmployees, setListOfEmployees] = useState();
  // const userType = [
  //   {
  //     value: "1",
  //     label: "Admin",
  //   },
  //   {
  //     value: "2",
  //     label: "Line Inspector",
  //   },
  // ];
  const cookieData = getCookie("vt_enterprise_login");

  const handleGetEmployeeList = (page = 1) => {
    // setloader(true);
    let formData = new FormData();
    formData.append("id", cookieData?.data?.user_id);
    formData.append("token", cookieData?.data?.token);
    formData.append("user_type", cookieData?.data?.user_type);
    formData.append("limit", 10);
    employeeList(page, formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          setListOfEmployees(response?.data?.data);
        }
      })
      .catch((err) => {
        getCatchMsg(err);
      })
      .finally(() => {
        // setloader(false);
      });
  };
  useEffect(() => {
    handleGetEmployeeList();
  }, []);
  return (
    <>
      <PageHeader
        secondBtn={false}
        heading={"Employee List"}
        Btntitle={"Add Employee"}
        modal={() => {
          setIsShowModal((prev) => {
            return {
              ...prev,
              status: true,
              id: null,
            };
          });
        }}
      />
      <GlobalModal
        title={"Add Employee"}
        isOpen={isShowModal.status}
        onCancel={() => {
          setIsShowModal((prev) => {
            return {
              ...prev,
              status: false,
            };
          });
        }}
      >
        <AddEmployee
          listApiCall={handleGetEmployeeList}
          modalClose={() => {
            setIsShowModal((prev) => {
              return {
                ...prev,
                status: false,
              };
            });
          }}
        />
      </GlobalModal>
      <GlobalModal
        CustomWidth={500}
        title={"Change Password"}
        isOpen={isShowModal.changePasswordStatus}
        onCancel={() => {
          setIsShowModal((prev) => {
            return {
              ...prev,
              changePasswordStatus: false,
            };
          });
        }}
      >
        <EmployeeChangePassword
          employeeId={isShowModal?.id}
          modalClose={() => {
            setIsShowModal((prev) => {
              return {
                ...prev,
                changePasswordStatus: false,
              };
            });
          }}
        />
      </GlobalModal>
      <div className={`table-responsive ${classes.Dashboard}`}>
        <table className={classes.listOfTable}>
          <thead className={classes.NormalTable}>
            <tr>
              <th>S.No</th>
              <th>Employee Name</th>
              <th>Employee Type</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listOfEmployees?.items.map((emp, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{emp?.name}</td>
                <td>{emp?.user_type}</td>
                <td>{emp?.email}</td>
                <td>
                  <div className={classes.icons}>
                    <img
                      src={chagepassword_Icon}
                      alt="edit_icon"
                      onClick={() => {
                        setIsShowModal((prev) => {
                          return {
                            ...prev,
                            changePasswordStatus: true,
                            id: emp?.id,
                          };
                        });
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {listOfEmployees?.data?.items?.length ? (
        <CustomPagination
          page={page}
          pageCount={deviceList?.data?.total_page}
          handleFunction={(selected) => {
            setPage(selected);
            handleListOfDevice(selected);
          }}
        />
      ) : null} */}
    </>
  );
}

export default EmployeeList;
