import {Login,Logout} from "@/api/account.js"
import {setToken, setUsername, getToken, getUsername,removeToken,removeUsername} from "@/utils/cookies.js"


const state = {
  count: 100,
  // text: "学习后台管理开发",
  collapse: JSON.parse(sessionStorage.getItem("collapse")) || false,
  token: "" || getToken(),
  username: "" || getUsername()
}

const getters = {
  getUpdateCount(state) {
    return state.count += 10
  },
  getUpdateText(state) {
    return "我正在努力地" + state.text
  }
}

const mutations = {
  // set_Count(state) {
  //   return state.count = 88
  // },
  // set_Text(state, payload) {
  //   return state.text = payload
  // }
  set_Collapse(state) {
    state.collapse = !state.collapse
    sessionStorage.setItem("collapse", JSON.stringify(state.collapse))
  },
  //设置token
  set_Token(state, value) {
    state.token = value
    value && setToken(value) //当value存在时写入缓存
  },
  //设置用户名
  set_Username(state, name) {
    state.username = name
    name && setUsername(name)//当name存在时写入缓存
  }
}

const actions = {
  loginAction(context, requestData) {
    return new Promise((resolve, reject) => {
      Login(requestData).then((response) => {
        let data = response.data
        context.commit("set_Token", data.token)
        context.commit("set_Username", data.username)
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },
  logoutAction(context){
    return  new Promise( ( resolve, reject)=>{
        Logout().then(response=>{
          removeToken()
          removeUsername()
          context.commit('set_Token','')
          context.commit('set_Username','')
          resolve(response)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}