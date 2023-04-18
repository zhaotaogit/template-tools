<template>
  <div class="manage common-layout">
    <el-container style="height: 100vh">
      <el-aside width="200px" style="overflow:hidden;">
        <Aside/>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import Aside from "@/components/Aside/Aside.vue";

</script>

<style scoped lang="scss">
.manage {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
}
</style>