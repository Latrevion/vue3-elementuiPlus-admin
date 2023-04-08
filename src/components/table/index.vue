<template>
  <el-table :data="table_data.data" border style="width:100%">
    <el-table-column v-if="config.selection" type="selection" width="40"></el-table-column>
    <el-table-column v-for="header in data.render_header"
                     :key="header.prop"
                     :prop="header.prop"
                     :label="header.label">
    </el-table-column>
  </el-table>
  <el-row class="margin-top-30">
    <el-col :span="6">
      <el-button v-if="config.batch_delete" :disabled="data.row_data_id.length===0">批量删除</el-button>
    </el-col>
    <el-col :span="18">
      <el-pagination v-if="config.pagination"
                     class="pull-right"
                     sizs="small"
                     background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="data.currentPage"
                     :page-size="10"
                     :page-sizes="[10, 20, 50, 100]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="table_data.total">
        >
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
import {reactive} from "vue"
//hook
import {configHook} from "./configHook.js"
import {requestHook} from "./requestHook.js"

export default {
  emits:['onload'],
  name: "TableComponents",
  components: {},
  props: {
    columns: {
      type: Array,
      default: () => {[]}
    },
    config: {
      type: Object,
      default: () => {return {}}
    },
    request: {
      type: Object,
      default: () => {return {}}

    }
  },
  setup(props,context) {
    const {config, configInit} = configHook()
    const {requestData,table_data} = requestHook()
    const data = reactive({
      table_data: table_data.data,
      render_header: props.columns,
      row_data_id: [],
      currentPage: 0,
      total: 0
    })
    //处理默认配置项
    configInit(props.config)
    //请求数据初始化
    requestData(props.request).then(response=>{
      context.emit('onload',table_data)
    })
    return {
      data,
      // eslint-disable-next-line vue/no-dupe-keys
      config,
      table_data
    }
  }
}
</script>

<style lang="scss" scoped>
.margin-top-30 {
  margin-top: 20px;
}
</style>