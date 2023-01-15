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
      <el-form :model="data.form" :rules="data.form_rules">
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
              >获取验证码
              </el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" class="el-button-block" disabled
          >{{data.current_menu==='login'?'登录':"注册"}}
          </el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import {reactive, getCurrentInstance} from "vue"
import {validate_email, validate_password, validate_code} from "@/utils/validate.js"

//api
import {GetCode} from "@/api/common.js"

export default {
  props: {},
  setup(props, context) {

    const instance = getCurrentInstance()
    const {proxy} = getCurrentInstance()


    const handlerGetCode =()=>{
      const username =data.form.username //获取用户名
      const password = data.form.password //获取用户密码
      const passwords = data.form.passwords //获取确认密码
      //校验用户名
      if(!validate_email(username)){
        // eslint-disable-next-line no-undef
        ElMessage({
          message: '用户名不能为空 或 格式不正确',
          type: 'error',
        })
        return false
      }

      //校验密码
      if (!validate_password(password)){
        // eslint-disable-next-line no-undef
        ElMessage({
          message: '密码不能为空 或 格式不正确',
          type: 'error',
        })
        return false
      }
      //判断为注册，校验两次密码
      if (data.current_menu ==='register' && (password !== passwords)){
        // eslint-disable-next-line no-undef
        ElMessage({
          message:'两次密码不一致',
          type:'error'
        })
        return false
      }

      GetCode()
    }
    const getCode= ( )=>{
        proxy.$axios.post('http://v3.web-jshtml.cn/api/getCode/')
    }
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
    })

    const toggleMenu = (type) => {
      data.current_menu = type
    }
    return {data, toggleMenu,getCode,handlerGetCode}
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
