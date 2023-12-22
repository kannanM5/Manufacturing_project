import React, { useEffect, useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import classes from "./Management.module.css";
import { GlobalModal, Loader } from "../../Components";
import AddEmployee from "../../Modals/AddEmployee";
import EmployeeChangePassword from "../../Modals/EmployeeChangePassword";
import { employeeList } from "../../Services/Services";
import { getCatchMsg } from "../../Utility/GeneralUtils";
import chagepassword_Icon from "../../Assets/Icons/SvgIcons/password_key.svg";
import CustomPagination from "../../Components/CustomPagination";
import NoDataFound from "../../Components/NoDataFound";
import { getTableSNO } from "../../Utility/Constants";
import {
  useEmployeeId,
  useEmployeeType,
  useToken,
} from "../../Utility/StoreData";
import { getCookie } from "../../Store/Storage/Cookie";

function EmployeeList() {
  const token = useToken();
  const userId = useEmployeeId();
  const userType = useEmployeeType();
  const [isShowModal, setIsShowModal] = useState({
    status: false,
    changePasswordStatus: false,
    id: "",
  });
  const [page, setPage] = useState(0);
  const [listOfEmployees, setListOfEmployees] = useState();
  const [loader, setloader] = useState(false);

  useEffect(() => {
    handleGetEmployeeList();
  }, []);

  const loginUserData = getCookie("vt_enterprise_login")
    ? getCookie("vt_enterprise_login")?.data
    : null;

  const handleGetEmployeeList = (page = 1) => {
    setloader(true);
    let formData = new FormData();
    formData.append("id", loginUserData?.user_id);
    formData.append("token", loginUserData?.token);
    formData.append("user_type", loginUserData?.user_type);
    // formData.append("id", userId);
    // formData.append("token", token);
    // formData.append("user_type", userType);
    formData.append("limit", 10);

    console.log(formData, "FORMDATA");
    employeeList(page, formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          setPage(parseInt(response?.data?.data?.page) - 1);
          setListOfEmployees(response?.data?.data);
        } else if (response?.data?.status === 0) {
          setListOfEmployees(null);
        }
      })
      .catch((err) => {
        getCatchMsg(err);
      })
      .finally(() => {
        setloader(false);
      });
  };

  const handleSortByType = (userType) => {
    return userType === 1
      ? "Super admin"
      : userType === 2
      ? "Admin"
      : "Line inspector";
  };

  return (
    <>
      {loader ? <Loader /> : null}
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
      <div className={classes.insepectionCreteria}>
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
              {listOfEmployees?.items.length > 0 ? (
                listOfEmployees?.items.map((emp, index) => (
                  <tr key={index}>
                    <td>
                      {getTableSNO(parseInt(listOfEmployees?.page), 10, index)}
                    </td>
                    <td>{emp?.name}</td>
                    <td>{handleSortByType(emp?.user_type)}</td>
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
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <NoDataFound />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {listOfEmployees?.totalPage > 1 && (
        <CustomPagination
          pageCount={listOfEmployees?.totalPage}
          currentpage={page}
          forcePage={page}
          onPageChange={(val) => {
            handleGetEmployeeList(val + 1);
          }}
        />
      )}
    </>
  );
}

export default EmployeeList;
