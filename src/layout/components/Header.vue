<template>
  <div class="header-wrap">
    <div class="wrap">
      <!--      左侧-->
      <span class="menu-btn" @click='switchAside'>
        <svg-icon iconName="menuBtn" class-name="icon-menu-svg"></svg-icon>
      </span>
    </div>
    <!--    右侧-->
    <div class="wrap">
      <div class="user-info">
        <div class="face-info">
          <img src="../../assets/avatar.png" :alt="username">
          <span class="name">{{ username }}</span>
        </div>
        <el-popconfirm
            width="250px"
            confirm-button-text="确认"
            confirm-button-type='danger'
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#d07a61"
            title="确认退出管理后台？"
            @confirm="handlerLogout"
            @cancel="cancelEvent">
          <template #reference>
        <span class='layout'>
        <svg-icon icon-name="logout" class-name="icon-logout"></svg-icon>
        </span>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/Index.vue"
import {useStore} from "vuex"
import {ref, getCurrentInstance} from "vue"
import {useRouter} from "vue-router"

export default {
  components: {SvgIcon},
  setup() {
    const store = useStore()
    //获取实例上下文
    const {proxy} = getCurrentInstance()

    //引入router
    const {replace} = useRouter()

    //菜单切换按钮
    const switchAside = function () {
      store.commit("app/set_Collapse")
    }

    //用户名
    const username = ref(store.state.app.username)

    //退出
    const handlerLogout = () => {
      store.dispatch("app/logoutAction")
          .then(response => {
            ElMessage({
              message: response.message.slice(0,5),
              type: "success"
            })
            replace({
              name: "Login"
            })
          }).catch(err => console.log(err))
    }

    const cancelEvent = ( )=>{
        console.log('取消退出')
    }

    return {switchAside, username, handlerLogout,cancelEvent}
  }
}
</script>

<style lang="scss" scoped>
.header-wrap {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-btn {
  padding-left: 15px;
  cursor: pointer;
}

.icon-menu-svg {
  font-size: 24px;
}

.user-info {
  display: flex;
  align-items: center;
}

.face-info {
  span, img {
    display: inline-block;
    vertical-align: middle;
  }

  span {
    margin-left: 15px;
  }
}

.layout {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
  cursor: pointer;
}

.icon-logout {
  font-size: 24px;
}
</style>