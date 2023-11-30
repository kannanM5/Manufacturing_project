import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.108/vtenterprise/webservice/",
});

export default instance;
