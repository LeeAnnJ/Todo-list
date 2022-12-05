<template>
  <div>
    <!-- 顶栏 -->
    <TopLine></TopLine>
    <el-container class="global">
      <el-container class="main">
        <!-- 侧边栏 -->
        <Sidebar></Sidebar>
        <!-- 主要内容 -->
        <div class="content">
          <!-- "我的一天"对应的标题栏 -->
          <div class="headline">
            <div style="flex-direction:row; font-size: 20px;">
              <h2 style="margin: 0px; line-height: 15px;">
                <el-icon><Sunny /></el-icon>
                我的一天
              </h2>
              <p style="color: #606266; font-size: 14px; margin-left: 37px;"> 
                2022年 11月 20日 星期四
              </p>
            </div>
            <div class="head-detail"> 
              <el-button link type="primary" style="text-decoration: underline;">
                从任务列表添加任务...
              </el-button>
            </div>
          </div>
          <!-- 任务列表 -->
          <div class="item-slot">
            <div style="font-size: 18px;">
              <h1 style="text-align: left; margin: 0px 0px 10px 0px;">任务列表</h1>
            </div>
            <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
              <div v-for="i in 5" class="item-container">
                <task-item></task-item>
              </div>
              <div class="item-container">
                <NewTask></NewTask>
              </div>
            </div>
          </div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    import Sidebar from './sidebar.vue';
    import TopLine from '../../components/TopLine.vue';
    import TaskItem from '../../components/TaskItem.vue';
    import NewTask from '../../components/NewTask.vue';

    export default {
        components :{
            Sidebar,
            TopLine,
            TaskTtem: "task-item",
            NewTask,
        },
        data(){
            return {
                
            }
        },
        methods:{
            
        }
    }
</script>

<style scoped>
    @import '../../assets/css/maincontent.css';

    .global{
        flex-direction: column;
        padding: 0px;
    }
    .main{
        width: 100%;
        flex-direction: row;
        margin: 0px;
    }
    
</style>