import axios from "axios"

console.log(process.env.VUE_APP_API)
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000,
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config
  }, function (error) {
    //对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response)
    const data = response.data
    console.log(data, 123456)
  if (data.resCode === 0){
    return Promise.resolve(data)
  }else{
    ElMessage({
      message:data.message.slice(0,9),
      type:'error'
    })
    return Promise.reject(data)
  }

  }, function (error) {
    console.log(error.request)
    const errorData = JSON.parse(error.request.response)
    if (errorData.msg) {
      ElMessage({
        message: errorData.msg,
        type: "error"
      })
    }
    // 对响应错误做点什么
    return Promise.reject(errorData)
  }
)

//导出 service
export default service