import {reactive} from "vue"
//api
import {TableData} from "@/api/common.js"
//requestUrl
import apiUrl from "@/api/requestUrl.js"


export function requestHook() {
  let request_config = {
    has: true, //是否请求
    url: "", //请求地址
    method: "post", //请求类型
    data: {} //请求参数
  }

  const table_data = reactive({
    data: [],
    total: 0
  })

  const loadData = () => {
//判断是否有请求接口
    if (!request_config.has) {
      return false
    }
    if (!request_config.url) {
      return false
    }


    const url = apiUrl[request_config.url]?.list?.url
    const method = apiUrl[request_config.url]?.list?.method || "post"
    const data = request_config.data

    if (!url) {
      console.log("请求地址不存在啊")
      return false
    }

    const request_data = {
      url,
      method,
      data
    }

    //调用接口
    return new Promise((resolve, reject) => {
      TableData(request_data).then(response => {
        table_data.data = response.data.data  //列表数据
        table_data.total = response.data.total //总条数
        resolve(table_data.data)
      })
    })

  }

  const requestData = (data = {}, type = "init") => {
    if (type === "init") {
      request_config = {
        ...request_config,
        ...data
      }
    }

    if (type ==='page'){
      request_config.data = {
        ...request_config.data,
        ...data
      }
    }

    console.log(request_config)
    //请求数据
    return loadData()
  }
  return {
    table_data,
    requestData,
  }
}

