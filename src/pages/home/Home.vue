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
          <el-button @click="jumpDetail">测试跳转任务详情</el-button>
          <!-- 任务列表 -->
          <div class="item-slot">
            <div style="font-size: 18px;">
              <h1 style="text-align: left; margin: 0px 0px 10px 0px;">任务列表</h1>
            </div>
            <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
              <div class="item-container">
                <task-item></task-item>
              </div>
              <div class="item-container">
                <task-item></task-item>
              </div>
              <div class="item-container">
                <task-item></task-item>
              </div>
              <div class="item-container">
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
    import Sidebar from './Sidebar.vue';
    import TopLine from '../../components/TopLine.vue';
    import TaskItem from '../../components/TaskItem.vue';
    import NewTask from '../../components/NewTask.vue';

    export default {
        components :{
            Sidebar,
            TopLine,
            TaskTtem:"task-item",
            NewTask
        },
        data(){
            return {
                
            }
        },
        methods:{
            jumpDetail(){
                this.$router.push({
				          path:"/taskDetail"
			          });
            }
        }
    }


</script>

<style scoped>
    .global{
        flex-direction: column;
        padding: 0px;
    }
    .main{
        width: 100%;
        flex-direction: row;
        margin: 0px;
    }
    .content{
        /* border: 1px solid #000000; */
        width: 75%;
        height: max-content;
        margin: 0px;
        padding: 50px 70px;
        background-color: #FAF9F8;
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 207px;
    }
    .headline{
        /* background-color: aquamarine; */
        width: 100%;
        height: 100px;
        float: left;
        text-align: left;
    }
    .head-detail{
        /* background-color: aqua; */
        padding-left: 35px;
    }
    .item-slot{
      /* border: 1px solid #000; */
      width: 100%;
      height: max-content;
      display: flex;
      flex-direction: column;
      padding-left: 40px;
      margin-top: 15px;
    }
    .item-container{
      /* border: 1px solid #000; */
      width: 257px;
      height: 180px;
      margin: 0px 40px 20px 0px;
      display: inline-block;
    }
</style>