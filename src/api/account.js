import  instance from '@/utils/request.js'
import service from "@/utils/request.js"

export function Register(data={}){
  return instance.request({
    method:'post',
    url:"/register/",
    data
  })
}

//登录
export  function  Login(data={}){
  return instance.request({
    method:"post",
    url:"/login/",
    data
  })
}

//退出
export  function Logout(data={}){
  return service.request({
    method:'post',
    url:'/logout/',
    data
  })
}