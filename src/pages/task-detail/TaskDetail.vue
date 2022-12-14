<template>
  <div>
    <!-- 顶栏 -->
    <TopLine></TopLine>
    <el-container class="main">
      <!-- 任务详情栏 -->
      <div class="card-slot">
        <!-- 标题栏 -->
        <div class="title">
          <img class="title-icon" src="../../assets/icons/2_content.png" alt="some_text" />
          <b style="float: left;">任务概况</b>
        </div>
        <!-- 任务名称 任务描述 -->
        <el-card class="box-card-taskintro">
          <div class="introcard-header">
              <div class="introcard-title">
                {{task.name}}
                <el-button :class="task.priority? 'starIcon clicked':'starIcon'" @click="starClick">
                  <el-icon><StarFilled /></el-icon>
                </el-button>
              </div>
            {{task.note}} balabala balabala
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
          截止时间: {{task.deadline}}
        </el-card>
        <el-card class="taskdetail">
          <el-icon class="icon" color="#256CF4"><Refresh /></el-icon>
          重复: {{task.circle}}
        </el-card>
        <el-card class="taskdetail">
          <el-icon class="icon" color="#256CF4"><Document /></el-icon>
          所属任务列表: {{task.belongs_folder}}
        </el-card>
      </div>

      <!-- 子步骤 -->
      <div class="card-slot">
        <!-- 标题栏 -->
        <div class="title">
          <img class="title-icon" src="../../assets/icons/9_application.png" alt="some_text" />
          <b style="float: left;">子步骤（{{subnumber}}）</b>
        </div>
        <!-- 子步骤 -->
        <el-card v-for="sub in subtasks" class="substep">
          <div v-if="sub.isfinished" class="substep-tag">未完成</div>
          <div v-else class="substep-tag finish">已完成</div>
          <div style="padding-left: 15px;">{{sub.name}}</div>
        </el-card>
        <el-button class="add-button" round>
          <el-icon><Plus /></el-icon>
          添加子步骤
        </el-button>
      </div>

      <!-- 动态 -->
      <div class="card-slot">
        <!-- 标题栏 -->
        <div class="title">
          <img class="title-icon" src="../../assets/icons/10_inform.png" alt="some_text" />
          <b style="float: left;">动态（{{trendnumber}}）</b>
        </div>
        <!-- 动态条目 -->
        <el-card v-for ="trend in trends" class="feed-item">
          <div class="feed-user">
            <el-avatar>{{trend.avator_path}}</el-avatar>
            {{trend.user_name}}
          </div>
          <div class="feed-detail" style="">{{trend.detail}}</div>
          <span style="padding-left: 25px;">{{trend.time}}</span>
        </el-card>
      </div>

      <!-- 共同参与人 -->
      <div class="card-slot">
        <!-- 标题栏 -->
        <div class="title">
          <img class="title-icon" src="../../assets/icons/3_user.png" alt="some_text" />
          <b style="float: left;">共同参与人（{{coopernumber}}）</b>
        </div>
        <!-- 参与人 -->
        <el-card v-for="coop in cooperators" class="user">
          <el-avatar :size="50" class="user-avatar">{{coop.avator_path}}</el-avatar>
          {{coop.user_name}}
        </el-card>
        
        <el-button class="add-button" round>
          <el-icon><Plus /></el-icon>
          添加共同参与人
        </el-button>
      </div>

      <!-- 共同参与人 -->
      <div class="card-slot">
        <!-- 标题栏 -->
        <div class="title">
          <img class="title-icon" src="../../assets/icons/6_classific.png" alt="text" />
          <b style="float: left;">附件（0）</b>
        </div>
        <!-- 参与人 -->
        <el-button class="add-button" round>
          <el-icon><Plus /></el-icon>
          添加附件
        </el-button>
      </div>

    </el-container>
  </div>
</template>

<script>
    import TopLine from '../../components/TopLine.vue';
    import { Document, StarFilled } from '@element-plus/icons-vue';
    
    export default {
        components :{
          TopLine,
          Document
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
                subtasks:[{
                    subtask_id: "001",
                    isfinished: false,
                    name: "子步骤1",
                },{
                    subtask_id: "002",
                    isfinished: false,
                    name: "子步骤2 balabala balabala balabala",
                },{
                    subtask_id: "003",
                    isfinished: true,
                    name: "子步骤3",
                }],
                trends:[{
                    avator_path: "user",
                    user_name: "张三",
                    detail: "添加了子步骤：子步骤3",
                    time: "2022-12-14 20:51"
                },{
                    avator_path: "user",
                    user_name: "李四",
                    detail: "加入了该任务",
                    time: "2022-12-14 20:52"
                }],
                cooperators:[{
                    client_id:"001",
                    avator_path: "user",
                    user_name:"张三",
                },{
                    client_id:"002",
                    avator_path: "user",
                    user_name:"李四",
                },{
                    client_id:"003",
                    avator_path: "user",
                    user_name:"王五",
                }],
            }
        },
        computed :{
            subnumber: function(){
                return this.subtasks.length;
            },
            trendnumber: function(){
                return this.trends.length;
            },
            coopernumber: function(){
                return this.cooperators.length;
            }
        },
        methods: {
            starClick(){
                this.task.priority = !this.task.priority;
            }
        }
    }
</script>

<style>
  .el-card{
    border-radius: 8px;
  }
</style>

<style scoped>
    @import '../../assets/css/TaskDetail.css';
</style>