import axios from "axios";

const { REACT_APP_BASEURL } = process.env;

const instance = axios.create({
  baseURL: "http://192.168.0.105/vtenterprise/webservice/",
});

export default instance;
