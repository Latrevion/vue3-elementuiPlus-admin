<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
  <el-button type="primary">Primary</el-button>
</template>

<style lang="scss">
#app {
}
</style>
