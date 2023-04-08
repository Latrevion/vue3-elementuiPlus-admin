<template>
  <el-switch v-model="init_data.value" :loading="init_data.loading" :before-change='handlerSwitch'></el-switch>
</template>

<script>
import {reactive, getCurrentInstance} from "vue"
//API
import {Status} from "@/api/info.js"

import apiUrl from "@/api/requestUrl.js"
import {SwitchStatus} from "@/api/common.js"

export default {
  name: "SwitchComponent",
  props: {
    data: {
      type: Object, default: () => {return {}}
    },
    config: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    //获取上下文
    const {proxy} = getCurrentInstance()

    //配置信息
    const config = reactive(props.config)
    //接口数据
    const data = reactive(props.data)
    //初始值
    const init_data = reactive({
      value: data[config.prop],
      loading: false
    })

    //事件
    const handlerSwitch = (value) => {
      init_data.loading = true
      //请求参数
      const url = config.api_url || apiUrl?.[config.api_module]?.[config.api_key]?.url
      const method = config.method || apiUrl?.[config.api_module]?.[config.api_key]?.method || "post"
      if (!url) {
        throw new Error("url地址不存在")
      }

      const key_id = config.key_id || "id"


      const request_data = {
        url,
        method,
        data: {
          [key_id]: data[key_id], // 等价于["id"]: data["id"]
          [config.prop]: !init_data.value // 等价于["status"]: value
        }
      }


      return new Promise((resolve, reject) => {
        SwitchStatus(request_data).then(response => {
          ElMessage.success(response.message.slice(0,5))
          data.status = value
          init_data.loading = false
          resolve(true)
        }).catch(error => {
          init_data.loading = false
          reject(false)
        })
      })
    }

    // eslint-disable-next-line vue/no-dupe-keys
    return {config, init_data, handlerSwitch}
  }
}
</script>

<style lang="scss" scoped>

</style>