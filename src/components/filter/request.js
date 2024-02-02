import axios from "axios";

// create an axios instance
const service = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
});

service.defaults.baseURL = "/";

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    if (ca[i].indexOf(name) >= 0) {
      return ca[i].split("=")[1];
    }
  }
  return "";
}

let authorization = getCookie("Authorization");

authorization = `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwNjE5MiIsImFjY291bnRObyI6IjA2MTkyIiwiZXhwIjoxNzA2NzkwNDMxLCJpYXQiOjE3MDY3NDcyMzEsImp0aSI6IjgyYjBlNTg3LTk4MDUtNDUzNi1iYjRlLTFkZmZiZDE4YWRiYyJ9.9rCL1XXNU7NRq4Ph0YUxYrMbXChhXEmK__htXMVav1g`

// request interceptor
service.interceptors.request.use(
  (config) => {
    const headers = Object.assign({}, config.headers, {
      Authorization: authorization,
    });
    config.headers = headers;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    console.log("err" + error.code);

    return Promise.reject(error);
  }
);

export default service;
