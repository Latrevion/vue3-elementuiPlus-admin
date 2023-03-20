<template>
  <el-button type="danger">添加一级分类</el-button>
  <hr class="spacing-hr">
  <el-row :gutter="20">
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
    <el-col :span="18">
      <h4 class="column">分类名称</h4>
      <el-form label-width="100px">
        <el-form-item label="父级分类：">
          <el-input style="width:20%"></el-input>
        </el-form-item>
        <el-form-item label="子级分类：">
          <el-input style="width:20%"></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button type="danger">确定</el-button>
        </el-form-item>
      </el-form>
    </el-col>
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

.column{
  height: 44px;
  padding: 0 20px;
  margin-bottom: 30px;
  line-height: 44px;
  border-radius: 6px;
  background-color: #f3f3f3;
}
</style>