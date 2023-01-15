<template>
  <div class="main">
    <el-card class="content">
      <div class="title">
        <el-avatar :src="inviter.avatar_path"></el-avatar>
        <div class="title-text">
          <span class="title-text highlight">{{inviter.user_name}}</span> 
          邀请您参与任务：
          <!-- <span class="title-text highlight">{{task.task_name}}</span> -->
        </div>
      </div>
      <el-card class="task">
        <span style="font-weight: 600;font-size:20px;">{{task.task_name}}</span>
        <br><br>{{task.task_description }}
      </el-card>
      <div class="bottom-line">
        <el-button class="bottom" @click="joinGroup">参与任务</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  import AccountUtil from '../../http/utils/account-method.js'
  import TaskUtil from '../../http/utils/task-method.js';
  import GroupUtil from '../../http/utils/group-method.js';

  export default {
    data() {
        return {
            task_id:0,
            inviter_id:1,
            inviter: {
              user_name: "用户名称",
              avatar_path: "http://localhost:3000/static/default.png"
            },
            task: {
                group_id: 1,
                task_name: "任务名称",
                task_description: "任务描述任务描述"
            }
        }
    },
    computed:{
        ...mapState(["account"]),
    },
    methods :{
      ...mapMutations(["alterAccount"]),
      async joinGroup(){
          let group_id = this.task.group_id;
          let member_id = this.account.client_id;
          let result = await GroupUtil.JoinGroup(group_id,member_id);
          if(result) {
            this.$router.push({
              name: "taskDetail",
              params: {id: this.task_id},
            });
          }
      }
    },
    created(){
        console.log(this.$route.params);
        this.task_id=Number(this.$route.params.task);
        this.inviter_id = Number(this.$route.params.user);
        let account={
            client_id: 10,
            user_name: "taylor",
            avator_path: "http://localhost:3000/static/default.png",
            register_time: "2023-01-11 17:54:26",
            intro: "一个简介"
        };
        this.alterAccount(account);
    },
    async mounted(){
        this.inviter = await AccountUtil.getSimpleInfo(this.inviter_id);
        this.task = await TaskUtil.getTaskforInvite(this.task_id);
    },
  }
</script>

<style scoped>
  .main{
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }

  .content{
      border: 2px double #888;
      border-radius: 10mm;
      width: 400px;
      height: 240px;
      margin-top: 100px;
      padding: 40px 30px;
      background-color:#ecf5ff;
      box-shadow: 7px 7px 7px #aaa !important;
      text-align: left;
  }

  .title{
      /* border: 1px solid #000; */
      display:flex;
      flex-direction:row;
      vertical-align: middle;
      margin-bottom: 20px;
  }
  .title-text {
      align-self: center;
      margin-left: 6px;
  }
  .title-text.highlight{
      color: #222;
      font-weight: 600;
  }
  .task{
      border-radius: 10px;
      color: #3e3e6a;
      font-size: 15px;
      padding-bottom: 10px;
      margin-bottom: 10px;
  }

  .bottom-line{
    display: flex;
    justify-content: center;
  }
  .bottom{
      width: 150px;
  }
</style>