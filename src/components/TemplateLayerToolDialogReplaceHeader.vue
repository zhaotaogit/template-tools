<template>
    <el-dialog :model-value="isShowDialog" title="模板数据复制" @close="closeDialog" width="50%">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form label-position="top">
                    <el-form-item label="模板填充层" :label-width="formLabelWidth">
                        <el-input v-model="templateLayer" autocomplete="off" placeholder="输入要填充请求头的层，填-1则所有层都填充" />
                    </el-form-item>
                </el-form>
            </el-col>

        </el-row>
        <el-row :gutter="20">
            <el-col>
                <el-form label-position="top">
                    <el-form-item label="请求头数据" :label-width="formLabelWidth">
                        <el-input v-model="HeaderDataJson" placeholder="输入请求头数据" type="textarea"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="doFillHeadersCopy">
          确认填充
        </el-button>
      </span>
        </template>
    </el-dialog>
</template>

<script setup>
import {ref, toRefs} from 'vue'

import {jsonHeaderToTemplateHeader} from '@/common/TemplateLayerTools'
import {ElNotification} from "element-plus";

const HeaderDataJson = ref();
const templateLayer = ref();
const formLabelWidth = '100px'
const dialogFormVisible = ref(false)


const props = defineProps({
    isShowDialog: {
        type: Boolean,
    },
    json_data: {
        type: Object,
    }
})
const {isShowDialog, json_data} = toRefs(props); //数据解构
const emit = defineEmits(['closeDialog'])
import jsonlint from 'jsonlint-mod';
const closeDialog = () => {
      emit('closeDialog')
}


const doFillHeadersCopy = () => {
    if (!json_data.value || !HeaderDataJson.value || !templateLayer.value) {
        ElNotification.error({
            title: 'Error',
            message: "有参数为空，请检查!",
        })
        return
    }
    try {
        // 将单引号转换为双引号
        let json_data_rep = HeaderDataJson.value
        json_data_rep = json_data_rep.replace(/'/g, '"')
        const new_json_data = jsonHeaderToTemplateHeader(json_data.value, jsonlint.parse(json_data_rep), templateLayer.value )
        if (new_json_data) {
            ElNotification.success({
                title: 'Success',
                message: "填充请求头成功。",
            })
            emit('closeDialog',JSON.stringify(new_json_data))
        }
    } catch (e) {
        ElNotification.error({
            title: 'Error',
            message: "尝试填充失败，请检查后再试!",
        })
        console.log(e)
    }
}
</script>

<style scoped>

</style>