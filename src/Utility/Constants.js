export const SALT_KEY = "L4jkmn71iwelcv@1qaz!";

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
