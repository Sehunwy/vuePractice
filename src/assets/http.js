import axios from "axios"
const timeout = 15000;
const apiHost = "13.15.51.202";
const apiPort = "6688";
const environment = process.env.NODE_ENV;
if (environment === "development") {
    axios.defaults.baseURL = `http://${apiHost}:${apiPort}`;
}
axios.defaults.timeout = timeout;
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    var token = window.sessionStorage.getItem("token");
    config.headers['Authorization'] = 'bearer' + token;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    var err = "";
    console.log(error.response,error.request,error.message)
    if (error.response) {
        err = error.response.data;
        var status = error.response.status;
        switch (status) {
            case 410:
                console.log(status);
        }
    } else if (error.message.includes('timeout')) {
        err = error.message
    } else if (error.request) {
        err = error.request;
    } else {
        err = error.message
    }
    return Promise.reject(err);
});