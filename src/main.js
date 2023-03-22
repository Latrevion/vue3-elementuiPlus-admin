import {createApp} from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

//引入svgIcon
import SvgIcon from '@/components/SvgIcon/Index.vue'
//批量引入svg文件
import '@/components/SvgIcon/svg'
//路由守卫
import './router/permit.js'
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('svg-icon',SvgIcon)


app.use(store).use(router).mount("#app")
