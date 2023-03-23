//引入拦截器
import instance from "@/utils/request.js"

//添加父级分类
export function firstCategoryAdd(data = {}) {
  return instance.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data
  })
}

//获取分类
export function GeCategory(data = {}) {
  return instance.request({
    method: "post",
    url: "/news/getCategoryAll/",
    data
  })
}

// /** 子级分类添加 */
export function ChildCategoryAdd(data = {}) {
  return instance.request({
    method: "post",
    url: "/news/addChildrenCategory/ ",
    data
  })
}

//编辑分类
export function CategoryEdit(data = {}) {
  return instance.request({
    method: "post",
    url: "/news/editCategory/ ",
    data
  })
}