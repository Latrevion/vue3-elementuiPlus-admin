import {createStore} from "vuex"
import app from "./modules/app.js"

export default createStore({
  modules: {app}
})
