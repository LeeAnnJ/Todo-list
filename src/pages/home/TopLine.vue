<template>
  <div class="header">
    <el-icon style="position:absolute;left:5px;top:12px;"><Grid /></el-icon>
    <span style="position:absolute;left:25px;top:9px;"><b>To-do List 在线看板</b></span>

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
    import {Search } from '@element-plus/icons-vue'

    const input4 = ref('')

</script>

<style scoped>
    .header{    
        background-color: #2564CF;
        width:100%;
        height:40px;
        top:0px;
        margin-top: 0px;
        position:absolute;
    }
    .input_search{
        position:absolute;
        left:420px;
        width: 400px;
        height:32px;
        top:4px;
    }
    .setting{
        position:absolute;
        top:0px;
        right:130px;
        height:40px;
        width:40px;
    }
    .bell{
        position:absolute;
        top:0px;
        right:70px;
        height: 40px;
        width: 40px;
    }
    .user{
        position:absolute;
        top:0px;
        right:10px;
        height:40px;
        width:40px;
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
