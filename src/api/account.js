import  instance from '@/utils/request.js'

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