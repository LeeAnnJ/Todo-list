<template>
  <div class="card-slot">
    <!-- 标题栏 -->
    <div class="title">
      <img class="title-icon" src="../../assets/icons/9_application.png" alt="some_text" />
      <b style="float: left;">子步骤（{{subnumber}}）</b>
    </div>
    <!-- 子步骤 -->
    <el-card v-for="sub in subtasks" class="substep" @mouseenter="focusOn(sub)" @mouseleave="focusLeave(sub)">
      <div style = "flex-direction: row; height: 30px;">
        <div v-if="sub.isfinished" class="substep-tag">未完成</div>
        <div v-else class="substep-tag finish">已完成</div>
        <!-- 菜单部分 -->
        <el-popover v-if="!sub.isedit"  trigger="click" transition="all 0.5s">
          <template #reference>
            <div v-if="sub.isfocus" class="menu-icon">
              <el-icon><MoreFilled /></el-icon>
            </div>
          </template>
          <div style="margin-top: 7px;" @mouseenter="focusOn">
            <div class="menu-item">
              <button class="menu-button" >完成子步骤</button>
            </div>
            <div class="menu-item">
              <button class="menu-button" @click="startEdit(sub)">修改步骤内容</button>
            </div>
            <div class="menu-item">
              <button class="menu-button">删除该任务</button>
            </div>
          </div>
        </el-popover>
        <el-button v-else class="edit-finish-icon" @click="finishEdit(sub)">
          <el-icon><Select /></el-icon>
        </el-button>
      </div>
      <div v-if="!sub.isedit" style="padding-left: 15px;">{{sub.name}}</div>
      <div v-else>
        <el-input clearable v-model="sub.name" 
          placeholder="请输入子步骤名称" 
          type="textarea" 
          :rows="2"
        />
      </div>
    </el-card>
    <el-button class="add-button" round>
      <el-icon><Plus /></el-icon>
      添加子步骤
    </el-button>
  </div>
</template>

<script>
    export default{
        name:"subtask-slot",
        props :{},
        data(){
            return{
                subtasks:[{
                    subtask_id: "001",
                    isfinished: false,
                    name: "子步骤1",
                    isfocus: false,
                    isedit: false,
                },{
                    subtask_id: "002",
                    isfinished: false,
                    name: "子步骤2 balabala balabala balabala",
                    isfocus: false,
                    isedit: false,
                },{
                    subtask_id: "003",
                    isfinished: true,
                    name: "子步骤3",
                    isfocus: false,
                    isedit: false,
                }],
            }
        },
        computed :{
            subnumber: function(){
                return this.subtasks.length;
            }
        },
        methods: {
            focusOn(item){item.isfocus=true},
            focusLeave(item){item.isfocus=false;},
            startEdit(item){console.log("edit:",item.isedit); item.isedit=true;},
            finishEdit(item){item.isedit=false;},
        },
    }
</script>

<style scoped>
    @import '../../assets/css/TaskDetail.css';
    
    .menu-icon{
        /* border: 1px solid #000; */
        width: 40px;
        float:right;
        margin:2px 10px;
        font-size: 18px;
        text-align: center;
    }
    .edit-finish-icon{
        border:none;
        /* border: 1px solid #000; */
        width: 25px;
        padding: 0px;
        margin: 0px !important;
        float: right;
        font-size: 23px;
        color:#73767a;
        background-color: #FFF;
    }
    .edit-finish-icon:hover{
        color:#256cf4;
        background-color: #e4e5e6;
    }
</style>