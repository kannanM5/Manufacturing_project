import { CancelToken } from "axios";
import axios from "./Axios";

// Authendication
export const userSignin = (data) => {
  return axios.post("/signin", data);
};

export const userSignUp = (data) => {
  return axios.post("signup", data);
};
export const superAdminChangePassword = (data) => {
  return axios.post("changepasswordadmin", data);
};
export const employeeList = (page, data) => {
  return axios.post(`userlist?page=${page}`, data);
};
export const employeeChangePassword = (data) => {
  return axios.post("changepassword", data);
};
export const signOut = (data) => {
  return axios.post("signout", data);
};

export const addProductService = (data) => {
  return axios.post("addproduct", data);
};

export const productsList = (page, data) => {
  return axios.post(`productlist?page=${page}`, data);
};

export const getUserService = (data) => {
  return axios.post("getuser", data);
};

export const editProductService = (data) => {
  return axios.post("editproduct", data);
};

export const addInspectionCriteriaService = (data) => {
  return axios.post("addcriteria", data);
};

export const shamir = (data) => {
  return axios.post("signup/sgdfjhsfj", data);
};
