<template>
  <el-button type="danger" @click="handlerCategory('first_category_add')">添加父级分类</el-button>
  <hr class="spacing-hr">
  <el-row :gutter="20">
    <el-col :span="7">
      <el-tree
          :data="data.tree_data"
          :props="data.defaultProps"
          @node-click="handlerNodeClick"
          default-expand-all
          :expand-on-click-node="false"
      >
        <template #default="{node,data}">
          <div class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="danger" round size="small" class="button-mini"
                         @click="handlerCategory('child_category_add')">添加子级</el-button>
              <el-button type="success" round size="small" class="button-mini"
                         @click="handlerCategory(node.level===1?'parent_category_edit':'child_category_edit',node)">编辑分类</el-button>
              <el-button round size="small" class="button-mini">删除分类</el-button>
            </span>
          </div>
        </template>
      </el-tree>
    </el-col>
    <el-col :span="17">
      <h4 class="column">{{ config[config.type].title }}</h4>
      <el-form label-width="120px">
        <el-form-item label="父级分类名称：">
          <el-input v-model.trim="data.parent_category" :disabled="config[config.type].parent_disabled"
                    style="width:20%"></el-input>
        </el-form-item>
        <el-form-item label="子级分类名称：" v-if="config[config.type].sub_show">
          <el-input v-model.trim="data.sub_category" :disabled="config[config.type].sub_disabled"
                    style="width:20%"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="danger" :loading="data.button_loading" @click="handlerSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import {reactive, getCurrentInstance, onBeforeMount} from "vue"
import {firstCategoryAdd, GetGategory} from "@/api/info.js"

export default {
  setup(props) {
    const {proxy} = getCurrentInstance()

    const data = reactive({
      tree_data: [],
      defaultProps: {
        children: "children",
        label: "category_name",
      },
      parent_category: "父级分类文本演示",//父级分类名称
      sub_category: "子级分类文本演示",//子级分类名称
      button_loading: false,//加载确定按钮
    })

    const config = reactive({
      type: "default",//记录操作类型
      default: {
        title: "分类标题",//分类标题
        parent_disabled: true,//父级分类输入框禁用/启用
        sub_disabled: true,//子级分类输入框禁用/启用
        sub_show: true, //子级分类显示/隐藏
      },
      first_category_add: {
        title: "添加父级分类",//分类标题
        parent_disabled: false,//父级分类输入框禁用/启用
        sub_disabled: true,//子级分类输入框禁用/启用
        sub_show: false, //子级分类显示/隐藏
        clear: ["parent_category", "sub_category"]
      },
      child_category_add: {
        title: "添加子级分类",//分类标题
        parent_disabled: true,//父级分类输入框禁用/启用
        sub_disabled: false,//子级分类输入框禁用/启用
        sub_show: true, //子级分类显示/隐藏
        clear: ["sub_category"],
        create: ["parent_category"]
      },
      parent_category_edit: {
        title: "编辑父级分类",//分类标题
        parent_disabled: false,//父级分类输入框禁用/启用
        sub_disabled: true,//子级分类输入框禁用/启用
        sub_show: false, //子级分类显示/隐藏
      },
      child_category_edit: {
        title: "编辑子级分类",//分类标题
        parent_disabled: true,//父级分类输入框禁用/启用
        sub_disabled: false,//子级分类输入框禁用/启用
        sub_show: true, //子级分类显示/隐藏

      },
    })

    const handlerNodeClick = () => {
      console.log("handlerNodeClick")
    }

    const handlerCategory = (type, node_data) => {
      config.type = type
      console.log(node_data)
      //删除还原内容
      handlerInputValue()
    }

    const handlerInputValue = () => {
      //获取还原数据对象
      const createObject = config[config.type].create
      //执行还原动作
      if (createObject && createObject.length > 0) {
        createObject.forEach(item =>
            data[item] = "create11"
        )
      }

      //获取删除数据的对象
      const clearObject = config[config.type].clear
      //执行删除动作
      if (clearObject && clearObject.length > 0) {
        clearObject.forEach(item => {
          data[item] = ""
        })
      }
    }


    const handlerSubmit = () => {
      if (config.type === "first_category_add") {
        handlerFirstCategoryAdd()
      }
    }
    //添加父级分类
    const handlerFirstCategoryAdd = () => {
      //父级为空的时候，提示阻止
      if (!data.parent_category) {
        ElMessage.error("父级分类名称不能为空")
        return false
      }
      //確定按鈕為加載狀態，防止多次點擊
      data.button_loading = true
      //执行接口
      firstCategoryAdd({
        "categoryName": data.parent_category
      }).then(response => {
            data.button_loading = false//删除按钮加载状态
            response.message = response.message.slice(0, 5)
            ElMessage.success(response.message)
            data.parent_category = ""//父级分类删除文本
          }
      ).catch(error => {
            data.button_loading = false
            console.log(error, "firstCategoryAdd error")
          }
      )
    }

    const handlerGetCategory= ( )=>{
        GetGategory().then(response=>{
          data.tree_data= response.data || []
        }).catch( error=>{
          console.log(error,'handlerGetCategory is error')
        })
    }

    onBeforeMount( ( )=>{
        handlerGetCategory()
    })

    return {data, handlerNodeClick, config, handlerCategory, handlerInputValue, handlerSubmit, handlerFirstCategoryAdd}
  }
}
</script>

<style lang="scss" scoped>
.spacing-hr {
  border: none;
  border-top: 1px solid #e9e9e9;
  margin: 30px 0;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
}

:deep(.el-tree-node__content) {
  height: auto;

  button {
    padding: 6px 12px;
    margin: 8px 3px;
    font-size: 12px;
  }
}

.column {
  height: 44px;
  padding: 0 20px;
  margin-bottom: 30px;
  line-height: 44px;
  border-radius: 6px;
  background-color: #f3f3f3;
}
</style>