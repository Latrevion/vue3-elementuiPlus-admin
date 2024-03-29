<template>
  <el-button type="danger" @click="handlerCategory('first_category_add')">添加父级分类</el-button>
  <hr class="spacing-hr">
  <el-row :gutter="20">
    <el-col :span="12">
      <el-tree
          ref="categoryTree"
          :data="data.tree_data"
          :props="data.defaultProps"
          default-expand-all
          :expand-on-click-node="false"
      >
        <!-- eslint-disable-next-line vue/no-unused-vars-->
        <template #default="{node,data}">
          <div class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="danger" round size="small" class="button-mini"
                         @click="handlerCategory('child_category_add',node)">添加子级</el-button>
              <el-button type="success" round size="small" class="button-mini"
                         @click="handlerCategory(node.level===1?'parent_category_edit':'child_category_edit',node)">编辑分类</el-button>
              <el-button round size="small" class="button-mini"
                         @click="handlerCategory('delete_category',node)">删除分类</el-button>
            </span>
          </div>
        </template>
      </el-tree>
    </el-col>
    <el-col :span="12">
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
import {reactive, onBeforeMount, ref} from "vue"
import {firstCategoryAdd, GetCategory, ChildCategoryAdd, CategoryEdit, CategoryDel} from "@/api/info.js"

export default {
  setup() {

    const categoryTree = ref(null)
    const data = reactive({
      tree_data: [],
      defaultProps: {
        children: "children",
        label: "category_name",
      },
      sub_category: "",//子级分类名称
      button_loading: false,//加载确定按钮
      parent_category: "",//父级分类名称
      parent_category_data: null,
      sub_category_data: null,
    })

    const config = reactive({
      type: "default",//记录操作类型
      default: {
        title: "分类标题",//分类标题
        parent_disabled: true,//父级分类输入框禁用/启用
        sub_disabled: true,//子级分类输入框禁用/启用
        sub_show: true, //子级分类显示/隐藏
        clear: ["parent_category", "sub_category"]
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
        create: ["parent_category"]
      },
      child_category_edit: {
        title: "编辑子级分类",//分类标题
        parent_disabled: true,//父级分类输入框禁用/启用
        sub_disabled: false,//子级分类输入框禁用/启用
        sub_show: true, //子级分类显示/隐藏
        create: ["parent_category", "sub_category"]
      },
    })

    // const handlerNodeClick = () => {
    //   console.log("handlerNodeClick")
    // }

    const handlerCategory = (type, node_data) => {
      if (type === "child_category_edit") {
        data.parent_category_data = node_data.parent || null
        data.sub_category_data = node_data || null
      } else {
        data.parent_category_data = node_data || null
      }

      config.type = type === "delete_category" ? "default" : type
      //删除还原内容
      handlerInputValue();
      //弹窗二次提示
      (type === "delete_category") && handlerDeleteConfirm()
    }

    const handlerInputValue = () => {
      //获取还原数据对象
      const createObject = config[config.type].create
      //执行还原动作
      if (createObject && createObject.length > 0) {
        createObject.forEach(item =>
            data[item] = data[`${item}_data`].data.category_name
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
      if (config.type === "child_category_add") {
        handlerChildCategoryAdd()
      }
      if (config.type === "child_category_edit") {
        handlerCategoryEdit()
      }
      if (config.type === "parent_category_edit") {
        handlerCategoryEdit()
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
            //更新树形菜单数据
            handlerGetCategory()
          }
      ).catch(error => {
            data.button_loading = false
            console.log(error, "firstCategoryAdd error")
          }
      )
    }

    //添加子级分类
    const handlerChildCategoryAdd = () => {
      //子级分类为空时提示
      if (!data.sub_category) {
        ElMessage.error("子级分类不能为空！")
        return false
      }
      //按钮加载状态
      data.button_loading = true
      //请求接口
      ChildCategoryAdd({
        categoryName: data.sub_category, //分类名称参数
        parentId: data.parent_category_data.data.id //父级分类id参数
      }).then(response => {
        //删除加载状态
        data.button_loading = false
        //成功提示
        ElMessage.success(response.message.slice(0, 5))
        //删除子级分类文本
        data.sub_category = ""
        //追加子级数据
        categoryTree.value.append(response.data, data.parent_category_data)
      }).catch(error => {
        data.button_loading = false
        console.log(error, "ChildCategoryAdd error")
      })

    }

    const handlerGetCategory = () => {
      GetCategory().then(response => {
        data.tree_data = response.data || []
      }).catch(error => {
        console.log(error, "handlerGetCategory is error")
      })
    }

    //编辑分类
    const handlerCategoryEdit = () => {
      //分类为空时候提示
      if (!data.sub_category || !data.parent_category) {
        const message = config.type === "parent_category_edit" ? "父级" : "子级"
        ElMessage.error(`${message}分类不能为空`)
        return false
      }
      //按钮加载状态
      data.button_loading = true
      //预先获取存储的节点
      console.log("date.parent_category_data =>", data.parent_category_data)
      console.log("date.parent_category_data.date =>", data.parent_category_data.data)
      const node_parent = data.parent_category_data
      const node_sub = data.sub_category_data
      //接口
      CategoryEdit({
        categoryName: config.type === "parent_category_edit" ? data.parent_category : data.sub_category,//分类名称参数
        id: config.type === "parent_category_edit" ? node_parent.data.id : node_sub.data.id //分类id参数
      }).then(response => {
        //删除加载状态
        data.button_loading = false
        //成功提示
        ElMessage.success(response.message.slice(0, 5))
        //同步更新树形菜单节点
        const node_date = config.type === "parent_category_edit" ? node_parent.data : node_sub.data
        node_date.category_name = response.data.category_name
      }).catch(error => {
        data.button_loading = false
        console.log("CategoryEdit error", error)
      })

    }

    const handlerDeleteConfirm = () => {
      ElMessageBox.confirm("确认删除该分类吗？ 删除后无法恢复", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        showClose: false,//取消右上角关闭图标
        closeOnClickModal: false,//取消单击遮罩层关闭
        closeOnPressEscape: false,//取消Esc关闭遮罩层
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true
            CategoryDel({
              categoryId: data.parent_category_data.data.id
            }).then(response => {
              //成功提示
              ElMessage({
                message: response.message.slice(0,5),
                type: "success"
              })
              instance.confirmButtonLoading = false
              done()
              //删除节点
              console.log('date.parent_category_data',data.parent_category_data)
              categoryTree.value.remove(data.parent_category_data)
            }).catch(error => {
              instance.confirmButtonLoading = false
              done()
              console.log(error)
            })
          } else {
            done()
          }
        }
      })
    }

    onBeforeMount(() => {
      handlerGetCategory()
    })

    return {
      data,
      // handlerNodeClick,
      config,
      handlerCategory,
      handlerInputValue,
      handlerSubmit,
      handlerFirstCategoryAdd,
      categoryTree,
      handlerDeleteConfirm
    }
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