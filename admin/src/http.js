import axios from "axios";

//实例化http请求对象
const httptool = axios.create({
  baseURL:'http://127.0.0.1:4523/m1/2033038-0-default/',//服务器地址
  timeout:100000,                    //请求超时时间
  headers:{},                       //预定义请求头
  params:{},
})

export default httptool;
