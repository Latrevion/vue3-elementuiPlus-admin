import router from "@/router/index.js"

//cookie
import {getToken} from "@/utils/cookies.js"

//全局前置路由
router.beforeEach( (to, from)=>{
//token不存在
  if (!getToken()){
    console.log(to)
    if (to.name!=='Login')
    return {
      name:"Login"
    }
  }
})

//全局后置路由
router.afterEach( (to, from, failure)=>{
// console.log('afterEach')
})