<template>
  <div class="hello-main">
    <h1 class="hello-title">To-do List 在线看板</h1>
    <div class="line"></div>
    一个可视化项目协作工具
    <el-button class="login-button" @click="jumpLogin">马上开启</el-button>
    <div class="registor">
      还没有看板账号？
      <el-button class="registor-button" @click="jumpRegistor" link>点击这里注册</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        methods:{
            jumpLogin(){
                this.$router.push({
                    path:"/login"
                });
            },
            jumpRegistor(){
              this.$router.push({
                    path:"/registor"
                });
            }
        }
    }
</script>

<style scoped>
.hello-main{
    height: 850px;
    width: 100%;
    position: fixed;
    top: 0px;
    display: flex;
    font-size: 20px;
    font-family: 华文中宋;
    flex-direction: column;
    justify-content: center;
    background-image: url('../../assets/backgroud.jpg');
    background-size: cover;
}
.hello-title{
    width: 100%;
    margin-bottom: 10px;
    font-size: 50px;
    font-weight: 300;
    font-family: 方正小标宋简体;
}
.line{
    width: 270px;
    height: 2px;
    background-color: #234468;
    align-self: center;
    margin-bottom: 30px;
}
.login-button{
    width: 200px;
    height: 60px;
    border-radius: 15px;
    align-self: center;
    margin:30px 0px 20px 0px;
    font-family: 华文中宋;
    font-size: 25px;
    font-weight: 300;
    box-shadow: 1px 1px 0px 1px#d8d9db;
}
.registor{
    /* border: 1px solid #000; */
    width: 100%;
    flex-direction: row;
    font-size: 15px;
}
.registor-button{
    /* border: 1px solid #000 !important; */
    padding: 0px !important;
    font-size: 15px;
    font-family: 华文中宋;
    text-decoration:underline;
    line-height: 15px;
    color: #337ecc !important;
}
</style>