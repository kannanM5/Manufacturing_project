import React, { useEffect } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import classes from "./Management.module.css";
import { useState } from "react";
import {
  CustomButton,
  CustomPagination,
  GlobalModal,
  Loader,
  TextInputBox,
} from "../../Components";
import EditIcon from "../../Assets/Icons/Svg/edit.svg";
import {
  useEmployeeId,
  useEmployeeType,
  useToken,
} from "../../Utility/StoreData";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ALPHA_NUM, NAMES } from "../../Utility/Constants";
import {
  addProductService,
  dummy,
  editProductService,
  productsList,
} from "../../Services/Services";
import { getCatchMsg, getInvalidMsg } from "../../Utility/GeneralUtils";
import toast from "react-hot-toast";
import AddProducts from "../../Modals/AddProducts";

const validationSchema = Yup.object({
  part_no: Yup.string()
    .required("Part number is required")
    .matches(ALPHA_NUM, "Enter valid part number"),
  part_name: Yup.string()
    .matches(ALPHA_NUM, "Enter valid part name")
    .required("Part name is required"),
  customer: Yup.string()
    .matches(ALPHA_NUM, "Enter valid customer")
    .required("Customer is required"),
  customer_part_no: Yup.string()
    .matches(ALPHA_NUM, "Enter valid customer part number")
    .required("Customer part number is required"),
  drawing_issue_no: Yup.string()
    .matches(ALPHA_NUM, "Enter valid drawing issue number")
    .required("Drawing issue number is required"),
});

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

  const handleGetProductsList = (page = 1) => {
    setloader(true);
    const formData = new FormData();
    formData.append("token", token);
    formData.append("user_id", userId);
    formData.append("limit", 10);
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
      {isShowModal?.status && (
        <GlobalModal
          size="lg"
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
          <AddProducts
            listApiCall={handleGetProductsList}
            editData={isShowModal?.data}
            onClose={() => {
              setIsShowModal((prev) => {
                return {
                  ...prev,
                  status: false,
                };
              });
            }}
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
      )}

      <div className={`table-responsive ${classes.Dashboard}`}>
        <table className={classes.listOfTable}>
          <thead className={classes.NormalTable}>
            <tr>
              <th>S.No</th>
              <th>Part No</th>
              <th>Part Name</th>
              <th>Customer</th>
              <th>Drawing Issue No</th>
              <th>Customer Part number</th>
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
                  <img
                    src={EditIcon}
                    alt="edit_icon"
                    style={{ width: 20, height: 20, cursor: "pointer" }}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {listOfProducts?.items?.length ? (
        <CustomPagination
          page={page}
          pageCount={listOfProducts?.total_page}
          handleFunction={(selected) => {
            setPage(selected);
            handleGetProductsList(selected);
          }}
        />
      ) : null}
    </>
  );
}

export default ListOfProducts;
