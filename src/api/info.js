//引入拦截器
import instance from '@/utils/request.js'

//添加父级分类
export function  firstCategoryAdd(data={}){
  return instance.request({
    method:'post',
    url:'/news/addFirstCategory/',
    data
  })
}

//获取分类
export  function GetGategory(data={}){
  return instance.request({
    method:'post',
    url:'/news/getCategoryAll/',
    data
  })
}