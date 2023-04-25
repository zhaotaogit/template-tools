<template>
    <el-dialog :model-value="isShowDialog" title="Shipping address" @close="closeDialog" width="35%">
        <el-form :model="form">
            <el-form-item label="Promotion name" :label-width="formLabelWidth">
                <el-input v-model="form.desc" type="textarea"/>
            </el-form-item>
            <el-form-item label="Promotion name" :label-width="15">
                <el-input v-model="form.name" autocomplete="off"/>
            </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </span>
        </template>
    </el-dialog>
</template>

<script setup>
import {reactive, ref, toRefs} from 'vue'


const templateDataJson = ref();
const props = defineProps({
    isShowDialog: {
        type: Boolean,
    },
})
const {isShowDialog} = toRefs(props); //数据解构
const emit = defineEmits(['closeDialog'])
const closeDialog = () => {
    emit('closeDialog')
}


const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})
</script>

<style scoped>

</style>