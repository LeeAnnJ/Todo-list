<template>
    <div>
        <!-- 顶栏 -->
        <TopLine></TopLine>
        <el-container class="global">
            <el-container class="main">
                <!-- 侧边栏 -->
                <Sidebar></Sidebar>
                <!-- 主要内容 -->
                <div class="content">
                    <div class="headLine">
                        <h1 >我的一天</h1>
                        <p>先大概打个样吧，布局之后可能要根据左边的菜单调整</p>
                        <p>2022年 11月 20日</p>
                    </div>
                    <br>
                    <div>
                        <h2 style="text-align: left;">在这里放一个任务</h2>
                        <task-item></task-item>
                    </div>
                </div>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Sidebar from './Sidebar.vue';
    import TopLine from './TopLine.vue';
    import TaskItem from '../../components/TaskItem.vue';

    export default {
        components :{
            Sidebar,
            TopLine,
            TaskTtem:"task-item"
        }
    }


</script>

<style scoped>
    .global{
        flex-direction: column;
    }
    .main{
        width: 100%;
        flex-direction: row;
    }
    .content{
        /* border: 1px solid #000000; */
        width: 75%;
        height: max-content;
        margin: 0px;
        padding: 50px 70px;
        background-color: #FAF9F8;
        flex-direction: column;
        position: absolute;
        left: 207px;
    }
    .headLine{
        border: 1rpx solid #000000;
        width: 100%;
        height: 200px;
        float: left;
        text-align: left;
    }
</style>