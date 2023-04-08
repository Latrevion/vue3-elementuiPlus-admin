<template>
  <el-table :data="table_data.data" border style="width:100%">
    <el-table-column v-if="config.selection" type="selection" width="40"></el-table-column>
    <template v-for="header in data.render_header" :key="header.prop">
<!--      switch-->
      <el-table-column v-if="header.type==='switch'" :label=header.label>
          <template #default="scope">
             <Switch :data="scope.row" :config="header"></Switch>
          </template>
      </el-table-column>
      <el-table-column v-else :prop="header.prop" :label="header.label"></el-table-column>
    </template>
  </el-table>
  <el-row class="margin-top-30">
    <el-col :span="6">
      <el-button v-if="config.batch_delete" :disabled="data.row_data_id.length===0">批量删除</el-button>
    </el-col>
    <el-col :span="18">
        <Pagination v-if="config.pagination" @sizeChange="getList" @currentChange="getList" :total="table_data.total"></Pagination>
    </el-col>
  </el-row>
</template>

<script>
import {onBeforeMount, reactive} from "vue"
//hook
import {configHook} from "./configHook.js"
import {requestHook} from "./requestHook.js"
import Pagination from "@/components/pagination/index.vue"
import Switch from '@/components/switch/index.vue'

export default {
  emits:['onload'],
  name: "TableComponents",
  components: {Switch, Pagination},
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

    onBeforeMount( ( )=>{
      //处理默认配置项
      configInit(props.config)
      //请求数据
      getList(props.request)
    })

    //调用requestHook的requestData ,请求列表数据
    const getList=(params,type )=>{
      requestData(params,type).then(response=>{
        context.emit('onload',table_data)
      })
    }

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