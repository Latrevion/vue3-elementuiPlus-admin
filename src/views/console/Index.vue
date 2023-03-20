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
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>