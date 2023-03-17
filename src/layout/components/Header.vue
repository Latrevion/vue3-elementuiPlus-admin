<template>
  <div class="header-wrap">
    <div class="wrap"><!--      左侧-->
      <span class="menu-btn">
      <svg-icon iconName="menuBtn" class-name="icon-menu-svg"></svg-icon>
    </span>
    </div>
    <!--    右侧-->
    <div class="wrap">
      <div class="user-info">
        <div class="face-info">
          <img src="../../assets/avatar.png" alt="logo-min-png">
          <span class="name">1234567890@qq.com</span>
        </div>
        <span class='layout'>
        <svg-icon icon-name="logout" class-name="icon-logout"></svg-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/Index.vue"

export default {
  components: {SvgIcon},
  setup() {


    return {}
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

.icon-logout{
  font-size: 24px;
}
</style>