import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.126/vtenterprise/webservice/",
  // baseURL: "https://vteenterprise.000webhostapp.com/vtenterprise/webservice/",
});

export default instance;
