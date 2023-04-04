import axios from 'axios'
const baseURL = 'http://121.36.172.92:8061'
const service = axios.create({
  baseURL,
})

service.interceptors.request.use(config => {
  return config
})

// respone拦截,获取请求数据后，搞事情
service.interceptors.response.use(
  // 正常获取数据
  response => {
    return response.data
  },

  // 请求失败
  error => {
    return Promise.reject(error?.response?.data)
  }
)



export default service
