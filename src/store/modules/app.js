import {Login} from "@/api/account.js"

const state = {
  // count: 100,
  // text: "学习后台管理开发",
  collapse: false
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
    state.collapse =!state.collapse
  }
}

const actions = {
  loginAction(context, requestData) {
    return new Promise((resolve, reject) => {
      Login(requestData).then((response) => {
        resolve(response)
      }, (error) => {
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