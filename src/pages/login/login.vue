<template>
  <div class="login-main">
    <div>
        <h2>登录</h2>
    </div>
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
  </div>
</template>
  
<script lang="ts" setup>
    import {ref, reactive} from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import type { FormInstance, FormRules } from 'element-plus';
    import { ElMessage } from 'element-plus';
    import{ sm3 } from 'sm-crypto';
    import account from '../../http/api/account';

    const router = useRouter();
    const store = useStore();

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

    function parseTime(time){
        if (time==null) return "暂无";
        var date = new Date(time);
        let monthString = date.getMonth()+1>=10? String(date.getMonth()+1): '0'+(date.getMonth()+1);
        let dtString = date.getDate()>=10? String(date.getDate()):'0' + date.getDate();	
        let hourString = date.getHours()>=10? String(date.getHours()):'0'+date.getHours();
        let minuString = date.getMinutes()>=10? String(date.getMinutes()):'0'+date.getMinutes();
        let secondString = date.getSeconds()>=10? String(date.getSeconds()):'0'+date.getSeconds();
        let str=date.getFullYear()+'-'+monthString+'-'+dtString+' '+hourString+':'+minuString+':'+secondString;
        return str;
    }

    const submitLog = async (formEl: FormInstance | undefined) => {
        if(!formEl) return;
        await formEl.validate( (valid,fields) => {
            if(valid) {
                // console.log('successful submit')
                let password = sm3(loginForm.password);
                account.login(loginForm.user_name, password).then(res=>{
                    if(res.data.message=="success"){
                        let data = res.data.client.acc_info;
                        // console.log(res);
                        let account={
                            client_id: data.client_id,
                            user_name: data.user_name,
                            avator_path: "http://localhost:3000"+data.avatar_path,
                            register_time: parseTime(data.register_time),
                            intro: data.introduction
                        };
                        store.commit("alterAccount",account);
                        console.log(store.state.account.client_id);
                        router.push({
                            path:"/home"
                        });
                    }
                    else{
                        ElMessage.error('您的用户名或密码输入有误，请重试！');
                    }
                },error => {
                    console.log(error);
                });
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
        background-image: url('../../assets/backgroud.jpg');
        background-size: cover;
    }
    .login-window{
        border: 1px solid #c8c9cc;
        border-radius: 8px;
        width: 350px;
        height: 300px;
        background-color: #fafafa69;
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