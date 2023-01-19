import axios from "axios";

//实例化http请求对象
const httptool = axios.create({
  baseURL:'http://localhost:88',//服务器地址
  timeout:100000,                    //请求超时时间
  headers:{},                       //预定义请求头
  params:{},
})

export default httptool;
