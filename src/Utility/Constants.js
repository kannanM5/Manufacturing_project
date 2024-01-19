// export const DOWNLOAD_URL = "http://192.168.0.118/vtenterprise/uploads/";

export const DOWNLOAD_URL =
  "https://vteenterprise.000webhostapp.com/vtenterprise/uploads/";

export const SALT_KEY = "L4jkmn71iwelcv@1qaz!";

export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}|[.com]))$/;

export const MOBILE_REGEX =
  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/gm;

export const NUMBER = /^[0-9]*$/;
export const PHONE_NUMBER = /^[6,7,8,9]{1}[0-9]{9}$/;

export const SPECIAL_CHARACTER_REGEX = /^[A-Za-z0-9+-/*\s]+$/;
export const ALPHA_NUM = /^[A-Za-z0-9\s]+$/;
export const NAMES = /^[A-Za-z\s]+$/;
export const REGEXNUMBERSPATTERN =
  /^[0-9]+(\.[0-9]+)?[-+*/±][0-9]+(\.[0-9]+)?|[0-9]+(\.[0-9]+)?$/;

const EncryptDecryptKey = "encryptdecrypt";
export const getTableSNO = (page, size, index) => {
  return (page - 1) * size + (index + 1);
};

export const EncryptData = (token) => {
  var CryptoJS = require("crypto-js");
  var EncryptData = CryptoJS.AES.encrypt(token, EncryptDecryptKey).toString();
  return EncryptData;
};

export const DecryptToken = (encriptText) => {
  var CryptoJS = require("crypto-js");
  var bytes = CryptoJS.AES.decrypt(encriptText, EncryptDecryptKey);

  var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};
