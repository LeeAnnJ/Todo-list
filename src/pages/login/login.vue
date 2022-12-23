<template>
    <div class="login-main">
      <!-- <div>新顶栏开发中...</div> -->
      <div class="login-window">
        <el-form class="form" :model="form" label-position='top'>
          <el-form-item class="form-item" label="用户账号">
            <el-input class="input_log" v-model="form.userID" clearable />
          </el-form-item>
          <el-form-item label="密码">
            <el-input class="input_log" v-model="form.password" type="password" show-password />
          </el-form-item>
        </el-form>
        <el-button class="button" type="primary" @click="">登录</el-button>
      </div>
      <!-- <div>新底栏开发中...</div> -->
    </div>
  </template>
  
  <script>
      import { ref } from 'vue';
      import {reactive} from 'vue';
  
      export default {
          components:{
          },
          data() {
              return {
                  dialogVisible: ref(false),
                  input_account: ref(""),
                  count: 0,
                  form: reactive({
                      userID:'',
                      password: '',
                  })
              };
          },
          methods: {
              
          },
      };
  
  </script>
  
  <style scoped>
  .login-main{
      height: 850px;
      width: 100%;
      background-color: #FAFAFA;
      position: fixed;
      top: 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
  .login-window{
      border: 1px solid #c8c9cc;
      border-radius: 8px;
      width: 350px;
      height: 300px;
      background-color: #FAFAFA;
      vertical-align: middle;
  }
  .form{
      /* border: 1px solid #000; */
      width: 320px;
      margin: 30px 30px 0px 35px;
  }
  .form-item{
      /* border: 1px solid #000; */
      width: 100%;
      margin-bottom: 10px;
  }
  .input_log{
      width: 280px;
      height: 40px;
      font-size: 15px;
  }
  .button{
      width: 280px;
      height: 35px;
      margin-top: 20px;
  }
  
  </style>