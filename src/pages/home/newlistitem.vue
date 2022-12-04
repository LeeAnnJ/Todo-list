<!------
该文件为 "新建列表" 功能创建的列表项<todo-item>
------>

<template>
       
    <el-menu default-active="this.$route.path" router>
    <el-menu-item>
    {{ title }}
    <el-icon @click="$emit('remove')"><DeleteFilled /></el-icon>
    </el-menu-item>
    </el-menu>  
  
</template>

<script>
import { DeleteFilled } from '@element-plus/icons-vue';

export default {
    props: ["title"],
    emits: ["remove"],
    components: { DeleteFilled }
}
</script>