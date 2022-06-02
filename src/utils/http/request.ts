import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { Toast } from "vant";
import router from "@/router";
import { ContentTypeEnum } from "./httpEnum";
import { showMessage } from "./status";

// create an axios instance
const http = axios.create({
  baseURL: "", // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
});
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  hideLoading?: boolean;
}

// request拦截器 request interceptor
http.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    // 不传递默认开启loading
    if (!config.hideLoading) {
      // loading
      Toast.loading({
        forbidClick: true,
      });
    }

    const contentType = config.headers?.["content-type"] || config.headers?.["Content-Type"];
    const data = config.data;
    if (config.method?.toLocaleUpperCase() == "POST" && data) {
      if (ContentTypeEnum.FORM_DATA == contentType) {
        const fd = new FormData();
        Object.keys(data).forEach(key => fd.append(key, data[key]));
        config.data = fd;
      } else if (ContentTypeEnum.FORM_URLENCODED == contentType) {
        config.data = qs.stringify(config.data);
      }
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);
// respone拦截器
http.interceptors.response.use(
  response => {
    Toast.clear();
    const res = response.data;
    if (res.ret && res.ret !== 0) {
      // 登录超时,重新登录
      if (res.ret === 401) {
        router.replace("/error");
      } else {
        Toast(res.info || "error");
      }
      return Promise.reject(res || "error");
    } else {
      return Promise.resolve(response);
    }
  },
  (error: Error) => {
    const { response } = error as any;

    Toast(showMessage(response.status));
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default http;
