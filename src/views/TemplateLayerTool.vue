<template>
    <el-row>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="交换层级1">
                <el-input v-model="layer1" placeholder="输入想交换的层"/>
            </el-form-item>
            <el-form-item label="交换层级2">
                <el-input v-model="layer2" placeholder="输入想交换的层"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="exchangeLayer">交换</el-button>
                <el-button type="primary" @click="temporaryFill">临时填充</el-button>
            </el-form-item>
        </el-form>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-card>
                <textarea
                        v-model="obj"
                        type="textarea"
                        placeholder=""
                        rows="40"
                        style="min-height: 75vh"
                />
            </el-card>


        </el-col>
        <el-col :span="12">
            <el-card style="height: 100%">
                <div style="height:75vh;overflow: auto">
                    <JsonViewer :value="json_data" :expanded="true" copyable sort
                                @onKeyClick="keyClick"/>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import {JsonViewer} from "vue3-json-viewer"
import "vue3-json-viewer/dist/index.css";
import {ref, computed, reactive} from "vue";
import jsonlint from 'jsonlint-mod';
import {exchangeLayerData, temporaryFilling} from "@/common/TemplateLayerTools";

const layer1 = ref();
const layer2 = ref();

let obj = ref('');
const json_data = computed(() => {
    // 如果能够解析为json对象，就返回json对象，否则返回错误信息
    if (!obj.value) return {}
    try {
        return jsonlint.parse(obj.value)
    } catch (e) {
        return {error: e.message}
    }
})
const keyClick = (keyName) => {
    console.log(keyName, "被点击了")
}
const exchangeLayer = () => {
    obj.value = JSON.stringify(exchangeLayerData(jsonlint.parse(obj.value), layer1.value, layer2.value))
}

const temporaryFill = () => {
    obj.value = JSON.stringify(temporaryFilling(jsonlint.parse(obj.value)))
}


</script>

<style scoped lang="scss">
textarea {
  height: 75vh;
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

</style>