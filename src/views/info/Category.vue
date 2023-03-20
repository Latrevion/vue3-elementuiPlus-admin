<template>
  <el-button type="danger">添加一级分类</el-button>
  <hr class="spacing-hr">
  <el-row>
    <el-col :span="6">
      <el-tree
        :data="data.tree_data"
        :props="data.defaultProps"
        @node-click="handlerNodeClick"
        default-expand-all
        :expand-on-click-node="false"
      >
        <template #default="{node,data}">
          <div class="custom-tree-node">
            <span>{{node.label}}</span>
            <span>
              <el-button type="danger" round>添加子级</el-button>
              <el-button type="success" round>编辑</el-button>
              <el-button round>删除</el-button>
            </span>
          </div>
        </template>
      </el-tree>
    </el-col>
    <el-col :span="18">输入框</el-col>
  </el-row>
</template>

<script>
import {reactive} from "vue"

export default {
  setup(props) {
    const data =reactive({
      tree_data:[
        {
          text:'一级 1'
          ,
          children:[
            {
              text:'二级 1-1',
              children:[
                {
                  text:'三级 1-1-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps:{
        children:'children',
        label:'text'
      }
    })

    const handlerNodeClick= ( )=>{

    }

    return {data,handlerNodeClick}
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
</style>