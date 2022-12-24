<template>
  <div class="login-main">
    <!-- <div>新顶栏开发中...</div> -->
    <div class="login-window">
      <el-form class="form" 
        label-position='top' 
        status-icon
        ref="ruleFormRef" 
        :model="loginForm" 
        :rules="rules" 
      >
        <el-form-item class="form-item" label="用户名" prop="user_name">
          <el-input class="input_log" v-model="loginForm.user_name" clearable />
        </el-form-item>
        <el-form-item class="form-item" label="密码" prop="password">
          <el-input class="input_log" v-model="loginForm.password" type="password" show-password />
        </el-form-item>
      </el-form>
      <el-button class="button" type="primary" @click="submitLog(ruleFormRef)">登录</el-button>
    </div>
    <!-- <div>新底栏开发中...</div> -->
  </div>
</template>
  
<script lang="ts" setup>
    import {ref, reactive} from 'vue';
    import type { FormInstance, FormRules } from 'element-plus'

    const ruleFormRef = ref<FormInstance>()
    const loginForm = reactive({
        user_name: '',
        password: ''
    })

    const rules = reactive<FormRules>({
        user_name: [{
            required: true,
            message: '请输入用户名',
            trigger: 'change',
        },],
        password: [{
            required: true,
            message: '请输入密码',
            trigger: 'change',
        }],
    })

    const submitLog = async (formEl: FormInstance | undefined) => {
        if(!formEl) return;
        await formEl.validate( (valid,fields) => {
            if(valid) {
                console.log('successful submit')
            } else {
                console.log('error submit!',fields)
            }
        })
    }

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
        margin-bottom: 20px;
    }
    .input_log{
        width: 280px;
        height: 40px;
        font-size: 15px;
    }
    .button{
        width: 280px;
        height: 35px;
        margin-top: 15px;
    }
</style>