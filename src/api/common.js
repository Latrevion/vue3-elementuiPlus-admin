import  instance from '@/utils/request.js' //引入拦截器

//获取验证码
export function GetCode(data){
  return instance.request({
    method:'post',
    url:'/getCode/',
    data,
  })
}

//异常状态码演示接口
export function ErrorHttp(data){
  return instance.request({
    method:'post',
    url:'/error/',
    data
  })
}

//上传文件
export function UploadFile(data={}){
  return instance.request({
    method:'post',
    url:'/upload',
    data
  })
}

export function TableData(params={}) {
  return instance.request({
    method:params.method,
    url:params.url,
    data:params.data
  })
}

export function SwitchStatus(params={}){
  return instance.request({
    method:params.method,
    url:params.url,
    data:params.data
  })
}