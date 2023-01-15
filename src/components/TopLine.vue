<template>
  <div class="header">
    <el-icon class="titleIcon"><Grid />    </el-icon>
    <span class="title">
      <b>To-do List 在线看板</b>
    </span>
    <el-input v-model="task_id" @change="goToTaskDetail" class="input_search" placeholder="输入编号搜索任务">
      <template #prefix>
        <el-icon class="el-input__icon"><search /></el-icon>
      </template>
    </el-input>
    

    <!-- 个人设置 -->
    <div class="setting_block">
      <!-- 点击显示详细信息 -->
      <el-icon class="setting" :size="24"><Setting /></el-icon>
    </div>

    <!-- 消息通知 -->
    <div class="bell_block">
      <el-popover placement="bottom" :width="300" trigger="click">
        <template #reference>
          <el-icon class="bell" :size="24" @click="showMessage">
            <Bell />
          </el-icon>
        </template>
        <div>
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="未读消息" name="1">
              <div>
                <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                  <li @click="changeMessage,info.is_read=1" v-show="info.is_read==0?1:0" v-for="info in infomation"
                    class="infinite-list-item">{{ info.send_time }}&nbsp;{{ info.message_content }}
                  </li>
                </ul>
              </div>
            </el-collapse-item>

            <el-collapse-item title="全部消息" name="2">
              <div>
                <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                  <li v-for="info in infomation" class="infinite-list-item">
                    {{ info.send_time }}&nbsp;{{ info.message_content }}
                  </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-popover>

      <div class="bell_tips">消息通知</div>
    </div>

    <!-- 个人信息 -->
    <div class="edit_info_block">
      <el-dialog v-model="dialogVisible" title="编辑个人信息" width="24%" :before-close="handleClose">
        <div>
          <span class="edit_words1">用户名：</span>
          <el-input class="input_username" v-model="username" placeholder="请输入用户名" />
          <br><br>
          <span class="edit_words2">简介：</span>
          <el-input class="input_intro" v-model="introduction" placeholder="请输入简介" />
          <br><br><br><br><br>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false;">取消</el-button>
            <el-button type="primary" @click="alterUserInfo">保存</el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <div class="user_block">
      <el-popover show="" placement="bottom" :width="250" trigger="click" v-model:visible="popoverVis">
        <template #reference>
          <el-avatar class="user" :src="store.state.account.avator_path" fit="cover"> {{ store.state.account.user_name }} </el-avatar>
        </template>

        <div class="user_info_block">
          <el-avatar :size="80" class="avatar" :src="store.state.account.avator_path" fit="cover">
            <span class="avatar_content">{{ store.state.account.user_name }}</span>
          </el-avatar>
          <el-button type="plain" class="edit_info" @click="initEdit">编辑资料</el-button>
          <br><el-divider class="divider1" />
          <div class="user_info">
            <h4>用户名：{{ store.state.account.user_name }}</h4>
            <h4>账号：{{ store.state.account.client_id }}</h4>
            <h4>注册时间：{{ store.state.account.register_time }}</h4>
            <h4>简介：{{ store.state.account.intro }}</h4>
          </div>
          <el-divider class="divider2" />
          <router-link to="/login">
            <el-button class="log_out" :key="buttons.text" :type="buttons.type" text>退出登录</el-button>
          </router-link>
        </div>
      </el-popover>

      <div class="user_tips">
        个人信息
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import account from '../http/api/account'
import task from '../http/api/task'
import message from '../http/api/message'
import { ElMessageBox, useTransitionFallthroughEmits } from 'element-plus'
import { Store, useStore } from 'vuex';

export default {
  data() {
    return {
      store: useStore(),
      count: 0,
      infomation: [
        {
          message_id: '',
          message_sender: '',
          message_receiver: '',
          message_type: '',
          message_content: 'test',
          send_time: '1111-11-11',
          message_status: 0,
          is_read: 0
        }
      ],
      // [
      //   { date: '2012-1-12', content: '消息一的内容', noRead: true },
      //   { data: '2013-1-13', content: '消息二的内容', noRead: true },
      //   { data: '2014-1-14', content: '消息三的内容', noRead: true },
      // ],
      unreadVis: false,
      allVis: false,
      activeName: 1,
      dialogVisible: false,
      popoverVis: false,
      buttons: { type: '', text: 'plain' },

      task_id: '',
      //client_id: '',
      username: '',
      //account: '33322244455',
      //regi_date: '2000-1-1',
      introduction: '',      
    }
  },
  methods: {
    showMessage(){
      this.unreadVis = true;
      this.allVis = false;
      let client_id = this.store.state.account.client_id;
      message.getMessage(client_id).then(res => {
        if(res.data.message == "success"){
          this.infomation = res.data.message_list; 
        }
      },error => {
        console.log(error);
      }
      )
    },

    changeMessage(){
        let message_id = this.message_id;
        //this.is_read = 0;
        message.postMessage(message_id,this.is_read).then(res => {
          if(res.data.message == "success"){
            this.is_read = 1;
          }
        },error => {
          console.log(error);
        })
    },

    initEdit(){
        this.dialogVisible = true;
        this.popoverVis = false;
        this.username = this.store.state.account.user_name;
        this.introduction = this.store.state.account.intro;
    },

    load() {
      this.count += 2
    },

    handleClose(done: () => void) {
      ElMessageBox.confirm('个人信息未保存更改，是否要退出？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },

    goToTaskDetail(task_id){
      task.getTaskById(task_id)
      .then(res => {
        if(res.data.message == "success"){
            this.$router.push({
            name: "taskDetail",
            params: {id: task_id}
          })
        } 
        else{
          ElMessageBox.alert('不存在该任务', '提示', {
          confirmButtonText: '确定'})
        }           
      }),error => {
          console.log(error)
      };
    },

    alterUserInfo(){
        let that = this;
        let content = {
          new_user_name: this.username,
          introduction: this.introduction
        };
        let client_id = this.store.state.account.client_id;
        console.log(content);
        account.alterUser(client_id, content).then(res => {
            if(res.data.message == "success"){
                this.store.commit("alterUser",content);
                that.dialogVisible = false;
            }
            else{
                ElMessageBox.alert('修改失败', '提示', {confirmButtonText: '确定'})
            }
        },error => {
            console.log(error)
        }) 
    }
  }
}

</script>

<style scoped>
.infinite-list-item:hover {
  border: 0px;
  box-shadow: 2px 2px 1.5px 1px#c7c8ca !important;
}

.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  left: 0px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
  margin-top: 10px;
}

.divider3 {
  position: absolute;
  top: 32px;
  left: 0px;
}

.avatar_content {
  font-size: 27px;
}

.input_intro {
  position: absolute;
  width: 220px;
  left: 75px;
  top: 150px;
}

.edit_words1 {
  position: absolute;
  left: 10px;
  top: 95px;
}

.edit_words2 {
  position: absolute;
  left: 10px;
  top: 155px;
}

.log_out {
  position: absolute;
  top: 275px;
  width: 100%;
  left: 0px;
}

.user_info_block {
  height: 288px;
}

.user_info {
  position: absolute;
  top: 100px;
}

.divider1 {
  position: absolute;
  top: 75px;
  left: 0px;
}

.divider2 {
  position: absolute;
  top: 245px;
  left: 0px;
}

.edit_info {
  position: absolute;
  top: 35px;
  right: 20px;
}
.header {
  border-bottom: 2px solid #CDD0D6;
  background-color: #2564CF;
  width: 100%;
  height: 55px;
  top: 0px;
  margin-top: 0px;
  position: fixed;
  z-index: 100;
}

.avatar {
  position: absolute;
  left: 10px;
  top: 10px;
  border: 1px solid black;

}

.titleIcon {
  position: absolute;
  left: 10px;
  top: 15px;
  color: #f9f9f9;
  font-size: 23px;
}

.title {
  position: absolute;
  left: 35px;
  top: 15px;
  color: #f9f9f9;
}

.input_search {
  position: absolute;
  /* left:420px; */
  left: 30%;
  /* width: 400px; */
  width: 30%;
  height: 35px;
  top: 10px;
}

.input_username {
  position: absolute;
  width: 220px;
  left: 75px;
  top: 90px;
}

.setting {
  position: absolute;
  top: 7px;
  right: 130px;
  height: 40px;
  width: 40px;
  color: #f9f9f9;
}

.bell {
  position: absolute;
  top: 7px;
  right: 68px;
  height: 40px;
  width: 40px;
  color: #f9f9f9;
}

.user {
  border: 1px solid #fff;
  position: absolute;
  top: 7px;
  right: 10px;
  height: 40px;
  width: 40px;
  color: #f9f9f9;
}

.bell_tips {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  right: 15px;
  top: 32px;
  border: 1px solid black;
  height: 22px;
  width: 64px;
}

.user_tips {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  right: 8px;
  top: 32px;
  border: 1px solid black;
  height: 22px;
  width: 64px;
}

.bell_block:hover .bell_tips {
  display: block;
}

.user_block:hover .user_tips {
  display: block;
}
</style>