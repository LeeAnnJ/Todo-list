<template>
  <el-affix :offset="55">
    <el-menu class="side" default-active="this.$route.path " :collapse="isCollapse" router>
      <!-- 伸缩和展开图标 -->
      <div :class="isCollapse? 'fold-line collapse':'fold-line'">
        <el-icon v-if="isCollapse" @click.stop="isCollapse=false"><Expand /></el-icon>
        <el-icon v-else @click.stop="isCollapse=true"><Fold /></el-icon>
      </div>
      <!-- 固定展示列表 -->
      <el-menu-item-group>
        <el-menu-item index="/home" class="menuItem">
          <el-icon><sunny /></el-icon>
          <template #title>我的一天</template>
        </el-menu-item>

        <el-menu-item index="/important" class="menuItem">
          <el-icon><Star /></el-icon>
          <template #title>重要任务</template>
        </el-menu-item>

        <el-menu-item index="/ddl" class="menuItem">
          <el-icon><Calendar /></el-icon>
          <template #title>有截止日期的任务</template>
        </el-menu-item>

        <el-menu-item index="/period" class="menuItem">
          <el-icon><RefreshRight /></el-icon>
          <template #title>周期性任务</template>
        </el-menu-item>

        <el-menu-item index="/group" class="menuItem">
          <el-icon><SuitcaseLine /></el-icon>
          <template #title>群组任务</template>
        </el-menu-item>

        <el-menu-item index="/allTask" class="menuItem">
          <el-icon><HomeFilled /></el-icon>
          <template #title>所有任务</template>
        </el-menu-item>
      </el-menu-item-group>
      <el-divider />
      <task-list></task-list>
    </el-menu>
  </el-affix>
</template>

<script>
import TaskList from './taskList-menu.vue';
import { ref } from 'vue'

export default {
  components: {
    "task-list": TaskList,
},
  data() {
    return {
      isCollapse: ref(false),
    }
  },
  methods: {
  }
}

</script>

<style scoped>
  @import '../../assets/css/sidebar.css';
</style>