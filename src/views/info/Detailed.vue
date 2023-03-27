<template>
  <el-form label-width="150px">
    <el-form-item label="信息类别：">
      <el-cascader v-model="data.category" :options="category_data.category_options"
                   :props="data.cascade_props"></el-cascader>
    </el-form-item>
    <el-form-item label="信息标题：">
      <el-input v-model="data.title"></el-input>
    </el-form-item>
    <el-form-item label="略缩图：">
      <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :http-request="handlerUpload"
          :on-success="handlerOnSuccess"
          :before-upload="handlerbeforeOnUpload"
          :on-error="handlerOnError"
      >
        <img v-if="data.image_url" :src="data.image_url" class="avatar">
        <span v-else>+</span>
      </el-upload>
    </el-form-item>
    <el-form-item label="发布日期：">
      <el-date-picker v-model="data.date" type="datetime" placeholder="选择日期时间"></el-date-picker>
    </el-form-item>
    <el-form-item label="内容：">
      <div ref="editor"></div>
    </el-form-item>
    <el-form-item>
      <el-button type="danger">确定
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {reactive, ref, onMounted, onBeforeMount} from "vue"
import WangEditor from "wangeditor"
import {useStore} from "vuex"
import {categoryHook} from "@/hook/infoHook.js"
import {UploadFile} from "@/api/common.js"

export default {
  setup(props) {
    //Hook
    const {infoData: category_data, handlerGetCategory: getList} = categoryHook()

    const data = reactive({
      image_url: "",
      category: "",
      title: "",
      date: "",
      category_options: [],
      cascade_props: {
        label: "category_name",
        value: "id"
      }
    })


    //WangEditor
    const editor = ref()
    let editor_instance = null

    //store
    const store = useStore()

    const handlerBeforeOnUpload = (file) => {
      const isJPG = file.type === "image/jpeg" //限制为jpg格式
      const isLt2M = file.size / 1024 / 1024 < 2 // 文件大小小于2mb
      if (!isJPG) {
        ElMessage.error("上传图片只能是JPG格式")
        return false
      }

      if (!isLt2M) {
        ElMessage.error("上传图片不能超过2mb")
        return false
      }
      return isJPG && isLt2M
    }

    const handlerUpload = (params) => {
          console.log(params);
          const file = params.file
      //实例化表单对象
      const form = new FormData()
      //表单添加files字段
      form.append('files',file)
      //上传接口
      UploadFile(form).then(response=>{
        data.image_url = response.data.files_path;
      })

    }

    //挂载之前
    onBeforeMount(() => {
      getList()
    })

    onMounted(() => {
      editor_instance = new WangEditor(editor.value)
      Object.assign(editor_instance.config, {
        onchange() {
          console.log("change")
        }
      })
      editor_instance.create()
    })


    return {data, editor, category_data, handlerBeforeOnUpload,handlerUpload}
  }
}
</script>

<style lang="scss" scoped>

</style>