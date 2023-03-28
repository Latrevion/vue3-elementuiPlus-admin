<template>
  <el-form ref="formDom" label-width="150px" :model="field" :rules="form_rules">
    <el-form-item label="信息类别：" prop="category_id">
      <el-cascader v-model="field.category_id" :options="category_data.category_options"
                   :props="data.cascade_props"></el-cascader>
    </el-form-item>
    <el-form-item label="信息标题：" prop="title">
      <el-input v-model="field.title"></el-input>
    </el-form-item>
    <el-form-item label="略缩图：" prop="image_url">
      <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :http-request="handlerUpload"
          :on-success="handlerOnSuccess"
          :before-upload="handlerbeforeOnUpload"
          :on-error="handlerOnError"
      >
        <img v-if="field.image_url" :src="field.image_url" class="avatar">
        <span v-else>+</span>
      </el-upload>
    </el-form-item>
    <el-form-item label="发布日期：" prop="create_date">
      <el-date-picker v-model="field.create_date" type="datetime" placeholder="选择日期时间"></el-date-picker>
    </el-form-item>
    <el-form-item label="内容：" prop="content">
      <div ref="editor"></div>
    </el-form-item>
    <el-form-item label="是否发布：" prop="status">
      <el-radio-group v-model="field.status">
        <el-radio label="1">是</el-radio>
        <el-radio label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="danger" @click="handlerSubmitForm">确定
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {reactive, ref, onMounted, onBeforeMount, toRefs} from "vue"
import WangEditor from "wangeditor"
import {useStore} from "vuex"
import {categoryHook} from "@/hook/infoHook.js"
import {UploadFile} from "@/api/common.js"
import {dayjs} from "element-plus"

export default {
  setup(props) {
    //Hook
    const {infoData: category_data, handlerGetCategory: getList} = categoryHook()

    const data = reactive({
      category_options: [],
      cascade_props: {
        label: "category_name",
        value: "id"
      }
    })

    const form_data = reactive({
      field: {
        image_url: "",
        category_id: "",
        title: "",
        create_date: "",
        content: "",
        status: "0"
      },
      form_rules: {
        category_id: [
          {
            required: true, message: "分类不能为空", trigger: "change"
          }
        ],
        title: [
          {
            required: true, message: "标题不能为空", trigger: "change"
          }
        ],
        image_url: [
          {
            required: true, message: "略缩图不能为空", trigger: "change"
          }
        ],
        create_date: [
          {
            required: true, message: "请选择发布日期", trigger: "change"
          }
        ],
        status: [
          {
            required: true, message: "请选择发布状态", trigger: "change"
          }
        ],
        content: [
          {
            required: true, message: "内容不能为空", trigger: "change"
          }
        ],
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
      console.log(params)
      const file = params.file
      //实例化表单对象
      const form = new FormData()
      //表单添加files字段
      form.append("files", file)
      //上传接口
      UploadFile(form).then(response => {
        form_data.field.image_url = response.data.files_path
      })

    }
    const formDom = ref()
    const handlerSubmitForm = () => {
      formDom.value.validate((valid) => {
        //表单通过
        if (valid) {
          // console.log(form_data.field)
          //深拷贝
          const request_data = JSON.parse(JSON.stringify(form_data.field))
          //日期处理
          request_data.create_date = dayjs(request_data.create_date).format('YYYY-MM-DD HH:mm:ss')
          //为category_id重新赋值
          request_data.category_id = request_data.category_id[request_data.category_id.length-1]
          console.log(request_data)
        } else {
          console.log("error submit")
          return false
        }
      })
    }

    //挂载之前
    onBeforeMount(() => {
      getList()
    })

    onMounted(() => {
      editor_instance = new WangEditor(editor.value)
      Object.assign(editor_instance.config, {
        onchange(value) {
          form_data.field.content = value
        }
      })
      editor_instance.create()
    })


    return {
      data,
      editor,
      category_data,
      handlerBeforeOnUpload,
      handlerUpload, ...toRefs(form_data),
      handlerSubmitForm,
      formDom
    }
  }
}
</script>

<style lang="scss" scoped>

</style>