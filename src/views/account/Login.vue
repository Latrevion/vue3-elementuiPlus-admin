<template>
  <div id="login">
    <div class="form-wrap">
      <ul class="menu-tab">
        <li
            @click="toggleMenu(item.type)"
            :class="{ 'current': data.current_menu === item.type }"
            v-for="item in data.tab_menu"
            :key="item.type"
        >
          {{ item.label }}
        </li>
      </ul>
      <el-form ref="account_form" :model="data.form" :rules="data.form_rules">
        <el-form-item prop="username">
          <label class="form-label">用户名</label>
          <el-input v-model="data.form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label class="form-label">密码</label>
          <el-input type="password" v-model="data.form.password"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" v-show="data.current_menu === 'register'">
          <label class="form-label">确认密码</label>
          <el-input type="password" v-model="data.form.passwords"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <label class="form-label">验证码</label>
          <el-row :gutter="10">
            <el-col :span="14">
              <el-input v-model="data.form.code"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button type="success" class="el-button-block" @click="handlerGetCode"
                         :loading="data.code_button_laoding" :disabled="data.code_button_disabled"
              >{{ data.code_button_text }}
              </el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" class="el-button-block" :disabled="data.submit_button_disabled"
          >{{ data.current_menu === "login" ? "登录" : "注册" }}
          </el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import {reactive, getCurrentInstance, onBeforeMount} from "vue"
import {validate_email, validate_password, validate_code} from "@/utils/validate.js"

//api
import {GetCode,ErrorHttp} from "@/api/common.js"

export default {
  props: {},
  setup(props, context) {

    const instance = getCurrentInstance()
    const {proxy} = getCurrentInstance()
    console.log(proxy,123)


    const handlerGetCode = () => {
      const username = data.form.username //获取用户名
      const password = data.form.password //获取用户密码
      const passwords = data.form.passwords //获取确认密码
      //校验用户名
      if (!validate_email(username)) {
        // eslint-disable-next-line no-undef
        ElMessage({
          message: "用户名不能为空 或 格式不正确",
          type: "error",
        })
        return false
      }

      //校验密码
      if (!validate_password(password)) {
        // eslint-disable-next-line no-undef
        ElMessage({
          message: "密码不能为空 或 格式不正确",
          type: "error",
        })
        return false
      }
      //判断为注册，校验两次密码
      if (data.current_menu === "register" && (password !== passwords)) {
        // eslint-disable-next-line no-undef
        ElMessage({
          message: "两次密码不一致",
          type: "error"
        })
        return false
      }
      const requestData = {
        username: data.form.username,
        module: "register"
      }

      data.code_button_laoding = true
      data.code_button_text = "发送中"

      GetCode(requestData).then(response => {
        const resData = response
        console.log(123,resData)
        //用户已存在
        if (resData.resCode === 1024) {
          let dataMessage = resData.message.slice(0, 9)
          ElMessage.error(dataMessage)
          proxy.data.code_button_laoding = false
          proxy.data.code_button_text = "获取验证码"
          return false
        }
        //激活提交按钮
        data.submit_button_disabled=false
        //成功就提示
        let dataMessage = resData.message.slice(0, 18)
        ElMessage.success(dataMessage)
        //执行倒计时
        countdown(60)
      }).catch(error => {
        proxy.data.code_button_laoding = false
        proxy.data.code_button_disabled=false
        proxy.data.code_button_text='获取验证码'
      })
    }

    //倒计时
    const countdown=(time)=>{
      let second =time ||60
      data.code_button_laoding=false //取消加载
      data.code_button_disabled=true//禁用按钮
      data.code_button_text=`倒计时${second}秒`
      //判断是否有计时器，存在则删除
      if (data.code_button_timer){clearInterval(data.code_button_timer)}
      //开启计时器
      data.code_button_timer=setInterval(()=>{
        second--;
        data.code_button_text=`倒计时${second}秒` //按钮文本
        if(second<=0){
          data.code_button_text='重新获取' //按钮文本
          data.code_button_disabled=false //启用按钮
          clearInterval(data.code_button_timer)//清理计时器
        }
      },1000)
    }

    onBeforeMount(()=>{
      clearInterval(data.code_button_timer) //删除倒计时
    })

    const validate_name_rules = (rule, value, callback) => {
      let regEmail = validate_email(value)
      if (value === "") {
        callback(new Error("请输入邮箱"))
      } else if (!regEmail) {
        callback(new Error("请输入正确的邮箱"))
      } else {
        callback()
      }
    }

    const validate_password_rules = (rule, value, callback) => {
      let regPassword = validate_password(value)
      if (value === "") {
        callback(new Error("请输入密码"))
      } else if (!regPassword) {
        callback(new Error("密码必须为6-20位数字和字母组合"))
      } else {
        callback()
      }
    }

    //校验确认密码
    const validate_passwords_rules = (rule, value, callback) => {
      //如果是在登录页，直接通过，不需要验证确认密码
      if (data.current_menu === "login") {callback()}

      let regPassword = validate_password(value)
      //获取密码
      const passwordValue = data.form.password
      if (value === "") {
        callback(new Error("请输入确认密码"))
      } else if (!regPassword) {
        callback(new Error("密码必须为6-20位数字和字母组合"))
      } else if (passwordValue && passwordValue !== value) {
        callback(new Error("两次输入密码不一致"))

      } else {
        callback()
      }
    }

    //校验验证码
    const validate_code_rules = (rule, value, callback) => {
      let regCode = validate_code(value)
      if (value === "") {
        callback(new Error("请输入验证码"))
      } else if (!regCode) {
        callback(new Error("验证码错误，请重新输入"))
      } else {
        callback()
      }
    }


    const data = reactive({
      form: {
        username: "", //用户名
        password: "", //密码
        passwords: "",//确认密码
        code: "",    //验证码
      },
      form_rules: {
        username: [
          {validator: validate_name_rules, trigger: "change"}
        ],
        password: [
          {validator: validate_password_rules, trigger: "change"}
        ],
        passwords: [
          {validator: validate_passwords_rules, trigger: "change"}
        ],
        code: [
          {validator: validate_code_rules, trigger: "change"}
        ]
      },
      tab_menu: [
        {type: "login", label: "登录"},
        {type: "register", label: "注册"},
      ],
      current_menu: "login",
      //   获取验证码按钮交互
      code_button_disabled: false,//启动按钮
      code_button_laoding: false,//加载状态
      code_button_text: "获取验证码",//按钮文本
      code_button_timer: null, //定时器
      submit_button_disabled:true //提交按钮
    })

    const toggleMenu = (type) => {
      data.current_menu = type
    }
    //提交表单
    const submitForm = ()=>{
      proxy.$refs.account_form.validate((valid)=>{
        if (valid){
          alert('sunmit!')
        }else{
          alert('验证不通过！')
          return false
        }
      })
    }

    return {data, toggleMenu,  handlerGetCode,submitForm}
  },
}
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}

.form-wrap {
  width: 320px;
  padding-top: 100px;
  margin: auto;
}

.menu-tab {
  text-align: center;

  li {
    display: inline-block;
    padding: 10px 24px;
    margin: 0 10px;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;

    &.current {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}

.form-label {
  display: block;
  color: #fff;
  font-size: 14px;
}

:deep(.el-form-item__content) {
  display: block;
}
</style>
