<template>
<svg class="svg-class" :class="svgClassName" aria-hidden="true">
  <use :href="svgIcon"></use>
</svg>
</template>

<script>
import  {ref,computed} from 'vue'
export default {
  props:{//父组件传进来的数据
    iconName:{
      type:String,
      default:''
    },
    className:{
      type:String,
      default:''
    }
  },
  setup(props) {
    const svgClassName = ref(props.className)
    //svg图标
    const svgIcon = computed(()=>`#icon-${props.iconName}`);
    return {svgClassName,svgIcon}
  }
}
</script>

<style lang="scss" scoped>
.svg-class{
  width: 1em;
  height: 1em;
  fill:currentColor;
}
</style>