import Axios from "axios";
const baseURL = "http://127.0.0.1:5000";
//const baseURL = "https://farukkastamonuda.pythonanywhere.com/";
export const axios_instance = Axios.create({
  baseURL,
});

axios_instance.interceptors.request.use(
  async function (config) {
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Headers"] = "*";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
