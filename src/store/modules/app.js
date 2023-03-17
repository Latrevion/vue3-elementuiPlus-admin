import {Login} from "@/api/account.js"

const state = {
  count: 100,
  text: "学习后台管理开发"
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
  set_Count(state) {
    return state.count = 88
  },
  set_Text(state, payload) {
    return state.text = payload
  }

}

const actions = {
  // update_count(context) {
  //   console.log(context)
  //   context.commit('set_Count')
  // }
  // ,
  // update_text({commit,state,getters,dispatch},payload){
  //   commit('set_Text',payload)
  // },
  loginAction(context,requestData){
    return new Promise( ( resolve, reject)=>{
          Login(requestData).then( ( response)=>{
              resolve(response)
          }, (error )=>{
              reject(error)
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