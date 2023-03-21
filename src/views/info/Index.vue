<template>
  <el-row>
    <el-col :span="18">
      <el-form :inline="true" label-width="80px">
        <el-form-item label="类别:">
          <el-select v-model="data.category" placeholder="请选择" class="width-160">
            <el-option
                v-for="item in data.category_options"
                :key="item.value"
                :value="item.value"
                :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字:">
          <el-select placeholder="请选择" class="width-100"></el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入关键字" class="width-180"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6">
      <router-link to="/newsDetailed" class="pull-right">
        <el-button type="danger">新增</el-button>
      </router-link>
    </el-col>
  </el-row>
  <el-table
      ref="ElTable"
      :data="data.tableData"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="40"/>
    <el-table-column property="name" label="标题" width="500"></el-table-column>
    <el-table-column property="address" label="类别"/>
    <el-table-column property="date" label="日期"/>
    <el-table-column property="address" label="操作" width="200">
      <template #default="scope">
        <el-button type="danger" size="mini" @click="handlerDetailed">编辑</el-button>
        <el-button size="mini">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row class="margin-top-30">
    <el-col :span="6">
      <el-button>批量删除</el-button>
    </el-col>
    <el-col :span="18">
      <el-pagination
          class="pull-right"
          small
          background
          @size-change="handlerSizeChange"
          @current-change="handlerCurrentChange"
          :current-page="data.curren_page"
          :page-size="10"
          :page-sizes="[10,20,50,100]"
          layout="total,sizes,prev, pager, next,jumper" :total="100"
      />
    </el-col>
  </el-row>
</template>

<script>
import {getCurrentInstance, reactive} from "vue"
import {useRouter} from 'vue-router'

export default {
  setup(props, context) {
    // const {proxy} =getCurrentInstance()
    const router = useRouter()
    const data = reactive({
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
      currentPage: 1
    })

    //多选事件
    const handlerSelectionChange = () => {
      console.log(handlerSelectionChange)
    }
    //分页器的页码方法
    const handlerSizeChange = (val) => {}
    const handlerCurrentChange = (val) => {}

    //详情页编辑
    const handlerDetailed = ( )=>{
        router.push({
          path:'/newsDetailed'
        })
    }

    return {data, handlerSelectionChange, handlerSizeChange, handlerCurrentChange,handlerDetailed}
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