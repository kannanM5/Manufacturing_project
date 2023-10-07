import { CancelToken } from "axios";
import axios from "./Axios";

// Authendication
export const loginService = (data) => {
  return axios.post("login_user", data);
};
export const signupService = (data) => {
  return axios.post("/signup_user", data);
};
export const captchaService = () => {
  return axios.get("/captcha");
};
export const orgcodeService = (data) => {
  return axios.post("/org_code", data);
};
export const otpverifyService = (data) => {
  return axios.post("/otp_verification", data);
};
export const frogotpassandorgService = (data) => {
  return axios.post("/generate_otp", data);
};
export const resetpasswordService = (data) => {
  return axios.post("/reset_password", data);
};
export const resendotpService = (data) => {
  return axios.post("/resend_otp", data);
};

// Device
export const listDeviceMachine = (page, size, data) => {
  return axios.post(
    `masters/list_device_machine?page=${page}&size=${size}`,
    data
  );
};
export const addDevice = (data) => {
  return axios.post("masters/add_device", data);
};
export const deleteDevice = (data) => {
  return axios.post("masters/delete_device", data);
};
export const updateDevice = (data) => {
  return axios.post("masters/update_device", data);
};
export const listofDropdownMachine = (data) => {
  return axios.post("dropdown/dropdown_machine", data);
};

// Machine
export const listMachine = (page, size, data) => {
  return axios.post(`masters/list_machine?page=${page}&size=${size}`, data);
};
export const addMachine = (data) => {
  return axios.post("masters/add_machine", data);
};
export const listofDropdownShiftGroup = (data) => {
  return axios.post("dropdown/dropdown_shiftgroup", data);
};
export const listofDropdownMachineGroup = (data) => {
  return axios.post("dropdown/dropdown_machinegroup", data);
};
export const listofDropdownMachineType = (data) => {
  return axios.post("dropdown/machine_type_dropdown", data);
};
export const deleteMachine = (data) => {
  return axios.post("masters/delete_machine", data);
};
export const updateMachine = (data) => {
  return axios.post("masters/update_machine", data);
};
export const machineScheduleTableList = (page, size, data) => {
  return axios.post(`schedule/list_schedule?page=${page}&size=${size}`, data);
};

// Employee
export const employeeList = (page, size, data) => {
  return axios.post(`masters/list_employee?page=${page}&size=${size}`, data);
};
export const addEmployees = (data) => {
  return axios.post("masters/create_employee", data);
};
export const deleteEmployee = (data) => {
  return axios.post("masters/delete_emp", data);
};
export const updateEmployee = (data) => {
  return axios.post("masters/update_employee", data);
};
// Machinegroup
export const listMachineGroup = (page, size, data) => {
  return axios.post(
    `masters/list_machine_group?page=${page}&size=${size}`,
    data
  );
};
export const deleteMachineGroup = (data) => {
  return axios.post("masters/delete_machine_group", data);
};
export const createMachineGroup = (data) => {
  return axios.post("masters/create_machine_group", data);
};
export const updateMachineGroup = (data) => {
  return axios.post("masters/update_machine_group", data);
};

// Profile
export const getProfile = (data) => {
  return axios.post("masters/view_profile", data);
};
export const updateProfile = (data) => {
  return axios.post("masters/update_profile", data);
};
// Shiftgroup
export const listShiftGroup = (data) => {
  return axios.post("masters/list_shiftgroup", data);
};
export const createShiftGroup = (data) => {
  return axios.post("masters/add_shift_group", data);
};

// Special days
export const specialHolidayList = (page, size, data) => {
  return axios.post(
    `specialdays/special_holiday?page=${page}&size=${size}`,
    data
  );
};
export const shiftGroupPopupList = (data) => {
  return axios.post("dropdown/dropdown_shiftinshiftgroup", data);
};
export const createHoliday = (data) => {
  return axios.post("specialdays/add_special_holiday", data);
};
export const addRegularHoliday = (data, token) => {
  return axios.post("specialdays/add_regular_holiday", data, {
    cancelToken: token,
  });
};
export const deleteHoliday = (data) => {
  return axios.post("specialdays/delete_specialholiday", data);
};
export const updateHoliday = (data) => {
  return axios.post("specialdays/update_specialholiday", data);
};

// Special work
export const specialWorkList = (page, size, data) => {
  return axios.post(
    `specialdays/list_special_work?page=${page}&size=${size}`,
    data
  );
};
export const checkWorkDay = (data) => {
  return axios.post("specialdays/check_specialworkday", data);
};
export const addsplWorkDay = (data) => {
  return axios.post("specialdays/add_specialworkday", data);
};
export const deleteSpecialWork = (data) => {
  return axios.post("specialdays/delete_specialwork", data);
};
export const updateSpecialWork = (data) => {
  return axios.post("specialdays/update_specialworkday", data);
};
export const getListRegularHoliday = (data) => {
  return axios.post("specialdays/list_regular_holiday", data);
};

// WorkOrderListStart
export const getWorkOrderList = (page, size, data) => {
  return axios.post(`masters/list_work_order?page=${page}&size=${size}`, data);
};
export const addWorkOrder = (data) => {
  return axios.post("masters/create_work_order", data);
};
export const updateWorkOrder = (data) => {
  return axios.post("masters/update_work_order", data);
};
export const deleteWorkOrder = (data) => {
  return axios.post("masters/delete_work_order", data);
};

//Change password
export const changepassword = (data) => {
  return axios.post("/change_password", data);
};

//Addshift
export const addshift = (data) => {
  return axios.post(`masters/add_shift_group`, data);
};
export const UpdateShift = (data) => {
  return axios.post("masters/update_shift", data);
};
export const DeleteShift = (data) => {
  return axios.post("masters/delete_shiftgroup", data);
};

// GangttChart
export const GanttChartList = (page, size, data) => {
  return axios.post(
    `ganttchart/list_workorderplan?page=${page}&size=${size}`,
    data
  );
};
export const workOrderList = (data) => {
  return axios.post("dropdown/workorder_dropdown", data);
};
export const workOrderDropdown = (data) => {
  return axios.post("/dropdown/workorder_dropdown", data);
};
export const addChartData = (data) => {
  return axios.post("/ganttchart/add_gantt_chart_data", data);
};
export const deleteChartData = (data) => {
  return axios.post("/ganttchart/delete_gantt_chart", data);
};

// profile otp
export const profileOtpEmailOrPhone = (data) => {
  return axios.post("masters/verify_email_mobile", data);
};
export const OtpCheckProfile = (data) => {
  return axios.post("masters/verify_otp_profile", data);
};
//schedule
export const scheduleListDetails = (data) => {
  return axios.post("schedule/list_schedule?page=1&size=10", data);
};
export const addScheduleData = (data) => {
  return axios.post("schedule/schedule", data);
};
export const deleteSchedule = (data) => {
  return axios.post("/scheduledelete_schedule", data);
};
// Dropdown Services

export const listofDropdownEmployee = (data) => {
  return axios.post("dropdown/drop_down_employee", data);
};

// Report Services

export const getEmployeeLoginReportServices = (page, size, data) => {
  return axios.post(
    `report/employee_login_report?page=${page}&size=${size}`,
    data
  );
};
export const getWorkOrderReportServices = (page, size, data) => {
  return axios.post(
    `reportworkorderPlanReport?page=${page}&size=${size}`,
    data
  );
};

export const getEmployeeReportServices = (page, size, data) => {
  return axios.post(`report/employee_report?page=${page}&size=${size}`, data);
};

export const getMachineReportServices = (page, size, data) => {
  return axios.post(
    `report/machine_report_generate?page=${page}&size=${size}`,
    data
  );
};

export const getMachineTypeServices = (data) => {
  return axios.post("dropdown/machine_type_dropdown", data);
};

//Machine Type
export const machineTypeList = (page, size, data) => {
  return axios.post(
    `machine_type/list_machinetype?page=${page}&size=${size}`,
    data
  );
};
export const addmachineType = (data) => {
  return axios.post("machine_type/create_machinetype", data);
};
export const deleteMachineType = (data) => {
  return axios.post("machine_type/delete_machine_type", data);
};
export const updateMachineType = (data) => {
  return axios.post("/machine_type/update_machinetype", data);
};
export const viewMachineType = (data) => {
  return axios.post("/machine_type/view_machine_type", data);
};
//dashboard

export const getPieChart = (page, size, data) => {
  return axios.post(`dashboard/piechart?page=${page}&size=${size}`, data);
};
export const getCountsDashboard = (data) => {
  return axios.post("dashboard/dashboard", data);
};
export const getMachineTypeList = (data) => {
  return axios.post("dropdown/machine_type_dropdown", data);
};
