import Cookies from 'js-cookie';

//变量
const tokenKey = 'tokenAdmin';
const userNameKey = 'username';

//获取token
export function getToken(){
  return Cookies.get(tokenKey)
}

//写入token
export function setToken(value){
  return Cookies.set(tokenKey,value)
}

//删除token
export function removeToken(value){
  return Cookies.remove(tokenKey)
}

//写入username
export function setUsername(name){
  Cookies.set(userNameKey,name)
}

//获取username
export function getUsername(name){
 return  Cookies.get(userNameKey)
}

//删除username
export function removeUsername(name){
  Cookies.remove(userNameKey)
}



