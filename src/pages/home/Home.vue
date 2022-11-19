<template>
    <div>
        <el-container>
            <!-- 顶栏 -->
            <TopLine></TopLine>
            <!-- 侧边栏 -->
            <Sidebar></Sidebar>
            <!-- 主要内容 -->
            <el-container>
                <div class="content">
                    内容在这里哈哈哈
                </div>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Sidebar from './sidebar.vue';
    import TopLine from './TopLine.vue';

    export default {
        components :{
            Sidebar,
            TopLine
        }
    }


</script>

<style scoped>
    .content{
        background-color: #FAF9F8;
        float: left;
    }
</style>