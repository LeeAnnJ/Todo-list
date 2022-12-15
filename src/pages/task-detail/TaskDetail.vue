<template>
  <div>
    <!-- 顶栏 -->
    <topLine></topLine>
    <el-container class="main">
      <!-- 任务详情栏 -->
      <detail-slot></detail-slot>

      <!-- 子步骤 -->
      <div class="card-slot">
        <!-- 标题栏 -->
        <div class="title">
          <img class="title-icon" src="../../assets/icons/9_application.png" alt="some_text" />
          <b style="float: left;">子步骤（{{subnumber}}）</b>
        </div>
        <!-- 子步骤 -->
        <el-card v-for="sub in subtasks" class="substep" @mouseenter="focusOn(sub)" @mouseleave="focusLeave(sub)">
          <div style = "flex-direction: row; height: 30px;">
            <div v-if="sub.isfinished" class="substep-tag">未完成</div>
            <div v-else class="substep-tag finish">已完成</div>
            <div v-if="sub.isfocus" style="float:right; margin:2px 10px; font-size: 18px;">
              <el-icon ><MoreFilled /></el-icon>
            </div>
          </div>
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
    import DetailSLot from './DetailSlot.vue';
    import { Document} from '@element-plus/icons-vue';
    
    export default {
        components :{
            "topLine": TopLine,
            "detail-slot": DetailSLot,
            Document,
        },
        data(){
            return {
                subtasks:[{
                    subtask_id: "001",
                    isfinished: false,
                    name: "子步骤1",
                    isfocus: false,
                },{
                    subtask_id: "002",
                    isfinished: false,
                    name: "子步骤2 balabala balabala balabala",
                    isfocus: false,
                },{
                    subtask_id: "003",
                    isfinished: true,
                    name: "子步骤3",
                    isfocus: false,
                }],
                trends:[{
                    avator_path: "user",
                    user_name: "张三",
                    detail: "添加了子步骤：子步骤3",
                    time: "2022-12-14 20:51",
                },{
                    avator_path: "user",
                    user_name: "李四",
                    detail: "加入了该任务",
                    time: "2022-12-14 20:52",
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
            focusOn(item){item.isfocus=true},
            focusLeave(item){item.isfocus=false;},
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