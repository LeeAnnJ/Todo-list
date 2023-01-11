<template>
  <div class="head">
    <div class="left-option">
      <button class="back-button">
        <el-icon><ArrowLeftBold /></el-icon>
      </button>
      <span style="margin-right: 5px;">任务详情</span>
      <el-divider direction="vertical" style="height: 65%;"/>
    </div>
    <div class="right-group">
      <div class="right-option">
        <el-button class="button-share">
          <el-icon style="width:100%;height:100%;"><Share /></el-icon>
        </el-button>
      </div>
      <div class="right-option">
        <el-button class="button-change">切换任务</el-button>
      </div>      
    </div>
  </div>

</template>

<script>
    export default {
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
  .head{
      position: absolute;
      top: 55px;
      width: 100%;
      height: 33px;
      background-color: #fff;
      box-shadow: 0px 2px 3px #ccc;
  }
  .left-option{
      /* border: 1px solid #000; */
      height: 100%;
      width: 17%;
      float: left;
      text-align: left;
      display: flex;
      align-items: center;
      padding-left: 2%;
      font-weight: 600;
      color: #666;
  }
  .back-button{
      border:none;
      height: 95%;
      width: 20px;
      background-color: #fff;
      padding: 0;
      display: flex;
      align-items: center;
      align-self: center;
      margin-right: 10px;
      font-size: 17px;
      color: #333;
  }
  .right-group{
      /* border: 1px solid #000; */
      height: 100%;
      width: 30%;
      float: right;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      padding-right: 3%;
  }
  .right-option{
      /* border: 1px solid #000; */
      margin-left: 15px;
  }
  .button-share{
      border: none;
      font-size: 18px;
      width: 40px;
      padding: 0px;
  }
  .button-share:hover,:focus,:active{
      background-color: #fff;
  }
  .button-change{
      height: 25px;
      width: 70px;
      border: 1px solid #b1b3b8;
      border-radius: 5mm;
      color: #73767a;
      padding: 0px;
      margin-top: 2px;
  }
  .button-change:hover,:focus,:active{
      background-color: #fff;
  }
</style>