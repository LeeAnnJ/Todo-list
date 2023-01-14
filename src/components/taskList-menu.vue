<!-- 用户任务列表 -->
<template>
  <!-- 已建立的列表 -->
  <el-menu-item-group>
    <template #title>
      <div class="list-title">任务列表</div>
    </template>
    <el-menu-item v-for="lis in lists" class="menuItem" :key="lis.folder_id">
      <el-icon><Folder /></el-icon>
      <template #title>
        <div class="list-line" @mouseenter="focusOn(lis)" @mouseleave="focusLeave(lis)">
          <span style="width:85%">{{ lis.folder_name }}</span>
          <el-icon v-if="lis.isfocus" size="15" class="icon-delete" @click.stop="deleteList(lis.folder_id)"><Delete /></el-icon>
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
      <el-input v-else placeholder="新建列表" v-model="newTodoText" 
        @change="addList" @click.stop="" @blur="isedit=false;"
      />
    </template>
  </el-menu-item> 
</template>

<script>
  import { mapState } from 'vuex';
  import Folder from '../http/api/folder';

  export default {
    data() {
      return {
        lists: [{
          folder_id: 1,
          folder_name: "列表1",
          folder_description: "描述",
          isfocus: false,
        },{
          folder_id: 2,
          folder_name: "列表2",
          folder_description: "描述",
          isfocus: false,
        }],
          newTodoText: '',
          nextTodoId: 0,
          isedit: false
      }
    },
    computed: {
        ...mapState(["account"]),
    },
    methods: {
      focusOn(item){item.isfocus=true;},
      focusLeave(item){item.isfocus=false;},
      addList(value) {
          console.log("addlist",value);
          this.isedit = false;
          if(value!=''){
              this.lists.push({
                  folder_id: 0,
                  folder_name: value,
                  folder_description: '',
                  isfocus: false
              })
              this.newTodoText = ''
          }
      },
      deleteList(id){
          console.log(id);
          this.lists = this.lists.filter(sub => sub.folder_id != id);
      },
    },
    async created(){
        let that = this;
        await Folder.getUserTaskLists(that.account.client_id).then(res=>{
            that.lists = res.data.data.folders;
        },error=>{
          console.log(error);
        })
    }
  }

</script>

<style scoped>
  @import '../assets/css/sidebar.css';
</style>