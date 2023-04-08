<template>
<!--  <BasisTable :columns="table_config.table_header" :config="table_config.config" :request="table_config.request"></BasisTable>-->
  <el-row>
    <el-col :span="18">
      <el-form :inline="true">
        <el-form-item label="类别">
          <el-cascader v-model="request_data.category_id" :options="category_data.category_options" :props="data.cascader_props"></el-cascader>
        </el-form-item>
        <el-form-item label="关键字">
          <el-select v-model="request_data.key" placeholder="请选择" class="width-100">
            <el-option v-for="item in data.keyword_options" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="request_data.keyword" placeholder="请输入关键字" class="width-180"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="handlerGetList">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6">
      <router-link to="/newsDetailed" class="pull-right">
        <el-button type="danger">新增</el-button>
      </router-link>
    </el-col>
  </el-row>
  <BasisTable :columns="table_config.table_header" :config="table_config.config" :request="table_config.request"  @onload="handlerOnload"/>
  <el-table ref="table" border :data="data.tableData" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="40"></el-table-column>
    <el-table-column prop="title" label="标题" width="500"></el-table-column>
    <el-table-column prop="category_name" label="类别"></el-table-column>
    <el-table-column prop="createDate" label="日期" :formatter="formatDate"></el-table-column>
    <el-table-column label="发布状态">
      <template #default="scope">
        <el-switch v-model="scope.row.status" :loading="scope.row.loading" @change="changeStatus($event, scope.row)"></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template #default="scope">
        <el-button type="danger" @click="handlerDetailed(scope.row.id)">编辑</el-button>
        <el-button @click="handlerDeleteComfirm(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row class="margin-top-20">
    <el-col :span="6">
      <el-button :disabled="data.row_data_id.length === 0" @click="handlerDeleteComfirm(data.row_data_id)">批量删除</el-button>
    </el-col>
    <el-col :span="18">
      <el-pagination
        class="pull-right"
        sizs="small"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:current-page="data.currentPage"
        :page-size="10"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
import {reactive, onBeforeMount, getCurrentInstance} from "vue"
import {useRouter} from "vue-router"
import {GetTableList, Status, Delete} from "@/api/info.js"
import {dayjs} from "element-plus"
import {categoryHook} from "@/hook/infoHook.js"
import BasisTable from "@c/table"

export default {
  components: {BasisTable},
  setup(props, context) {
    //hook
    const {infoData: category_data, handlerGetCategory: getList} = categoryHook()

    //获取实例上下文
    const {proxy} = getCurrentInstance()
    const router = useRouter()
    const data = reactive({
      //页码总数
      total: 0,
      category: 0,
      category_options: [
        {label: "人工智能", value: 0},
        {label: "技术", value: 1},
      ],
      tableData: [
        {
          name: "王晓虎", address: "上海市普多区金沙江路1518弄", date: "2020-06-05 12:00:00"
        },
        {
          name: "王小虎", address: "上海市普多区金沙江路120弄", date: "2020-06-05 13:00:00"
        }
      ],
      currentPage: 1,
      //id
      row_data_id: "",
      //配置级联选择器
      cascader_props: {
        label: "category_name",
        value: "id"
      },

      keyword_options: [
        {label: "ID", value: "id"},
        {label: "标题", value: "title"}
      ]
    })

    const request_data = reactive({
      pageNumber: 1,
      pageSize: 10,
      category_id: [],
      key: "",
      keyword: ""
    })

    const table_config= reactive({
      table_header:[
        {label:"标题",prop:"title"},
        {label:"类别",prop:"category_name"},
        {label:"日期",prop:"createDate"},
        {key_id:'id',type:"switch",label:"发布状态",prop:"status",api_module:'info',api_key:'info_status',api_url:'/news/status/'}
      ],
      config:{
        // selection:false,//关闭复选框
        // batch_delete:false
      },
      request:{
        url:'info',
        data:{
          pageNumber:1,
          pageSize:10
        }
      }
    })

    //多选事件
    const handlerSelectionChange = (val) => {
      console.log(val)
      if (val && val.length > 0) {
        const idItem = val.map(item => item.id) //映射id
        // console.log(idItem)
        data.row_data_id = idItem.join()
        // console.log( data.row_data_id,typeof data.row_data_id)
      } else {
        data.row_data_id = ""
      }
    }

    //分页器的页码方法
    const handlerSizeChange = (val) => {
      request_data.pageSize = val
      request_data.pageNumber = 1
      handlerGetList()
    }
    const handlerCurrentChange = (val) => {
      request_data.pageNumber = val
      handlerGetList()
    }

    //详情页编辑
    const handlerDetailed = (id) => {
      router.push({
        name: "NewsDetailed",
        query: {id}
      })
    }

    const handlerGetList = () => {
      const request_data = formatParams()
      GetTableList(request_data).then(response => {
        const response_data = response.data
        data.tableData = response_data.data
        data.total = response_data.total
      })
    }
    //格式化时间
    const formatDate = (row) => {
      return dayjs(row.createDate * 1000).format("YYYY-MM-DD HH:mm:ss")
    }


    const changeStatus = (value, data) => {
      console.log(value, "value")
      console.log(data, "data")
      data.loading = true
      data.status = !data.status
      Status({id: data.id, status: value}).then(response => {
        ElMessage.success(response.message.slice(0, 5))
        data.loading = false
        data.status = value
      }).catch(error => {
        data.loading = false
      })

    }

    const handlerDeleteConfirm = (value) => {
      proxy.deleteConfirm({
        title: "删除",
        message: "确认删除当前数据吗？",
        thenFun: () => {
          return handlerDelete(value)
        }
      })
    }

    const handlerDelete = (value) => {
      return new Promise((resolve, reject) => {
        Delete({id: value}).then(response => {
          ElMessage.success(response.message.slice(0, 5))
          handlerGetList()
          data.row_data_id = []
          resolve()
        }).catch(error => {
          reject()
        })
      })
    }

    const formatParams = () => {
      const data = Object.assign({}, request_data)
      //级联选择器获取最后一项
      if (data.category_id.length) {
        data.category_id = data.category_id[data.category_id.length - 1]
      } else {
        delete data.category_id
      }
      //关键字key
      if (data.key && data.keyword) {
        data[data.key] = data.keyword
      }
      //删除字段
      delete data.key
      delete data.keyword
      //返回已处理的数据
      return data
    }

    const handlerOnload = (data)=>{
      console.log(data)
    }


    onBeforeMount(() => {
      handlerGetList()
      getList()
    })


    return {
      data,
      handlerSelectionChange,
      handlerSizeChange,
      handlerCurrentChange,
      handlerDetailed,
      formatDate,
      changeStatus,
      handlerDeleteConfirm,
      handlerDelete,
      request_data,
      category_data,
      handlerGetList,
      table_config,
      handlerOnload
    }
  }
}
</script>

<style lang="scss" scoped>
.width-160 {
  width: 160px;
}

.width-100 {
  width: 160px;
}

.width-180 {
  width: 180px;
}
</style>