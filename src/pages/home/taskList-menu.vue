<!-- 用户任务列表 -->
<template>
  <!-- 已建立的列表 -->
  <el-menu-item-group>
    <el-menu-item v-for="lis in todos" class="menuItem" :key="lis.id">
      <el-icon><Folder /></el-icon>
      <template #title>
        <div class="list-line" @mouseenter="focusOn(lis)" @mouseleave="focusLeave(lis)">
          <span style="width:85%">{{ lis.title }}</span>
          <el-icon v-if="lis.isfocus" size="15" class="icon-delete" @click=""><DeleteFilled /></el-icon>
        </div>
      </template>
    </el-menu-item>
  </el-menu-item-group>
  <!-- 新建列表部分 -->
  <el-menu-item>
    <el-icon style="color:#337ecc"><Plus /></el-icon>
    <template #title>
      <div v-if="!isedit" @click.stop="isedit=true;" style="color:#337ecc">
        新建列表
      </div>
      <el-input v-else placeholder="新建列表" v-model="newTodoText" @change="addList" @click.stop="" />
    </template>
  </el-menu-item> 
</template>

<script>
  export default {
    data() {
      return {
        todos: [{
          id: 1,
          title: "列表1",
          isfocus: false,
        },{
          id: 2,
          title: "列表2",
          isfocus: false,
        }],
          newTodoText: '',
          nextTodoId: 0,
          isedit: false
      }
    },
    methods: {
      focusOn(item){item.isfocus=true;},
      focusLeave(item){item.isfocus=false;},
      addList(value) {
          //console.log("addlist",value);
          this.isedit = false;
          this.todos.push({
            id: 0,
            title: this.newTodoText,
            isfocus: false
          })
          this.newTodoText = ''
      }
    }
  }
</script>

<style scoped>
  @import '../../assets/css/sidebar.css';
</style>