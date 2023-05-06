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
                <el-button type="primary" @click="exchangeLayer">同模板交换</el-button>
                <el-button type="primary" @click="showDialogReplaeHeader">请求头填充</el-button>
                <el-button type="primary" @click="showDialogReplaceData">不同模板交换</el-button>
                <el-button type="primary" @click="temporaryFill">临时填充</el-button>
                <el-button type="primary" @click="showDrawer">配置信息</el-button>
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
    <TemplateLayerToolDrawer v-model:isShowDrawer="isShowDrawer" @closeDrawer="closeDrawer"/>
    <TemplateLayerToolDialogReplaceData :json_data="json_data" v-model:isShowDialog="isShowDialog_Replace_Data" @closeDialog="closeDialogReplaceData" />
    <TemplateLayerToolDialogReplaceHeader v-model:json_data="json_data" v-model:isShowDialog="isShowDialog_Replace_Header" @closeDialog="closeDialogReplaceHeader" />


</template>

<script setup>
import {JsonViewer} from "vue3-json-viewer"
import "vue3-json-viewer/dist/index.css";
import {ref, computed} from "vue";
import jsonlint from 'jsonlint-mod';
import {exchangeLayerData, temporaryFilling} from "@/common/TemplateLayerTools";
import {ElNotification} from "element-plus";
import TemplateLayerToolDrawer from "@/components/TemplateLayerToolDrawer.vue";
import TemplateLayerToolDialogReplaceData from "@/components/TemplateLayerToolDialogReplaceData.vue";
import TemplateLayerToolDialogReplaceHeader from "../components/TemplateLayerToolDialogReplaceHeader.vue";


const layer1 = ref();
const layer2 = ref();
const isShowDialog_Replace_Data = ref(false);
const isShowDialog_Replace_Header = ref(false);
const isShowDrawer = ref(false);


// 格式化json
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
// 交换层级
const exchangeLayer = () => {
    try {
        obj.value = JSON.stringify(exchangeLayerData(jsonlint.parse(obj.value), layer1.value, layer2.value))
        ElNotification.success({
            title: 'Success',
            message: "交换成功，点击右侧copy按钮可以复制到剪贴板。",
        })
    } catch (e) {
        ElNotification.error({
            title: 'Error',
            message: e,
        })
    }
}
// 临时填充
const temporaryFill = () => {
    try {
        obj.value = JSON.stringify(temporaryFilling(jsonlint.parse(obj.value)))
        ElNotification.success({
            title: 'Success',
            message: "临时填充成功，点击右侧copy按钮可以复制到剪贴板。",
        })

    } catch (e) {
        ElNotification.error({
            title: 'Error',
            message: e,
        })
    }
}

// 抽屉
const showDrawer = () => {
    isShowDrawer.value = true
}

const closeDrawer = () => {
    isShowDrawer.value = false
}


const showDialogReplaceData = () => {
    isShowDialog_Replace_Data.value = true
}

const closeDialogReplaceData = () => {
    isShowDialog_Replace_Data.value = false
}
const showDialogReplaeHeader = () => {
    isShowDialog_Replace_Header.value = true
}

const closeDialogReplaceHeader = (new_json_data) => {
    isShowDialog_Replace_Header.value = false
    if (new_json_data) {
        obj.value = new_json_data
    }
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