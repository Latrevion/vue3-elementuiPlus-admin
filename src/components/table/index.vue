<template>
  <div>
    <el-table :data="data.table_data" border style="width:100%">
      <el-table-column v-for="header in data.render_header" :key="header.prop" :prop="header.prop"
                       :label="header.label"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {reactive} from "vue"

export default {
  name: "TableComponents",
  components: {},
  props: {
    columns: {
      type: Array,
      default: () => {[]}
    }
  },
  setup(props) {
    const data = reactive({
      table_data: [],
      render_header: props.columns
    })
    return {
      data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>