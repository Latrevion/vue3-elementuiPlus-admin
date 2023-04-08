<template>
  <el-pagination
    class="pull-right"
    sizs="small"
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    v-model:current-page="current_page"
    :page-size="10"
    :page-sizes="[10, 20, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>

<script>
import {ref,watchEffect} from "vue"
export default {
  name:'Pagination',
  props:{
    total:{
      type:[Number,String],
      default:0
    }
  },
  emits:['sizeChange','currentChange'],
  setup(props,{emit}){
    //当前页码
    const current_page = ref(0)
    //总条数统计
    const total = ref(props.total)
    //监听props。total发生变化时候更新total
    watchEffect(()=>{total.value =  props.total})
    //页码事件
    const handlerSizeChange = ( val)=>{
      const params = {
        pageNumber:1,
        pageSize:val
      }
      emit('sizeChange',params, 'page')
    }

    const handlerCurrentChange = ( val)=>{
      const params = {
        pageNumber: val
      }
        emit('currentChange',params, 'page')
    }

    // eslint-disable-next-line vue/no-dupe-keys
    return {total,current_page,handlerCurrentChange,handlerSizeChange}
  }
}
</script>

<style lang="scss" scoped>

</style>