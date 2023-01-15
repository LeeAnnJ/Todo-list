<template>
  <div class="global" text @click="dialogFormVisible = true">
    <el-button class="addbutton">
      <el-icon :size="16">
        <Plus />
      </el-icon>
      点击添加新任务
    </el-button>
  </div>

  <el-dialog v-model="dialogFormVisible" title="新建任务">
    <el-form :model="form" :rules="rules" ref="ruleFormRef" >

      <el-form-item label="任务名称" :label-width="formLabelWidth">
        <el-input class="input" v-model="form.name" autocomplete="off" />
      </el-form-item>     

      <el-form-item label="截止时间" :label-width="formLabelWidth">
        <el-date-picker v-model="form.deadline" type="datetime" placeholder="Select date and time" />
      </el-form-item>

      <el-form-item label="设为群组任务" :label-width="(formLabelWidth)">
        <el-checkbox v-model="form.type" label="" size="large" /> 
        <!-- <el-icon><Star /></el-icon> -->
      </el-form-item> 

      <!-- <el-form-item label="参与人" :label-width="formLabelWidth"> -->
        <!-- 以后要变成多选框 -->
        <!-- <el-input class="input" v-model="form.people" autocomplete="off" />
      </el-form-item> -->

      <el-form-item label="设为重要任务" :label-width="(formLabelWidth)">
        <el-checkbox v-model="form.priority" label="" size="large" />
        <!-- <el-icon><Star /></el-icon> -->
      </el-form-item>

      <el-form-item label="周期性" :label-width="formLabelWidth">
        <!-- <el-checkbox v-model="form.period" label="" size="large" /> -->
        <el-select v-model="form.period" class="circle-select" placeholder="选择周期性" size="large">
          <el-option v-for="item in cycle_options"
            :key="item.value" :label="item.label" :value="item.value"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item label="所属任务列表" :label-width="formLabelWidth">
        <el-select v-model="form.folder_id" class="circle-select" placeholder="选择任务列表" size="large">
          <el-option v-for="item in folders"
            :key="item.value" :label="item.folder_name" :value="item.folder_id" clearable
          />
        </el-select>
      </el-form-item>

      <el-form-item label="任务描述" :label-width="formLabelWidth">
        <el-input class="input" v-model="form.note" :rows="2" type="textarea" placeholder="Please input" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addTask(ruleFormRef)">
          确认添加
        </el-button>
      </span>
    </template>
  </el-dialog>


</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { Store, useStore } from 'vuex';
  import { toRaw } from '@vue/reactivity';
  import type { FormInstance, FormRules } from 'element-plus';
  import { rule } from 'postcss';
  import Task from "../http/api/task.js";
  import router from '../router';

  const store = useStore();
  const folders = toRaw(store.state.folders);

  const dialogFormVisible = ref(false);
  const formLabelWidth = '140px';

  const ruleFormRef = ref<FormInstance>()
  const form = reactive({
    name: '',
    people: '',
    deadline: '',
    priority: false,
    type: false,
    period: 0,
    note: '',
    folder_id: 1, 
  });

  const rules = reactive<FormRules>({
      name:[{
          required: true,
          message: '请输入任务名',
          trigger: 'change'
      }],
      note:[{
          required: true,
          message: '请输入任务描述',
          trigger: 'change'
      }]
  });

  const cycle_options = [
    {value: 0, label: '暂无'},
    {value: 1, label: '每周一'},
    {value: 2, label: '每周二'},
    {value: 3, label: '每周三'},
    {value: 4, label: '每周四'},
    {value: 5, label: '每周五'},
    {value: 6, label: '每周六'},
    {value: 7, label: '每周日'}
  ];

  const addTask = async (formEl: FormInstance | undefined) => {
      if(!formEl) return;
      await formEl.validate(async (valid,fields) => {
          if(valid) {
            
            let data = {
                register_id: store.state.account.client_id,
                name: form.name,
                type: form.type? 1:0,
                priority: form.priority? 1:0,
                deadline: form.deadline,
                note: form.note,
                belongs_folder_id: form.folder_id,
            }
            console.log(data);
            await Task.createTask(data).then (
                res => {
                    if(res.data.message=="success"){
                      router.go(0);
                      dialogFormVisible.value = false;
                    }
                },
                err => {
                    console.log(err)
                }
            );
            
          }
          else{
            console.log('error submit!',fields);
          }
      })
  };
</script>

<style scoped>
  .global {
    border: 1px dashed #3e3f41;
    border-radius: 30px;
    margin-top: 17px;
    width: 250px;
    height: 160px;
    padding: 0px;
    display: flex;
    justify-content: center;
  }

  .input {
      width: 70%;
  }

  .addbutton,
  .addbutton:focus {
    background-color: #FAF9F8;
    border: none;
    border-radius: 30px;
    font-size: 15px;
    width: 100%;
    height: 100%;
    color: #606266 !important;
  }

  .addbutton:hover {
    background-color: #f4f4f5;
    color: #606266;
    text-decoration: underline;
  }
</style>