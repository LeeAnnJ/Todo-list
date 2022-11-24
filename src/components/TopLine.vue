<template>
  <div class="header">
    <el-icon class="titleIcon">
      <Grid />
    </el-icon>
    <span class="title">
      <b>To-do List 在线看板</b>
    </span>

    <el-input v-model="input4" class="input_search" placeholder="输入编号搜索任务">
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
        <div>
          我是个人设置
        </div>
      </el-popover>
      <!-- 悬停显示提示 -->
      <div class="setting_tips">
        个人设置
      </div>
    </div>

    <!-- 消息通知 -->
    <div class="bell_block">
      <el-popover placement="bottom" :width="300" trigger="click">
        <template #reference>
          <el-icon class="bell" :size="24"><Bell /></el-icon>
        </template>
        <h2>消息通知页面</h2>
        <div>
          我是消息通知
        </div>
      </el-popover>

      <div class="bell_tips">
        消息通知
      </div>
    </div>

    <!-- 个人信息 -->
    <div class="user_block">
      <el-popover placement="bottom" :width="300" trigger="click">
        <template #reference>
          <el-icon class="user" :size="24"><User /></el-icon>
        </template>
        <h2>个人信息页面</h2>
        <div>
          我是个人信息
        </div>
      </el-popover>
           
      <div class="user_tips">
        个人信息
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import { Search } from '@element-plus/icons-vue'

    const input4 = ref('')

</script>

<style scoped>
    .header{    
        border-bottom: 2px solid #CDD0D6;
        background-color: #2564CF;
        width:100%;
        height: 55px;
        top: 0px;
        /* margin-top: 0px; */
        position:absolute;
    }
    .titleIcon{
        position:absolute;
        left: 10px;
        top: 15px;
        color: #f9f9f9;
        font-size: 23px;
    }
    .title{
        position:absolute;
        left:35px;
        top:15px;
        color: #f9f9f9;
    }
    .input_search{
        position:absolute;
        /* left:420px; */
        left: 30%;
        /* width: 400px; */
        width: 30%;
        height:35px;
        top: 10px;
    }
    .setting{
        position:absolute;
        top: 7px;
        right: 130px;
        height: 40px;
        width: 40px;
        color:#f9f9f9;
    }
    .bell{
        position:absolute;
        top: 7px;
        right: 68px;
        height: 40px;
        width: 40px;
        color: #f9f9f9;
    }
    .user{
        position:absolute;
        top: 7px;
        right: 10px;
        height: 40px;
        width: 40px;
        color: #f9f9f9;
    }
    .setting_tips{
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        right: 75px;
        top: 32px;
        border:1px solid black;
        height: 22px;
        width: 64px;
    }
    .bell_tips{
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        right:15px;
        top:32px;
        border:1px solid black;
        height:22px;
        width:64px;
    }
    .user_tips{
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        right:8px;
        top: 32px;
        border:1px solid black;
        height:22px;
        width:64px;
    }
    .setting_block:hover .setting_tips{
        display: block;
    }
    .setting_block:hover .setting {
        background-color: whitesmoke;
    }
    .bell_block:hover .bell_tips{
        display: block;
    }
    .bell_block:hover .bell {
        background-color: whitesmoke;
    }
    .user_block:hover .user_tips{
        display: block;
    }
    .user_block:hover .user {
        background-color: whitesmoke;
    }
</style>