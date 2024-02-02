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
export const editInspectionCriteriaService = (data) => {
  return axios.post("editcriteria", data);
};
export const criteriaListService = (page, data) => {
  return axios.post(`criterialist?page=${page}`, data);
};

export const shamir = (data) => {
  return axios.post("signup/sgdfjhsfj", data);
};

//inspection cretire report

export const getInspectionReportList = (data) => {
  return axios.post("getreportdata", data);
};

export const addInspectionReportList = (data) => {
  return axios.post("addreportdata", data);
};
export const editInspectionReportList = (data) => {
  return axios.post("geteditreportdata", data);
};
export const updateInspectionReportList = (data) => {
  return axios.post("editreportdata", data);
};

export const dummy = (data) => {
  return axios.post("test", data);
};
// saved data list
export const savedDataList = (data) => {
  return axios.post(`getsavedlogs`, data);
};

export const deleteSavedLogs = (data) => {
  return axios.post(`deletesavedlogs`, data);
};

// export

export const getExportList = (data) => {
  return axios.post(`getexportlist`, data);
};
export const viewReports = (data) => {
  return axios.post(`viewreport`, data);
};

export const downloadEx = (data) => {
  return axios.post(`exportcustomers`, data);
};

export const exportReportService = (data) => {
  return axios.post(`exportreport`, data);
};
export const unlinkExcelTableReport = (data) => {
  return axios.post(`unlinkfile`, data);
};

//list of process
export const listOfProcess = (data) => {
  return axios.post(`processlist`, data);
};

// update process

export const updateProcess = (data) => {
  return axios.post(`processupdate`, data);
};
