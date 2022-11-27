<template>
  <div class="hello-main">
    <div class="login-window">
      <el-form class="form" :model="form" label-position='top'>
        <el-form-item class="form-item" label="用户账号">
          <el-input class="input_log" v-model="form.userID" clearable />
        </el-form-item>
        <el-form-item label="密码">
          <el-input class="input_log" v-model="form.password" type="password" show-password />
        </el-form-item>
      </el-form>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">注册</el-button>
          <el-button type="primary" @click="dialogVisible = false">登录</el-button>
        </div>
      
    </div>
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
            handleClose(){
              ElMessageBox.confirm('Are you sure to close this dialog?')
              .then(() => {
                  done()
              })
              .catch(() => {
                // catch error
              })
            }
        },
    };

</script>

<style scoped>
.hello-main{
    height: 850px;
    width: 100%;
    background-color: #FAFAFA;
    position: fixed;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-window{
    border: 1px solid #c8c9cc;
    width: 400px;
    height: 400px;
    background-color: #FAFAFA;
    display: flex;
    vertical-align: middle;
}
.form{
    width: 100%;
    border: 1px solid #000;
    align-items: center;
}
.form-item{
    border: 1px solid #000;
    
    
}
.dialog-footer button:first-child {
    margin-right: 10px;
}
.input_log{
    width: 300px;
}

</style>