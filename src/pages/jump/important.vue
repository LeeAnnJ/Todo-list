<template>
    <div>
        <!-- 顶栏 -->
        <el-affix>
            <TopLine></TopLine>

        </el-affix>

        <el-container class="global">
            <el-container class="main">
                <!-- 侧边栏 -->
                <Sidebar></Sidebar>


<h2>
<el-icon>
    <Star />
</el-icon>
重要
</h2>




            </el-container>
        </el-container>
    </div>
</template>


<script>
import Sidebar from '../../pages/home/Sidebar.vue';
import TopLine from '../../components/TopLine.vue';
import TaskItem from '../../components/TaskItem.vue';
import NewTask from '../../components/NewTask.vue';

export default {
    components: {
        Sidebar,
        TopLine,
        TaskTtem: "task-item",
        NewTask
    },
    data() {
        return {

        }
    },
    methods: {
        jumpDetail() {
            this.$router.push({
                path: "/taskDetail"
            });
        }
    }
}

</script>

<style scoped>
.global {
    flex-direction: column;
    padding: 0px;
}

.main {
    width: 100%;
    flex-direction: row;
    margin: 0px;
}
</style>