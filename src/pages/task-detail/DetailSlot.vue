<template>
  <div class="card-slot">
    <!-- 标题栏 -->
    <div class="title">
      <img class="title-icon" src="../../assets/icons/2_content.png" alt="some_text" />
      <b style="float: left;">任务概况</b>

      <!-- 菜单部分 -->
      <el-popover v-if="!isedit"  trigger="click" transition="all 0.5s">
        <template #reference>
          <div class="menu">
            <el-icon ><MoreFilled /></el-icon>
          </div>
        </template>
        <div style="margin-top: 7px" @mouseenter="focusOn">
          <div class="menu-item">
            <button class="menu-button" >收藏该任务</button>
          </div>
          <div class="menu-item">
            <button class="menu-button" >添加共同参与人</button>
          </div>
          <div class="menu-item">
            <button class="menu-button" @click="startEdit">编辑内容</button>
          </div>
          <div class="menu-item">
            <el-button class="menu-button" >分组</el-button>
          </div>
          <div class="menu-item">
            <el-button class="menu-button" >删除该任务</el-button>
          </div>
        </div>
      </el-popover>
      <el-button v-else class="edit-finish-icon" @click="finishEdit">
        <el-icon><Select /></el-icon>
      </el-button>
    </div>
    <!-- 任务名称 任务描述 -->
    <el-card class="box-card-taskintro">
      <div class="introcard-header">
        <div class="introcard-title">
          <div v-if="!isedit" class = "introcard-title name">{{task.name}}</div>
          <div v-else class="introcard-title edit">
            <el-input size="large" 
              v-model="task.name"  
              placeholder="请输入任务名称"
              style = "font-size:18px;"
            />
          </div> 
          <el-button :class="task.priority? 'starIcon clicked':'starIcon'" @click="starClick">
            <el-icon><StarFilled /></el-icon>
          </el-button>
        </div>
        <div v-if="!isedit">{{task.note}}</div>
        <div v-else>
          <el-input clearable v-model="task.note" 
            size="small"
            placeholder="请输入任务描述" 
            type="textarea" 
            :rows="2"
          />
        </div>
      </div>
    </el-card>
    <el-card class="taskdetail">
      <el-icon class="icon" color="#256CF4"><CollectionTag /></el-icon>
      创建于 {{task.create_time}}
    </el-card>
    <el-card class="taskdetail">
      <el-icon class="icon" color="#256CF4"><Memo /></el-icon>
      <span v-if="task.indaily">已添加至今日任务</span>
      <span v-else>未添加至今日任务</span>
    </el-card>
    <el-card class="taskdetail">
      <el-icon class="icon" color="#256CF4"><Clock /></el-icon>
      截止时间:
      <span v-if="!isedit">{{task.deadline}}</span>
      <el-date-picker v-else
        v-model="dateValue" 
        type="datetime"
        placeholder="选择截止时间"
        value-format="YYYY-MM-DD hh:mm:ss"
        style="margin: 10px 0px 0px 25px"
			/>
    </el-card>
    <el-card class="taskdetail">
      <el-icon class="icon" color="#256CF4"><Refresh /></el-icon>
      重复: {{task.circle}}
    </el-card>
    <el-card class="taskdetail">
      <el-icon class="icon" color="#256CF4"><Document /></el-icon>
      <span v-if="!isedit">所属任务列表: {{task.belongs_folder}}</span>
      <el-select v-else v-model="task.belongs_folder" placeholder="请选择所属任务列表">
        <el-option v-for="item in folderList" :key="item" :value="item" />
      </el-select>
    </el-card>
  </div>
</template>

<script>
    import { StarFilled, MoreFilled, Select } from '@element-plus/icons-vue';
    import {ref} from 'vue';

    export default{
        name:"detail-slot",
        props :{
            content:{
                type:Object,
                default:{
                    task_id: 0,
                    register_id: 0,
                    createTime: "2022-12-08",
                    deadline: "暂无",
                    circul: "暂无",
                    is_favor: false,
                    belongs_folder_id: 0
                }
            }
        },
        data(){
            return {
                task: {
                    name: "任务名称",
                    priority: true,
                    note: "任务描述在这里",
                    create_time: "2022年 12月 14日 17:30",
                    indaily: false,
                    deadline: "2022年 12 月 14日 20:00",
                    circle: "每周二",
                    belongs_folder: "中级实训"
                },
                folderList: ["中级实训","任务列表1","任务列表2"],
                isedit: false,
                dateValue: ref('2022-12-15 20:35:00'),
            }
        },
        methods: {
            starClick(){
                this.task.priority = !this.task.priority;
                //this.isedit = true;
            },
            startEdit(){
                this.isedit=true;
            },
            finishEdit(){
                this.isedit = false;
            }
        }
    }

</script>

<style scoped>
    @import '../../assets/css/TaskDetail.css';

    .menu{
    /* border: 1px solid  #102e6c; */
    width: 15%;
    float: right;
    font-size: 25px;
    }
    .edit-finish-icon{
    border:none;
    /* border: 1px solid #000; */
    width: 30px;
    padding: 0px;
    margin: 0px !important;
    float: right;
    font-size: 28px;
    color:#73767a;
    background-color: #F5F6F7;
    }
    .edit-finish-icon:hover{
        color:#256cf4;
        background-color: #e4e5e6;
    }
</style>