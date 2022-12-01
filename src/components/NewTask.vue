<template>
  <div class="global" text @click="dialogFormVisible = true">
    <el-button class="addbutton" >
      <el-icon :size="16"><Plus /></el-icon>
      点击添加新任务
    </el-button>
  </div>


<el-dialog v-model="dialogFormVisible" title="新建任务">
  <el-form :model="form">

    <el-form-item label="任务名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off" />
    </el-form-item>

    <el-form-item label="参与人" :label-width="formLabelWidth">
      <el-input v-model="form.datetime" autocomplete="off" />
    </el-form-item>

    <el-form-item label="截至时间" :label-width="formLabelWidth">
      <el-input v-model="form.people" autocomplete="off" />
    </el-form-item>


  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">
        确认添加
      </el-button>
    </span>
  </template>
</el-dialog>




</template>

<script lang="ts" setup>
/*  export default{
       name:"addnew",
    }*/


import { reactive, ref } from 'vue'

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  people: '',
  datetime: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
tasks: [
  { name: '1', people: '1', datetime: '1' }
]




</script>

<style scoped>
    .global{
        border: 1px dashed #3e3f41;
        border-radius: 30px;
        margin-top: 17px;
        width: 250px;
        height: 160px;
        padding: 0px;
        display: flex;
        justify-content: center;
    }
    .addbutton,.addbutton:focus{
        background-color: #FAF9F8;
        border: none;
        border-radius: 30px;
        font-size: 15px;
        width: 100%;
        height: 100%;
        color:#606266 !important; 
    }
    .addbutton:hover{
        background-color:#f4f4f5;
        color:#606266;
        text-decoration: underline;
    }
</style>