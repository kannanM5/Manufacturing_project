import axios from "axios";

const { REACT_APP_BASEURL } = process.env;

const instance = axios.create({
  baseURL: REACT_APP_BASEURL,
});

export default instance;
