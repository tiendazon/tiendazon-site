import axios from "axios";
import { toast } from "react-toastify";

import logger from "./loggerService";
import config from "../config.json";

axios.interceptors.response.use(false, function (error) {
  if (error.response.status >= 500) {
    toast.error(
      "Algo ha ocurrido lo solucionamos pronto",
      config.toastErrorOptions
    );

    logger.capture(error);
  }
  return Promise.reject(error);
});

function setToken(jwt) {
  if (!jwt) return;
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setToken,
};
