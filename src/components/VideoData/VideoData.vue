<script setup>
import {reactive, computed, ref} from 'vue'
import request from '@/utils/request'
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx';

const tableData = reactive([])
const selectedOption = ref(null)
const username_list = ref([])
const loading = ref(false)
const background = ref(false)
const currentPage = ref(1)
const pageSize = ref(15)
const small = ref(false)
const select_time = ref('')
request({
  url: '/fans-server/weixin_movie/get_db_sender_name',
  method: 'get',
}).then(res => {
  username_list.value = res.map(opt => ({label: opt, value: opt}))
})

const get_date = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1 // 月份从0开始计数，需要加1
  const day = today.getDate()
  // 拼接成yyyy-mm-dd格式的日期字符串
  const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  return dateString
}
const get_table_data = () => {
  loading.value = true
  let start_time = select_time._rawValue[0] ?? get_date()
  let end_time = select_time._rawValue[1] ?? get_date()
  let data = {
    'insert_time__gte': start_time,
  }
  if (select_time._rawValue[1]) {
    data['insert_time__lte'] = end_time
  }
  if (selectedOption.value !== '') {
    data['sender_name'] = selectedOption.value
  }
  let url = '/fans-server/weixin_movie/get_db_info'
  request({
    url: url,
    method: 'post',
    data: data
  }).then(res => {
    tableData.splice(0, tableData.length)
    tableData.push(...res)
    console.log(tableData.keys())

  })
  loading.value = false
}
get_table_data()
const get_data = () => {
  if (selectedOption.value !== '' && select_time._rawValue.length !== 0) {
    get_table_data()
  }
}
const viewTableData = computed(() => {
  return tableData.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
})
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
const downloadExcel = () => {
  let excel_name = (selectedOption.value ?? 'all') + '_' + (select_time._rawValue[0] ?? get_date()) + '_' + (select_time._rawValue[1] ?? get_date()) + '.xlsx'
  // excel_name = 'test.xlsx'
  console.log(excel_name)
  var wb = XLSX.utils.table_to_book(document.getElementById('table'), {
    sheet: "Sheet JS"
  })
  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  try {
    FileSaver.saveAs(new Blob([wbout], {
      type: 'application/octet-stream'
    }), excel_name)//自定义文件名
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, wbout);
  }
  return wbout
}
</script>

<template>
  <div class="main">
    <el-row>
      <el-col :span="4">
        <p>发送用户:</p>
      </el-col>
      <el-col :span="6">
        <el-select v-model="selectedOption" class="m-2" placeholder="Select" size="default" @change="get_data">
          <el-option
              v-for="(item,index) in username_list"
              :key="index"
              :label="item.value"
              :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        发送时间:
      </el-col>
      <el-col :span="8">
        <div class="demo-date-picker">
          <div class="block">
            <el-date-picker
                v-model="select_time"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                size="default"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
                @change="get_data"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="default" @click="downloadExcel">导出</el-button>
      </el-col>
    </el-row>
    <el-row class="table">
      <el-col :span="24">
        <el-card class="box-card">
          <el-table id="table" ref="table" border v-loading="loading" :data="viewTableData" style="width: 100%">
            <el-table-column v-for="(item,index) in Object.keys(tableData[0]??[])" :prop="item" :label="item"
                             show-overflow-tooltip/>
          </el-table>
          <el-pagination class="fenye"
                         v-model:current-page="currentPage"
                         v-model:page-size="pageSize"
                         :page-sizes="[10, 20, 50, 100]"
                         :small="small"
                         :disabled="disabled"
                         :background="background"
                         layout="sizes, prev, pager, next"
                         :total="tableData.length"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.main {
  margin: 0;
  padding: 0;
  width: 60vw;
  height: 100%;
}

.table {
  margin-top: 20px;

}

.fenye {
  margin-top: 20px;
}

</style>
