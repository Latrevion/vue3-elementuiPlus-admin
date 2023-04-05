import {reactive} from "vue"

export function configHook() {
  const config = reactive({
    selection: true,//配置复选框
    batch_delete: true,//批量删除按钮
    pagination: true //分页
  })
  const configInit = (data = {}) => {
    //无数据时候不执行
    if (JSON.stringify(data) === "{}") {
      return false
    }
    //获取默认配置选项的所有key
    const keys = Object.keys(config)
    //循环传入的配置项
    for (let key in data) {
      //过滤原型链的对象
      // eslint-disable-next-line no-prototype-builtins
      if (!data.hasOwnProperty(key)) {continue}
      //当es6判断传入的key和默认配置的key相同时候，会直接更新配置的选项值
      if (keys.includes(key)) {
        config[key] = data[key]
      }
    }


  }

  return {config, configInit}
}


