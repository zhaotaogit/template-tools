<template>
  <div>
    <el-menu
        :default-active="route.path"
        class="el-menu-vertical-demo"
        router

    >
      <el-sub-menu index="/">
        <template #title>
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </template>
<!--        <el-menu-item-group>-->
          <el-menu-item class="menu-item" index="/TemplateLayerTool">模板工具</el-menu-item>
          <el-menu-item class="menu-item" index="/Home">Welcome</el-menu-item>
<!--        </el-menu-item-group>-->
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
console.log(route.path)
</script>

<style scoped lang="scss">
.el-menu {
  height: 100vh;
  overflow: hidden;
  .menu-item{
    font-size: 13px;
  }
}
</style>