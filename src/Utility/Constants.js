import { makeStyles } from "@material-ui/core";

export const SALT_KEY = "L4jkmn71iwelcv@1qaz!";

export const muiStyles = makeStyles((theme) => ({
  dateStyles: {
    "& .MuiPaper-root": {
      maxHeight: "200px",
      overflowY: "auto",
    },
  },
  datepickerRadius: {
    "&>div": {
      borderRadius: "8px",
    },
  },

  activeTab: {
    "& .MuiTabs-indicator": {
      // backgroundColor: "rgb(242, 89, 34)",
      width: "50% !important",
      left: "15px !important",
      bottom: "0 !important",
      color: "black !important",
      height: "3px",
    },
    "& button": {
      padding: "5px 16px !important",
      minHeight: "0px !important",
    },
  },
  tabColor: {
    "& button": {
      padding: "5px 16px !important",
      minHeight: "0px !important",
      color: "black !important",
    },
  },
  shiftDrop: {
    border: "none !important",
    "&>div:nth-child(1)>div:nth-child(1)": {
      border: "0.5px solid rgba(0, 0, 0, 0.25) !important",
    },
  },
  dropdown: {
    border: "none !important",
    "&>div:nth-child(1)>div:nth-child(1)": {
      border: "none !important",
    },
  },
  datePicker: {
    "&>div:nth-child(2)>div>div:nth-child(1)": {
      border: "0.5px solid rgba(0, 0, 0, 0.25) !important",
    },
  },
  tabContent: {
    color: "black !important",
  },
  borderNone: {
    border: "none !important",
    width: "161px !important",
  },
  inpuBox: {
    "& fieldset , & .MuiInputBase-root": {
      border: "none !important",
    },
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input ": {
      padding: "0px !important",
      paddingLeft: "5px !important",
    },
  },
}));

export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}|[.com]))$/;

export const MOBILE_REGEX =
  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/gm;

export const NUMBER = /^[0-9]*$/;
export const PHONE_NUMBER = /^[6,7,8,9]{1}[0-9]{9}$/;

export const SPECIAL_CHARACTER_REGEX = /^[A-Za-z0-9+-/*\s]+$/;
export const ALPHA_NUM = /^[A-Za-z0-9\s]+$/;
export const NUMBERANDDOT = /^[0-9.]*$/;
export const NAMES = /^[A-Za-z\s]+$/;
