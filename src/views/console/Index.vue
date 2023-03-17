<template>
  <div class="">控制台</div>
  <svg-icon :icon-name="icon"></svg-icon>
</template>

<script>
import {ref} from "vue"
import {useStore} from "vuex"

export default {
  components: {},
  setup(props) {
    const store = useStore()
    console.log(store.state.app.count)
    console.log("计算后的结果", store.getters["app/getUpdateCount"])
    console.log("计算后的结果", store.getters["app/getUpdateText"])
    console.log("---------------------")
    store.commit("app/set_Count")
    console.log(store.state.app.count)
    store.commit('app/set_Text','learning English')
    console.log(store.state.app.text)
    console.log("计算后的结果", store.getters["app/getUpdateText"])
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>