<template>
  <div id="main-content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>
#main-content{
  background-color: #fff;
  padding: 20px;
  min-height: 100%;
  @include webkit(box-sizing,border-box)
}
</style>