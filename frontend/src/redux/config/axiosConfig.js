import axios from "axios";
import store from "../store";
import { apiUrl } from "./api";
import * as types from "../types";
const axiosConfig = axios.create({
  baseURL: apiUrl,
  headers: {
    "content-type": "application/json",
  },
});
axiosConfig.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});
axiosConfig.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
      localStorage.clear();
      store.dispatch({ type: types.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
  }
);
export default axiosConfig;
