const globalFunction = {}

//函数1
globalFunction.deleteConfirm = (params) => {
  ElMessageBox.confirm(params.message || "确认删除当前数据？删除无法恢复了", params.title || "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    showClose: false,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    type: "warning",
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        //判断thenFun存在并且是Function的时候，自动执行函数
        const is_function = params.thenFun && Object.prototype.toString.call(params.thenFun) === "[object Function]"
        //按钮加载状态
        instance.confirmButtonLoading = is_function
        is_function && params.thenFun().then(() => {
          instance.confirmButtonLoading = false
          done()
        }).catch(() => {
          instance.confirmButtonLoading = false
        })
      } else {
        done()
      }
    }
  }).catch(() => {

  })
}


//函数2
globalFunction.message = (params) => {
  console.log(params)
}

//暴露方法
export default {
  install(app) {
    app.config.globalProperties["deleteConfirm"] = globalFunction.deleteConfirm
    app.config.globalProperties["message"] = globalFunction.message
  }
}

// 这段代码导出了一个对象，其中包含一个名为install的方法，该方法接受一个名为app的参数。
// 在install方法内部，它将两个属性添加到全局的app对象中。第一个属性名为deleteConfirm，它的值是一个函数，接受一个名为params的参数，
// 并将其记录到控制台。第二个属性名为message，其值也是一个函数，接受一个名为params的参数，并将其记录到控制台。
// 这段代码是为了在Vue.js应用程序中使用的插件。当这个插件被安装到应用程序中时，它会将deleteConfirm和message函数添加到应用程序的全局属性中。
// 这使得所有组件都可以使用这些函数，而无需显式地导入它们。