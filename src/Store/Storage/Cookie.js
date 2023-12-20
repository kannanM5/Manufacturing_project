export function setCookie(cname, cvalue, exdays = 7) {
  const storedValue =
    typeof cvalue === "string" ? cvalue : JSON.stringify(cvalue);
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + storedValue + ";" + expires + ";path=/";
}

const isJsonString = (value) => {
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
};

export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return isJsonString(c.substring(name.length, c.length))
        ? JSON.parse(c.substring(name.length, c.length))
        : c.substring(name.length, c.length);
    }
  }
  return "";
}
