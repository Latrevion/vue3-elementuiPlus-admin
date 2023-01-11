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
              <el-button type="success" class="el-button-block"
              >获取验证码
              </el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" class="el-button-block" disabled
          >登录
          </el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import {reactive} from "vue"

export default {
  props: {},
  setup(props, context) {
    const data = reactive({
      form: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      form_rules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "change"},
          {min: 3, max: 5, message: "长度在3-5个字符", trigger: "change"}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'change'}
        ],
        passwords:[
          {required:true,message:'请再次输入密码',trigger:'change'}
        ],
        code:[
          {required:true,message:'输入验证码',trigger:'change'}
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
    return {data, toggleMenu}
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
