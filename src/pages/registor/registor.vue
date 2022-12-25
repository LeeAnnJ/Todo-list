<template>
  <div class="main">
    <h1>注册账号</h1>
    <div class="form-div">
      <el-form class="form"
        label-position="top"
        status-icon
        ref="ruleFormRef"
        :model="regisForm"
        :rules="rules"
      >
        <el-form-item class="form-item" label="您的用户名" prop="user_name">
          <el-input style="width: 400px;" v-model="regisForm.user_name" />       
        </el-form-item>
        <el-form-item class="form-item" label="个人简介" prop="introduce">
          <el-input v-model="regisForm.introduce" type="textarea" 
            style="width: 400px;" :rows="3" placeholder="请输入您的个人简介"/>
        </el-form-item>
        <el-form-item class="form-item" label="密码" prop="password">
          <el-input style="width: 400px;" v-model="regisForm.password" type="password" />       
        </el-form-item>
        <el-form-item class="form-item" label="确认密码" prop="confirm">
          <el-input style="width: 400px;" v-model="regisForm.confirm" type="password" />       
        </el-form-item>
      </el-form>
      <el-button class="regis-button" @click="submitRegis(ruleFormRef)">点击注册</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
    import { ref, reactive } from 'vue';
    import type { FormInstance, FormRules } from 'element-plus';

    const ruleFormRef = ref<FormInstance>()
    const regisForm = reactive({
        user_name:'',
        introduce:'',
        password:'',
        confirm:'',
    })

    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (regisForm.confirm !== '') {
          if (!ruleFormRef.value) return
          ruleFormRef.value.validateField('confirm', () => null)
        }
        callback()
      }
    }

    const validateconfirm = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else if (value !== regisForm.password) {
        callback(new Error("两次密码输入不一致！"))
      } else {
        callback()
      }
    }

    const rules = reactive<FormRules>({
        user_name:[{
            required: true,
            message: "请输入用户名",
            trigger: 'change'
        }],
        password:[{
            validator: validatePass,
            trigger: 'change' 
        }],
        confirm:[{
            validator: validateconfirm,
            trigger: 'change'
        }]
    })

    const submitRegis = async (formEl: FormInstance | undefined) => {
        if(!formEl) return;
        await formEl.validate( (valid,fields) =>{
            if(valid) {
                console.log('successful submit')
            }
            else {
                console.log('error submit!',fields)
            }
        })
    }
</script>

<style scoped>
    .main{
        /* background-color: aqua; */
        width: 100%;
        height: 850px;
        position: fixed;
        top: 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 70px;
        background-image: url('../../assets/backgroud.jpg');
        background-size: cover;
    }
    .form-div{
        border: double #989795;
        border-radius: 20px;
        background-color :#f9f9f97a;
        height: 500px;
        width: 500px;
        padding: 50px 10px 50px 10px;
        margin-top: 10px;
    }
    .form{
        /* border: 1px solid #000; */
        width: 100%;
        margin-left: 50px;
    }
    .form-item{
        /* border: 1px solid #000; */
        margin-bottom: 30px;
    }
    .regis-button{
        width: 250px;
        height: 33px;
        margin-top: 20px;
        font-size: 17px;
        font-weight: 600;
    }
</style>