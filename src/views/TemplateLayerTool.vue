<template>
  <el-row>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="交换层级1">
        <el-input v-model="formInline.user" placeholder="输入想交换的层"/>
      </el-form-item>
      <el-form-item label="交换层级2">
        <el-input v-model="formInline.user" placeholder="输入想交换的层"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">交换</el-button>
      </el-form-item>
    </el-form>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
        <textarea
            v-model="obj"
            type="textarea"
            placeholder=""
            rows="40"
        />

    </el-col>
    <el-col :span="12">
      <JsonViewer class="json-view" :value="json_data" :expanded="true" copyable boxed sort theme="dark"
                  @onKeyClick="keyClick"/>
    </el-col>
  </el-row>
</template>

<script setup>
import {JsonViewer} from "vue3-json-viewer"
import "vue3-json-viewer/dist/index.css";
import {ref, computed, reactive} from "vue";
import jsonlint from 'jsonlint-mod';


const formInline = reactive({
  user: '',
  region: '',
})

let obj = ref('');
const json_data = computed(() => {
  // 如果能够解析为json对象，就返回json对象，否则返回错误信息
  if (!obj.value) return {}
  try {
    let tmp = obj.value.replace(/'/g, '"')
    return jsonlint.parse(tmp)
  } catch (e) {
    return {error: e.message}
  }
})
const keyClick = (keyName) => {
  console.log(keyName, "被点击了")
}
const onSubmit = () => {
  console.log("提交")
}


</script>

<style scoped lang="scss">
textarea {
  height: 100%;
  width: 100%;
  display: block;
  resize: vertical;
  line-height: 1.5;
  box-sizing: border-box;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color .2s
}

.json-view {
  height: 100%;
}
</style>