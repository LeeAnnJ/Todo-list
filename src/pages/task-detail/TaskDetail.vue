<template>
  <div>
    <!-- 顶栏 -->
    <topLine></topLine>
    <task-head></task-head>
    <el-container class="main">
      <!-- 任务详情栏 -->
      <detail-slot :task_id="task_id"></detail-slot>

      <!-- 子步骤 -->
      <sub-task></sub-task>

      <!-- 动态 -->
      <div class="card-slot">
        <!-- 标题栏 -->
        <div class="title">
          <img class="title-icon" src="../../assets/icons/10_inform.png" alt="some_text" />
          <b style="float: left;">动态（{{ trendnumber }}）</b>
        </div>
        <!-- 动态条目 -->
        <el-card v-for="trend in trends" class="feed-item">
          <div class="feed-user">
            <el-avatar>{{ trend.avator_path }}</el-avatar>
            {{ trend.user_name }}
          </div>
          <div class="feed-detail" style="">{{ trend.detail }}</div>
          <span style="padding-left: 25px;">{{ trend.time }}</span>
        </el-card>
      </div>

      <!-- 共同参与人 -->
      <div class="card-slot">
        <!-- 标题栏 -->
        <div class="title">
          <img class="title-icon" src="../../assets/icons/3_user.png" alt="some_text" />
          <b style="float: left;">共同参与人</b>
        </div>
        <!-- 参与人 -->
        <el-card v-for="coop in cooperators" class="user-card">
          <div class="user">
            <el-avatar :size="50" class="user-avatar" :src="coop.avatar_path">{{ coop.user_name }}</el-avatar>
            <div class="user-name">{{ coop.user_name }}</div>
            <div v-if="coop.isowner" class="user-owner">Owner</div>
          </div>
        </el-card>
        <!-- 添加按钮 -->
        <el-button round class="add-button" @click="dialogVisible2 = true">
          <el-icon><Plus /></el-icon>
          添加共同参与人
        </el-button>

        <el-dialog v-model="dialogVisible2" title="添加共同参与人" width="30%" draggable>
          复制此链接，邀请用户参与任务：<br>
          <a :href="inviteUrl">{{ inviteUrl }}</a>
          <!-- <span class="txt_CooperatorName">用户名：</span>
          <span class="input_cooperatorName">
            <el-input v-model="cooperatorName" placeholder="请输入参与人用户名" />
          </span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible2 = false">取消</el-button>
              <el-button type="primary" @click="addCooperators">
                确定
              </el-button>
            </span>
          </template> -->
        </el-dialog>
      </div>

      <!-- 附件， -->
      <!-- <div class="card-slot"> -->
        <!-- 标题栏 -->
        <!-- <div class="title">
          <img class="title-icon" src="../../assets/icons/6_classific.png" alt="text" />
          <b style="float: left;">附件（0）</b>
        </div> -->
        <!-- 添加附件按钮 -->
        <!-- <el-button class="add-button" round>
          <el-icon><Plus /></el-icon>
          添加附件
        </el-button>
      </div> -->
    </el-container>
  </div>
</template>

<script>
import TopLine from '../../components/TopLine.vue';
import TaskHead from './DetailHead.vue';
import DetailSLot from './DetailSlot.vue';
import { Document } from '@element-plus/icons-vue';
import SubTaskSlot from './SubTaskSlot.vue';
import GroupUtil from '../../http/utils/group-method.js';
import { toRaw } from '@vue/reactivity';
import { mapState } from "vuex";

export default {
    components: {
        "topLine": TopLine,
        "task-head": TaskHead,
        "detail-slot": DetailSLot,
        "sub-task": SubTaskSlot,
        Document,
    },
    data() {
        return {
            task_id: 0,
            dialogVisible2:false,
            cooperatorName:'',
            trends:[{
                avator_path: "user",
                user_name: "cathy",
                detail: "加入了该任务",
                time: "2022-12-14 20:51",
            },{
                avator_path: "user",
                user_name: "bob",
                detail: "加入了该任务",
                time: "2022-12-14 20:52",
            }],
            cooperators: [{
                client_id: "001",
                avator_path: "user",
                user_name: "张三",
                isowner: true
            },{
                client_id: "002",
                avator_path: "user",
                user_name: "李四",
                isowner: false
            },{
                client_id: "003",
                avator_path: "user",
                user_name: "王五",
                isowner: false
            }],
            inviteUrl: "",
          }
      },
      computed: {
          trendnumber: function () {
              return this.trends.length;
          },
          coopernumber: function () {
              return toRaw(this.cooperators).length;
          },
          ...mapState(["account"]),
      },
      methods: {
        focusOn(item) { item.isfocus = true },
        focusLeave(item) { item.isfocus = false; },
        addCooperators(){
            this.cooperators.push({
                avator_path: "user",
                user_name:this.cooperatorName
            }); 
            this.dialogVisible2 = false;
            this.cooperatorName = '';
        },
    },
    created(){
        console.log(this.$route.params);
        this.task_id=Number(this.$route.params.id);
    },
    async mounted (){
        this.inviteUrl = "http://localhost:8001/invite/"+this.task_id+"/"+this.account.client_id;
        let that = this;
        await GroupUtil.MemberforDetail(1).then(res=>{
            that.cooperators = res;
            console.log("coop:",that.cooperators);
        },err=>{
            console.log(err);
        });
        this.cooperators = toRaw(this.cooperators);
    }
}
</script>

<style>
    .el-card {
      border-radius: 8px;
    }
</style>

<style scoped>
    @import '../../assets/css/TaskDetail.css';
</style>