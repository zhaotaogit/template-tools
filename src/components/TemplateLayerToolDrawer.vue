<template>
    <el-drawer
            :model-value="isShowDrawer"
            title=""
            direction="rtl"
            size="70%"
            @close="closeDrawer"
    >
        <h1>占位</h1>
        <template #header="{ close, titleId, titleClass }">
            <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
            <el-button type="danger" @click="close">
                <el-icon class="el-icon--left">
                    <CircleCloseFilled/>
                </el-icon>
                Close
            </el-button>
        </template>
        <el-divider/>
        <h1>占位</h1>
    </el-drawer>
</template>

<script setup>
import {toRefs} from 'vue'

const props = defineProps({
    isShowDrawer: {
        type: Boolean,
    },
})

const {isShowDrawer} = toRefs(props); //数据解构
const emit = defineEmits(['closeDrawer'])
const closeDrawer = () => {
    emit('closeDrawer')
}

</script>

<style scoped>

</style>