//获取当前目录所有svg后缀文件
const context = require.context('./icon',false,/\.svg$/)
console.log(context)

//解析获取的svg文件名称，并且返回
const requireAll = (requireContext)=>{
  console.log(requireContext.keys())
  return requireContext.keys().map(requireContext)
}

requireAll(context)