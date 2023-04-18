<template>
  <div>
    <el-menu :default-openeds="['1', '3']">
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <message/>
          </el-icon>
          首页
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">微信视频号</el-menu-item>
          <el-menu-item index="1-2">微信视频号</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { Message} from '@element-plus/icons-vue'

</script>

<style scoped lang="scss">
.el-menu {
  height: 100vh;
  overflow: hidden;

}
</style>