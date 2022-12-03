<template>
  <div class="main">
    <h1>注册账号</h1>
    <div class="form-div">
      <el-form :model="longinForm" class="form" label-position="top">
        <el-form-item class="form-item" label="您的用户名">
          <el-input style="width: 400px;" v-model="loginForm.usrname" />       
        </el-form-item>
        <el-form-item class="form-item" label="您的生日">
          <el-date-picker v-model="loginForm.birthday" 
            style="width: 400px;" placeholder="点击选择日期" />
        </el-form-item>
        <el-form-item class="form-item" label="个人简介">
          <el-input v-model="loginForm.introduce" type="textarea" 
            style="width: 400px;" :rows="3" placeholder="请输入您的个人简介"/>
        </el-form-item>
        <el-form-item class="form-item" label="密码">
          <el-input style="width: 400px;" v-model="loginForm.password" />       
        </el-form-item>
        <el-form-item class="form-item" label="确认密码">
          <el-input style="width: 400px;" v-model="loginForm.confirmPassword" />       
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    import { reactive } from 'vue';
    
    export default{
        data(){
            return{
                loginForm: reactive({
                    usrname:'',
                    birthday:'',
                    password:'',
                    introduce:'',
                    confirmPassword:'',
                })
            }
        }
    }
</script>

<style scoped>
    .main{
        /* background-color: aqua; */
        width: 100%;
        height: 750px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .form-div{
        border: double #989795;
        border-radius: 20px;
        background-color :#f9f9f9;
        height: 800px;
        width: 500px;
        padding: 50px 10px 50px 100px;
        margin-top: 10px;
    }
    .form{
      /* border: 1px solid #000; */
      width: 100%;
    }
    .form-item{
        /* border: 1px solid #000; */
        margin-bottom: 30px;
    }
</style>