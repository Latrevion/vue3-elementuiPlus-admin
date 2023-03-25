import {createStore} from "vuex"
import app from "./modules/app.js"
import info from './modules/info.js'

export default createStore({
  modules: {app,info}
})
