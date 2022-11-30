<template>
  <div class="global">
    <el-button class="addbutton" >
      <el-icon :size="16"><Plus /></el-icon>
      点击添加新任务
    </el-button>
  </div>
</template>

<script>
    export default{
        name:"add-new",
    }
</script>

<style scoped>
    .global{
        border: 1px dashed #3e3f41;
        border-radius: 30px;
        margin-top: 17px;
        width: 250px;
        height: 160px;
        padding: 0px;
        display: flex;
        justify-content: center;
    }
    .addbutton,.addbutton:focus{
        background-color: #FAF9F8;
        border: none;
        border-radius: 30px;
        font-size: 15px;
        width: 100%;
        height: 100%;
        color:#606266 !important; 
    }
    .addbutton:hover{
        background-color:#f4f4f5;
        color:#606266;
        text-decoration: underline;
    }
</style>