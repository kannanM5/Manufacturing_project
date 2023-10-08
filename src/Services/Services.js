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

export const shamir = () => {
  return axios.get("http://192.168.0.117/test/web/sign/signup");
};
