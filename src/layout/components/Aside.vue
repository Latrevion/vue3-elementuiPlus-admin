<template>
  <h1 class="logo"><img :src="logo" alt="logo"></h1>
  <el-menu
      :collapse="collapse"
      :default-active="currentPath"
      class="el-menu-vertical-demo"
      background-color="#344a5f"
      text-color="#fff"
      active-text-color="#ffffff" router
  >
    <template v-for="item in routers" :key="item.path">
      <template v-if="!item.hidden">
        <!--        一级菜单 -->
        <template v-if="hasOnlyOneChild(item.children)">
          <el-menu-item :index="item.children[0].path">
            <svg-icon :icon-name="item.meta && item.meta.icon" class-name="aside-menu-svg"></svg-icon>
            <span> {{ item.children[0].meta && item.children[0].meta.title }}</span>
          </el-menu-item>
        </template>
        <!-- 子级菜单 -->
        <template v-else>
          <el-sub-menu v-if="item.children &&  item.children.length> 0" :index="item.path">
            <template #title>
              <el-icon>
                <svg-icon :icon-name="item.meta && item.meta.icon" class-name="aside-menu-svg"></svg-icon>
              </el-icon>
              <span>{{ item.meta && item.meta.title }}</span>
            </template>
            <template v-for="child in item.children" :key="child.path">
              <el-menu-item v-if="!child.hidden" :index="child.path">
                {{ child.meta && child.meta.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </template>
  </el-menu>
</template>

<script>
import {useRouter, useRoute} from "vue-router"
import {computed, reactive, toRefs} from "vue"
import {useStore} from "vuex"

export default {
  components: {},
  setup() {
    const store = useStore()
    const {path} = useRoute()

    const {options} = useRouter()
    const routers = options.routes
    //判断是否只有一个菜单
    const hasOnlyOneChild = (children) => {
      //不存在子路由
      if (!children) {
        return false
      }
      //过滤掉hidden属性为true的路由存储路由
      const childRouter = children.filter(item => {
        return item.hidden ? false : true
      })
      console.log(childRouter)
      //只有一个子路由
      if (childRouter.length === 1) {
        return true
      }
      //其他情况
      return false

    }

    //获取当前路由
    const currentPath = computed(() => path)

    const data = reactive({
      // logo:require('@/assets/logo.png'),
      logo: computed(() => {return store.state.app.collapse ? require("@/assets/avatar.png") : require("@/assets/logo.png")}),
      collapse: computed(() => store.state.app.collapse)
    })

    return {routers, hasOnlyOneChild, currentPath, ...toRefs(data)}
  }
}
</script>

<style lang="scss" scoped>
.logo {
  padding: 20px 0;
  border-bottom: 1px solid #2d4153;

  img {
    margin: auto;
  }
}

</style>