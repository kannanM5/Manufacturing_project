import React, { useEffect, useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import classes from "./Management.module.css";
import { GlobalModal, Loader } from "../../Components";
import EditIcon from "../../Assets/Icons/SvgIcons/edit.svg";
import {
  useEmployeeId,
  useEmployeeType,
  useToken,
} from "../../Utility/StoreData";
import { productsList } from "../../Services/Services";
import { getCatchMsg } from "../../Utility/GeneralUtils";
import AddProducts from "../../Modals/AddProducts";
import CustomPagination from "../../Components/CustomPagination";
import CustomToolTip from "../../Components/CustomToolTip";
import {
  NAMES,
  REGEXNUMBERSPATTERN,
  getTableSNO,
} from "../../Utility/Constants";
import NoDataFound from "../../Components/NoDataFound";

function ListOfProducts() {
  const token = useToken();
  const userId = useEmployeeId();
  const userType = useEmployeeType();
  const [page, setPage] = useState(0);
  const [loader, setloader] = useState(false);
  const [listOfProducts, setListOfProducts] = useState();
  const [isShowModal, setIsShowModal] = useState({
    status: false,
    data: null,
  });

  useEffect(() => {
    if (token) handleGetProductsList();
  }, [token]);

  const dropData = [
    {
      key: "1",
      label: "employee",
    },
    {
      key: "2",
      label: "change",
    },
    {
      key: "3",
      label: "logout",
    },
  ];

  const handleGetProductsList = (page = 1, limit = 10) => {
    setloader(true);
    const formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("limit", limit);
    productsList(page, formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          setPage(response?.data?.data?.page - 1);
          setListOfProducts(response?.data?.data);
          // toast.success(response?.data?.msg);
        }
      })
      .catch((err) => {
        getCatchMsg(err);
      })
      .finally(() => {
        setloader(false);
      });
  };

  const handleCheck = (spec, data) => {
    const getSpecialChar = ["+", "-", "*", "/", "±"];
    if (NAMES.test(spec)) {
      return "black";
    } else if (REGEXNUMBERSPATTERN.test(spec)) {
      const containsSpecialChar = getSpecialChar
        .filter((char) => spec.includes(char))
        .find((ele) => ele);
      const temp = spec.split(containsSpecialChar);
      const valueOne = temp[0];
      const valueTwo = temp[1];
      const AddValue = parseInt(valueOne) + parseInt(valueTwo);
      console.log(containsSpecialChar, AddValue, "VALUEEEE");
      const SubractValue = parseInt(valueOne) - parseInt(valueTwo);
      if (
        containsSpecialChar === "+" &&
        parseInt(AddValue) === parseInt(data)
      ) {
        return "BLACK1";
      } else if (
        containsSpecialChar === "-" &&
        parseInt(SubractValue) === parseInt(data)
      ) {
        return "BLACK2";
      } else if (
        containsSpecialChar === "±" &&
        parseInt(AddValue) >= parseInt(data) &&
        parseInt(data) >= parseInt(SubractValue)
      ) {
        return "BLACK3";
      }
      return "check red";
    } else {
      return "whole else";
    }
  };
  return (
    <>
      {loader ? <Loader /> : null}
      <PageHeader
        secondBtn={false}
        Btntitle={"Add Product"}
        modal={() => {
          setIsShowModal((prev) => {
            return {
              ...prev,
              status: true,
              data: null,
            };
          });
        }}
        heading={"List Of Products"}
      />
      <GlobalModal
        title={`${isShowModal.data ? "Edit" : "Add"} Product`}
        isOpen={isShowModal.status}
        // CustomWidth={500}
        onCancel={() => {
          setIsShowModal((prev) => {
            return {
              ...prev,
              status: false,
            };
          });
        }}
      >
        <AddProducts
          listApiCall={handleGetProductsList}
          editData={isShowModal?.data}
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
      <div style={{ margin: "20px 0" }}>
        <div className={`table-responsive ${classes.Dashboard}`}>
          <table className={classes.listOfTable}>
            <thead className={classes.NormalTable}>
              <tr>
                <th>S.No</th>
                <th>Part No</th>
                <th>Part Name</th>
                <th>Customer</th>
                <th>Drawing Issue No</th>
                <th>Customer Part No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listOfProducts?.items.length > 0 ? (
                listOfProducts?.items.map((products, index) => (
                  <tr key={index}>
                    <td>{getTableSNO(listOfProducts?.page, 10, index)}</td>
                    <td>{products?.part_no}</td>
                    <td>{products?.part_name}</td>
                    <td>{products?.customer}</td>
                    <td>{products?.drawing_issue_no}</td>
                    <td>{products?.customer_part_no}</td>
                    <td>
                      <div className={classes.icons}>
                        <CustomToolTip title="Edit">
                          <img
                            src={EditIcon}
                            alt="edit_icon"
                            onClick={() => {
                              setIsShowModal((prev) => {
                                return {
                                  ...prev,
                                  data: products,
                                  status: true,
                                };
                              });
                            }}
                          />
                        </CustomToolTip>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <NoDataFound />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {listOfProducts?.totalPage > 1 && (
        <CustomPagination
          pageCount={listOfProducts?.totalPage}
          currentpage={page}
          forcePage={page}
          onPageChange={(val) => {
            handleGetProductsList(val + 1, 10);
          }}
        />
      )}
      {handleCheck("10+2", 12)}
      {handleCheck("10-2", 8)}
      {handleCheck("10±2", 13)}
      {handleCheck("10±2", 10)}
    </>
  );
}

export default ListOfProducts;
