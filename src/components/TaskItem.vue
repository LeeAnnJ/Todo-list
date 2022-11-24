<template>
  <div :class="isfocus? 'global up':'global'" @mouseenter="focusOn" @mouseleave="focusLeave">
    <!-- 左边的颜色条 -->
    <div :class="isDone? 'colorside finish':'colorside'"></div>
    <!-- 主要内容 -->
    <div class="item-content">
      <!-- 任务名称 -->
      <p class="title">
        <b>任务名称</b>
      </p>
      <!-- 细节部分，后面共同参与人我想升级成头像 -->
      <p class="detail">
        创建时间: 2022-11-19<br>
        共同参与人: 张三 李四
      </p>
      <!-- 下方图标操作 -->
      <div class="iconGroup">
        <!-- 截止时间和周期性 -->
        <el-button class="leftIcon">
          <el-icon ><Calendar/></el-icon>
        </el-button>
        <el-button class="leftIcon">
          <el-icon><Clock /> </el-icon>
        </el-button>
        <!-- important -->
        <el-button :class="isImportant? 'starIcon clicked':'starIcon'" @click="starClick">
          <el-icon><StarFilled /></el-icon>
        </el-button>
        <!-- task check -->
        <el-button :class="isDone? 'rightIcon clicked':'rightIcon'" @click="confirmDone">
          <el-icon><Check /></el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
    import { Calendar, Clock, StarFilled, Plus,} from '@element-plus/icons-vue';
    export default{
        name:"task-item",
        props:{
            imp:{
                type: Boolean,
                default: false
            },
            done:{
                type:Boolean,
                default: false
            }
        },
        data(){
            return {
                isImportant:this.imp,
                isDone:this.done,
                isfocus:false
            }
        },
        methods:{
            starClick(){
                // console.log("click star");
                this.isImportant=!this.isImportant;
            },
            focusOn(){this.isfocus=true;},
            focusLeave(){this.isfocus=false;},
            confirmDone(){
                // console.log("click finish");
                this.isDone=!this.isDone;
            },
        }
    }

</script>

<style scoped>
    .global{
        border: 1px solid #303133;
        border-radius: 30px;
        margin-top: 15px;
        width: 250px;
        height: 160px;
        background-color: #FFFFFF;
        padding: 0px;
        /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
        box-shadow: 3px 3px 2px 1px#c7c8ca;
    }
    .global.up{
        margin-top: 0px;
        box-shadow: 5px 5px 3px 2px#babbbd;
    }
    .colorside{
        border: 1px solid #333;
        border-right: none;
        background-color: #2564CF;
        width: 29px;
        height: 99%;
        border-radius: 28px 0px 0px 28px;
        float: left;
        /* flex-direction: row; */
    }
    .colorside.finish{
        background-color: #00994D;
    }
    .item-content{
        /* border:1px solid #000000; */
        height: 77%;
        width: 81%;
        flex-direction: column;
        padding: 25px 0px 10px 15px;
        float: left;
        position: relative;
        /* float: left; */
    }
    .title{
        /* border: 1px solid #000000; */
        width: 90%;
        font-size: 20px;
        text-align: left;
        margin: 0px 0px;
    }
    .detail{
        /* border: 1px solid #000000; */
        /* height: 20px; */
        float: left;
        margin: 10px 0px;
        font-size: 14px;
        line-height: 24px;
    }
    .iconGroup{
        /* background-color: #d21515; */
        height: 35px;
        width: 90%;
        float: inline-end;
        position: absolute;
        bottom: 0px;
    }
    /* .iconView{

    } */
    .leftIcon{
        border: none;
        /* border: 1px solid #000; */
        width: 25px;
        height: 25px;
        padding: 0px;
        margin: 0px;
        margin-right: 4px;
        float: left;
        font-size: 25px;
    }
    .starIcon{
        border:none;
        /* border: 1px solid #000000; */
        width: 25px;
        height: 25px;
        padding: 0px;
        margin:0px;
        padding:0px; 
        float: left;
        font-size: 25px;
    }
    .starIcon:hover {
        background-color:#fff8e1;
        color: #FFCA19;
    }
    .starIcon:focus {
        background-color: #FFFFFF;
        color: #c8c9cc;
    }
    .starIcon:active {
        color: #FFCA19;
        background-color: #FFFFFF;
    }
    .starIcon.clicked{
        color: #FFCA19;
        background-color: #FFFFFF;
    }
    .rightIcon{
        border: 1px solid#e9e9eb;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        padding: 0px;
        margin-right: 10px;
        float: right;
        font-size: 25px;
        color: #c8c9cc ;
    }
    .rightIcon:hover {
        background-color:#f0f9eb;
        color: #95d475;
        border-color: #e1f3d8;
    }
    .rightIcon:focus {
        border-color: #e9e9eb;
        background-color: #FFFFFF;
        color: #c8c9cc;
    }
    .rightIcon:active {
        color: #529b2e;
        border-color: #b3e19d;
        background-color: #d1edc4;
    }
    .rightIcon.clicked{
        color: #67C23A;
        border-color: #67C23A;
        background-color: #e1f3d8;
    }
    .border{
        border: 1px solid #000000;
    }
</style>
  