import React, { useEffect, useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import classes from "./Management.module.css";
import { GlobalModal, Loader } from "../../Components";
import EditIcon from "../../Assets/Icons/Svg/edit.svg";
import {
  useEmployeeId,
  useEmployeeType,
  useToken,
} from "../../Utility/StoreData";
import { dummayone, productsList } from "../../Services/Services";
import { getCatchMsg } from "../../Utility/GeneralUtils";
import AddProducts from "../../Modals/AddProducts";
import CustomPagination from "../../Components/CustomPagination";
import { Tooltip } from "antd";
import CustomToolTip from "../../Components/CustomToolTip";

function ListOfProducts() {
  const token = useToken();
  const userId = useEmployeeId();
  const userType = useEmployeeType();
  const [page, setPage] = useState(1);
  const [loader, setloader] = useState(false);
  const [listOfProducts, setListOfProducts] = useState();
  const [isShowModal, setIsShowModal] = useState({
    status: false,
    data: null,
  });

  useEffect(() => {
    if (token) handleGetProductsList();
  }, [token]);

  const hendleDummyApi = () => {
    const data = {
      test: "test22",
    };
    const finalData = JSON.stringify(data);
    dummayone(finalData).then((response) => {
      console.log(response, "RESPONSEIN DUMMY ONE");
    });
  };
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
  const handleGetProductsList = (page = 1) => {
    setloader(true);
    const formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("limit", 40);
    productsList(page, formData)
      .then((response) => {
        if (response?.data?.status === 1) {
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
            {listOfProducts?.items.map((products, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
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
            ))}
          </tbody>
        </table>
      </div>
      {/* {listOfProducts?.items?.length ? (
        <CustomPagination
          page={page}
          pageCount={listOfProducts?.total_page}
          handleFunction={(selected) => {
            setPage(selected);
            handleGetProductsList(selected);
          }}
        />
      ) : null} */}
      <CustomPagination totalCount={listOfProducts?.totalPage * 10} />
    </>
  );
}

export default ListOfProducts;
