<template>
    <el-dialog :model-value="isShowDialog" title="模板数据复制" @close="closeDialog" width="50%">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form label-position="top">
                    <el-form-item label="模板1-层" :label-width="formLabelWidth">
                        <el-input v-model="template1Layer" autocomplete="off"/>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12">
                <el-form label-position="top">
                    <el-form-item label="模板2-层" :label-width="formLabelWidth">
                        <el-input v-model="template2Layer" autocomplete="off"/>
                    </el-form-item>
                </el-form>
            </el-col>

        </el-row>
        <el-row :gutter="20">
            <el-col>
                <el-form label-position="top">
                    <el-form-item label="模板数据" :label-width="formLabelWidth">
                        <el-input v-model="templateDataJson" placeholder="输入模板数据" type="textarea"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="doTemplateChangeCopy">
          确认交换
        </el-button>
      </span>
        </template>
    </el-dialog>
</template>

<script setup>
import {ref, toRefs} from 'vue'

import {templateChangeCopy} from '@/common/TemplateLayerTools'
import {ElNotification} from "element-plus";

const templateDataJson = ref();
const template1Layer = ref();
const template2Layer = ref();
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
const closeDialog = () => {
    emit('closeDialog')
}


const doTemplateChangeCopy = () => {
    if (!json_data.value || !templateDataJson.value || !template1Layer.value | !template2Layer.value) {
        ElNotification.error({
            title: 'Error',
            message: "有参数为空，请检查!",
        })
        return
    }
    try {
        const new_json_data = templateChangeCopy(json_data.value, JSON.parse(templateDataJson.value), template1Layer.value, template2Layer.value)
        if (new_json_data) {
            ElNotification.success({
                title: 'Success',
                message: "复制成功。",
            })
            emit('closeDialog')
        } else {
            copy(JSON.stringify(json_data.value))
            ElNotification.error({
                title: 'Success',
                message: "交换成功且已复制到剪贴板!",
            })
        }
    } catch (e) {
        ElNotification.error({
            title: 'Error',
            message: "尝试交换失败，请检查后再试!",
        })
    }
}
</script>

<style scoped>

</style>