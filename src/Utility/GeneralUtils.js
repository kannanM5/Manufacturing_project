import toast from "react-hot-toast";
import { NAMES, REGEXNUMBERSPATTERN } from "./Constants";

export function getCatchMsg(error) {
  if (error?.response?.data?.detail) {
    return Array.isArray(error?.response?.data?.detail)
      ? error?.response?.data?.detail?.[0]?.msg
      : error?.response?.data?.detail?.msg;
  } else if (error.response) {
    if (error.response.status === 404) {
      toast.error("The requested resource does not exist or has been deleted");
    } else if (error.response.status === 500) {
      toast.error("Internal Server Error !");
    } else {
      toast.error("An error occurred");
    }
  } else if (error.request) {
    toast.error("Unable to connect to the server !");
  } else {
    return "Something went wrong!";
  }
}

export function getInvalidMsg(data) {
  if (data) {
    const msg = Object.values(data)[0];
    toast.error(msg[0]);
  }
}

export const getTrimString = (str, length = 20) => {
  if (str) {
    return str.length > length ? str.substring(0, length) + "..." : str;
  }
  return;
};

export const getFileName = (url) => {
  let name = url.split("/").pop();
  return name;
};

export const CloseTab = () => {
  window.close();
};

export const getObserVationColorCode = (specification, data) => {
  const check = (/\s+/g, " ");
  let spec = specification?.replace(/\s/g, "");
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
    const AddValue = Number(valueOne) + Number(valueTwo);
    const SubractValue = Number(valueOne) - Number(valueTwo);

    if (!valueTwo) {
      return "black";
    } else if (
      containsSpecialChar === "+" &&
      Number(AddValue) >= Number(data) &&
      Number(data) >= Number(valueOne)
    ) {
      return "black";
    } else if (
      containsSpecialChar === "-" &&
      Number(SubractValue) <= Number(data) &&
      Number(valueOne) >= Number(data)
    ) {
      return "black";
    } else if (
      containsSpecialChar === "±" &&
      Number(AddValue) >= Number(data) &&
      Number(data) >= Number(SubractValue)
    ) {
      return "black";
    } else if (
      containsSpecialChar === "/" &&
      Number(valueTwo) >= Number(data) &&
      Number(data) >= Number(valueOne)
    ) {
      return "black";
    }
    return "red";
  } else {
    return "black";
  }
};
