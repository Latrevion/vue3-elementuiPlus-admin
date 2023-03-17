<template>
  <el-container id="layout-container">
    <el-aside id="layout-aside" :width="collapse===true?'60px':'250px'">
      <LayoutAside></LayoutAside>
    </el-aside>
    <el-container>
      <el-header id="layout-header" height="75px">
        <LayoutHeader></LayoutHeader>
      </el-header>
      <el-main id="layout-main">
        <LayoutMain></LayoutMain>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutAside from "./components/Aside.vue"
import LayoutHeader from "./components/Header.vue"
import LayoutMain from "./components/Main.vue"
import {computed} from "vue"
import {useStore} from 'vuex'

export default {
  name: "Layout",
  components: {LayoutMain, LayoutAside, LayoutHeader},
  props: {},
  setup(props) {
    const store = useStore()
    const collapse = computed(()=>store.state.app.collapse)
    return {collapse}
  }
}
</script>

<style lang="scss" scoped>
#layout-container {
  height: 100vh;
}

#layout-aside {
  background: #344a5f;
  @include transition(all,250ms);
}

#layout-header {
  position: relative;
  z-index: 10;
  background-color: $color_white;
  @include webkit(box-shadow,0 0 10px 0 rgba(0,0,0,.5));
}

#layout-main {
  background: #bc77a1;
}


</style>