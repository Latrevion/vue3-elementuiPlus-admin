<template>
  <el-container id="layout-container">
    <el-aside id="layout-aside" width="250px">
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

export default {
  name: "Layout",
  components: {LayoutMain, LayoutAside, LayoutHeader},
  props: {},
  setup(props) {
    return {}
  }
}
</script>

<style lang="scss" scoped>
#layout-container {
  height: 100vh;
}

#layout-aside {
  background: #344a5f;
}

#layout-header {
  background-color: #77bc99;
}

#layout-main {
  background: #bc77a1;
}


</style>