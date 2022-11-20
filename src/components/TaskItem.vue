<template>
    <div class="global">
        <!-- 左边的颜色条 -->
        <div class="colorSide"></div>
        <!-- 主要内容 -->
        <div class="itemContent">
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
                <el-icon class="leftIcon">
                    <Calendar/>
                </el-icon>
                <el-icon class="leftIcon">
                    <Clock />
                </el-icon>
                <!-- 星标 -->
                <el-button :class="isImportant? 'rightIcon':'rightIcon clicked'" @click="starClick($event)">
                    <el-icon style="margin: 0px;padding:0px;"><StarFilled/></el-icon>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { Calendar, Clock, StarFilled} from '@element-plus/icons-vue'
    export default{
        name:"task-item",
        props:{
            imp:{
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
                isImportant:this.imp,
            }
        },
        methods:{
            starClick(e){
                // console.log("clicked");
                this.isImportant=!this.isImportant;
                console.log(this.isImportant);
                // let target = e.target;
                // console.log(target);
                // if (target.nodeName == "SPAN" || target.nodeName == "I") {
                //     target = e.target.parentNode;
                // }
                // target.blur();
                // return;
            }
        }
    }

</script>

<style scoped>
    .global{
        border: 1px solid #000000;
        border-radius: 30px;
        width: 250px;
        height: 160px;
        background-color: #FFFFFF;
        padding: 0px;
        /* flex-direction: row; */
    }
    .colorSide{
        /* border: 1px solid #000000; */
        background-color: #2564CF;
        width: 29px;
        height: 100%;
        border-radius: 29px 0px 0px 29px;
        float: left;
        /* flex-direction: row; */
    }
    .itemContent{
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
        /* border: 1px solid #000; */
        padding: 0px;
        margin-right: 16px;
        float: left;
        font-size: 25px;
    }
    .rightIcon /*,.rightIcon:focus:not(.rightIcon:hover)*/{
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
        background-color:#fff8e1;
        color: #FFCA19;
        border-color: #f9e6a9;
    }
    .rightIcon:focus {
        border-color: #e9e9eb;
        background-color: #FFFFFF;
        color: #c8c9cc;
    }
    .rightIcon:active {
        color: #FFCA19;
        border-color: #f9e6a9;
        background-color: #FFFFFF;
    }
    .rightIcon.clicked{
        color: #FFCA19;
        border-color: #f9e6a9;
        background-color: #FFFFFF;
    }
    .border{
        border: 1px solid #000000;
    }
</style>
  