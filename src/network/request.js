import axios from "axios";

export function request(config) {
  //创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })
  //创建拦截器
  instance.interceptors.request.use(config => {
    return config
  },err => {
    console.log(err)
  })

  return instance(config)

}