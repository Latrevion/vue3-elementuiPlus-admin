<template>
  <el-button type="danger">添加一级分类</el-button>
  <hr class="spacing-hr">
  <el-row>
    <el-col :span="6">树形菜单</el-col>
    <el-col :span="18">输入框</el-col>
  </el-row>
</template>

<script>
export default {
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>
.spacing-hr {
  border: none;
  border-top: 1px solid #e9e9e9;
  margin: 30px 0;
}
</style>