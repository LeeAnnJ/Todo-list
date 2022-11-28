<template>
  <div class="hello-main">
    <h1 class="hello-title">板栗看板</h1>
    控制创意，如此简单
    <el-button class="login-button">马上开启</el-button>
    <div class="registor">
      还没有看板账号？
      <el-button link>点击这里注册</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        
    };
</script>

<style scoped>
.hello-main{
    height: 850px;
    width: 100%;
    position: fixed;
    top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: url('../../assets/backgroud.jpg');
    background-size: cover;
}
.hello-title{
    width: 100%;
    margin-bottom: 20px;
}
.login-button{
    width: 200px;
    height: 60px;
    border-radius: 15px;
    align-self: center;
    margin:30px 0px 20px 0px;
    font-size: 25px;
    font-weight: 300;
    box-shadow: 1px 1px 0px 1px#d8d9db;
}
.registor{
    /* border: 1px solid #000; */
    width: 100%;
    flex-direction: row;
}

</style>