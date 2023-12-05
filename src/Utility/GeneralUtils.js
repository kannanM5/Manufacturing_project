import moment from "moment";

import toast from "react-hot-toast";

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
    console.log(msg[0], "data");

    toast.error(msg[0]);
  }
}
/**
 * Checks if a given start date is the same as or before a given end date.
 * @param {string} startDate - The start date in the format "YYYY-MM-DD".
 * @param {Date} endDate - The end date.
 * @returns {boolean} - True if the start date is the same as or before the end date, false otherwise.
 */
export const isSameOrBefore = (startDate, endDate) => {
  return moment(startDate, "YYYY-MM-DD").isSameOrBefore(
    moment(endDate, "YYYY-MM-DD")
  );
};

/**
 * Trims a string to a specified maximum length and adds ellipsis if necessary.
 * If the string contains an "@" symbol, it is assumed to be an email address and
 * only the first half of the string before "@" is shown, with the rest replaced by stars.
 * If the string does not contain an "@" symbol, it is assumed to be a mobile number
 * and only the last three digits are shown, with the rest replaced by stars.
 * @param {string} str - The string to trim.
 * @param {number} maxLength - The maximum length of the trimmed string.
 * @returns {string} The trimmed string.
 */
export const trimString = (str, maxLength) => {
  if (typeof str === "undefined") {
    return "";
  }

  if (str.length > maxLength) {
    if (str.includes("@")) {
      const strsplit = str.split("@")?.[0];
      const shownlength =
        strsplit?.length !== 1 ? Math.round(strsplit?.length / 2) : 1;
      const stars = `${strsplit?.slice(0, shownlength)} ${"*"?.repeat(5)}@${
        str?.split("@")?.[1]
      }`;
      return `A code has been sent to email ${stars}`;
    } else {
      const stars = "*".repeat(str.length - 3);
      const lastThreeNumbers = str.substring(str.length - 3);
      return `A Code has been sent to mobile Number ${
        stars + lastThreeNumbers
      }`;
    }
  }
  return str;
};

/**
 * Trims a given string to a specified length and adds ellipsis (...) if the string is longer than the specified length.
 * @param {string} str - The string to be trimmed.
 * @param {number} [length=20] - The maximum length of the trimmed string.
 * @returns {string | undefined} - The trimmed string or undefined if the input string is empty.
 */
export const getTrimString = (str, length = 20) => {
  if (str) {
    return str.length > length ? str.substring(0, length) + "..." : str;
  }
  return;
};

/**
 * Extracts the file name from a given URL.
 * @param {string} url - The URL from which to extract the file name.
 * @returns {string} The file name extracted from the URL.
 */
export const getFileName = (url) => {
  let name = url.split("/").pop();
  return name;
};

/**
 * Converts a given number of seconds into a formatted time string.
 * @param {number} seconds - The number of seconds to convert.
 * @returns {string} - The formatted time string in the format "X hours X minutes X seconds".
 */
export function getTimeFormat(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hoursText = hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "";
  const minutesText =
    minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : "";
  const secondsText =
    remainingSeconds > 0
      ? `${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`
      : "";

  const parts = [hoursText, minutesText, secondsText].filter(Boolean);
  return parts.join(" ");
}

/**
 * Calculates the aspect ratio of a rectangle given its height and width.
 * @param {number} height - The height of the rectangle.
 * @param {number} width - The width of the rectangle.
 * @returns The aspect ratio of the rectangle.
 */
export function getAspectRatio(height, width) {
  const gcd = (a, b) => {
    if (b === 0) return a;
    return gcd(b, a % b);
  };
  const divisor = gcd(height, width);
  const numerator = height / divisor;
  const denominator = width / divisor;
  return numerator / denominator;
}

export const CloseTab = () => {
  window.close();
};
