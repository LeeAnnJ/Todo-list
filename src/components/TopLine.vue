<template>
  <div class="header">
    <el-icon class="titleIcon"><Grid />    </el-icon>
    <span class="title">
      <b>To-do List 在线看板</b>
    </span>

    <el-input v-model="input_search" class="input_search" placeholder="输入编号搜索任务">
      <template #prefix>
        <el-icon class="el-input__icon"><search /></el-icon>
      </template>
    </el-input>

    <!-- 个人设置 -->
    <div class="setting_block">
      <!-- 点击显示详细信息 -->
      <el-popover show="" placement="bottom" :width="300" trigger="click">
        <template #reference>
          <el-icon class="setting" :size="24"><Setting /></el-icon>
        </template>
        <h2>个人设置页面</h2>
        <div>我是个人设置</div>
      </el-popover>
      <!-- 悬停显示提示 -->
      <div class="setting_tips">个人设置</div>
    </div>

    <!-- 消息通知 -->
    <div class="bell_block">
      <el-popover placement="bottom" :width="300" trigger="click">
        <template #reference>
          <el-icon class="bell" :size="24" @click="unreadVis = true; allVis = false">
            <Bell />
          </el-icon>
        </template>
        <div>
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="未读消息" name="1">
              <div>
                <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                  <li @click="info.noRead = false" v-show="info.noRead" v-for="info in infomation"
                    class="infinite-list-item">{{ info.date }}{{ info.data }}&nbsp;{{ info.content }}
                    未读消息未读消息未读消息未读消息未读消息未读消息</li>
                </ul>
              </div>
            </el-collapse-item>

            <el-collapse-item title="全部消息" name="2">
              <div>
                <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                  <li v-for="info in infomation" class="infinite-list-item">
                    {{ info.date }}{{ info.data }}&nbsp;{{ info.content }}
                    全部消息全部消息全部消息全部消息全部消息全部消息</li>
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
          <el-input class="input_username" v-model="username" placeholder="real_un" />
          <br><br>
          <span class="edit_words2">性别：</span>
          <el-radio-group v-model="sex" class="radio_sex">
            <el-radio label="男" size="large">男</el-radio>
            <el-radio label="女" size="large">女</el-radio>
          </el-radio-group>
          <br><br><br>
          <span class="edit_words3">
            生日：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-date-picker v-model="birthday" type="date" 
              value-format="YYYY/MM/DD" placeholder="pick your birthday" />
          </span>
          <span class="edit_words4">简介：</span>
          <el-input class="input_intro" v-model="introduction" placeholder="real_intro" />
          <br><br><br><br><br>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false;">取消</el-button>
            <el-button type="primary" @click="dialogVisible = false;">保存</el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <div class="user_block">
      <el-popover show="" placement="bottom" :width="250" trigger="click" v-model:visible="popoverVis">
        <template #reference>
          <el-avatar class="user"> {{ username }} </el-avatar>
        </template>

        <div class="user_info_block">
          <el-avatar :size="80" class="avatar"><span class="avatar_content">{{ username }}</span></el-avatar>
          <el-button type="plain" class="edit_info" @click="dialogVisible = true; popoverVis = false">编辑资料</el-button>
          <br><el-divider class="divider1" />
          <div class="user_info">
            <h4>用户名：{{ username }}</h4>
            <h4>账号：{{ account }}</h4>
            <h4>性别：{{ sex }}</h4>
            <h4>生日：{{ birthday }}</h4>
            <h4>简介：{{ introduction }}</h4>
          </div>
          <el-divider class="divider2" />
          <router-link to="login">
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
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
export default {
  data() {
    return {
      count: 0,
      infomation: [
        { date: '2012-1-12', content: '消息一的内容', noRead: true },
        { data: '2013-1-13', content: '消息二的内容', noRead: true },
        { data: '2014-1-14', content: '消息三的内容', noRead: true },
        { data: '2015-1-15', content: '消息四的内容', noRead: true },
        { data: '2016-1-16', content: '消息五的内容', noRead: true },
        { data: '2017-1-17', content: '消息六的内容', noRead: true },
        { data: '2018-1-18', content: '消息七的内容', noRead: true },
        { data: '2019-1-19', content: '消息八的内容', noRead: true },
        { data: '2020-1-20', content: '消息九的内容', noRead: true },
        { data: '2021-1-21', content: '消息十的内容', noRead: true },
        { data: '2022-1-22', content: '消息11的内容', noRead: true }
      ],
      unreadVis: false,
      allVis: false,
      activeName: 1,
      dialogVisible: false,
      popoverVis: false,
      input_search: '',
      username: 'name',
      account: '33322244455',
      sex: '男',
      birthday: '2000-1-1',
      introduction: '我是一个简介',

      // const real_un = username.value;
      // const real_sex = sex.value;
      // const real_bir = birthday.value;
      // const real_intro = introduction.value;

      buttons: { type: '', text: 'plain' }
    }
  },
  methods: {
    load() {
      this.count += 2
    },
    handleClose(done: () => void) {
      ElMessageBox.confirm('个人信息未保存更改，是否要退出？')
        .then(() => {
          done()
        })
        .catch(() => {
          // catch error
        })
    }
  }
}

</script>

<style scoped>
.infinite-list-item:hover {
  border: 0.1px solid rgb(0, 162, 255);
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

/* .info_block{
  position: absolute;
  top:50px;
} */
.divider3 {
  position: absolute;
  top: 32px;
  left: 0px;
}

.avatar_content {
  font-size: 27px;
}

.edit_words4 {
  position: absolute;
  left: 10px;
  top: 222px;
}

.input_intro {
  position: absolute;
  width: 220px;
  left: 75px;
  top: 217px;
}

.edit_words3 {
  position: absolute;
  left: 10px;
  top: 170px;
}

.radio_sex {
  position: absolute;
  left: 80px;
  top: 115px;
}

.edit_words1 {
  position: absolute;
  left: 10px;
  top: 75px;
}

.edit_words2 {
  position: absolute;
  left: 10px;
  top: 125px;
}

.log_out {
  position: absolute;
  top: 315px;
  width: 100%;
  left: 0px;
}

.user_info_block {
  height: 328px;
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
  top: 285px;
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
  top: 70px;
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
  position: absolute;
  top: 7px;
  right: 10px;
  height: 40px;
  width: 40px;
  color: #f9f9f9;
}

.setting_tips {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  right: 75px;
  top: 32px;
  border: 1px solid black;
  height: 22px;
  width: 64px;
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

.setting_block:hover .setting_tips {
  display: block;
}

.setting_block:hover .setting {
  background-color: white;
}

.bell_block:hover .bell_tips {
  display: block;
}

.bell_block:hover .bell {
  background-color: white;
}

.user_block:hover .user_tips {
  display: block;
}
</style>