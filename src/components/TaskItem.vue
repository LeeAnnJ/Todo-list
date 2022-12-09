<template>
  <div :class="isfocus? 'global up':'global'" @mouseenter="focusOn" @mouseleave="focusLeave">
    <!-- 左边的颜色条 -->
    <div :class="isDone? 'colorside finish':'colorside'"></div>
    <!-- 主要内容 -->
    <div class="item-content">
      <!-- 任务名称 和 更多菜单-->
      <div class="title">
        <b>{{name}}</b>
        <!-- 菜单部分 -->
        <el-popover trigger="hover" transition="all 0.5s">
					<template #reference>
            <div class="menu" @mouseenter="focusOn">
						  <el-icon v-if="isfocus"  ><MoreFilled /></el-icon>
            </div>
					</template>
            <div style="margin-top: 7px" @mouseenter="focusOn">
              <div class="menu-item">收藏该任务</div>
              <div class="menu-item">添加共同参与人</div>
              <div class="menu-item">重命名</div>
              <div class="menu-item">分组</div>
              <div class="menu-item">删除该任务</div>
            </div>
        </el-popover>
      </div>

      <!-- 细节部分，后面共同参与人我想升级成头像 -->
      <div class="detail">
        <div>创建时间: {{createTime}}</div>
        <div v-if="(coordinator.length>0)">
          共同参与人: 
          <span v-for="name in coordinator" class="coordinator">{{name}}</span>
        </div>
        <div v-else>共同参与人: 暂无</div>
      </div>
      <!-- 下方图标操作 -->
      <div class="iconGroup">
        <!-- 截止时间 -->
        <el-popover trigger="click" :title="('截止时间:'+content.deadline)">
					<template #reference>
						<el-button class="leftIcon">
							<el-icon ><Calendar/></el-icon>
						</el-button>
					</template>
					<el-button link @click="(dateVisible=true)">修改截止时间</el-button>
        </el-popover>
        <el-dialog v-model="dateVisible" title="选择截止日期" width="35%">
          <el-date-picker 
						v-model="selectTime" 
						type="datetime" 
						placeholder="选择截止时间"
						value-format="YYYY-MM-DD hh:mm:ss"
            size="small"
					/>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="(this.dataVisible = false)">Cancel</el-button>
              <el-button type="primary" @click="setDDL">Confirm</el-button>
            </span>
          </template>
        </el-dialog>
        
        <!-- 周期性 -->
        <el-popover trigger="click" :title="('重复:'+content.circul)">
					<template #reference>
						<el-button class="leftIcon">
							<el-icon><Clock /> </el-icon>
						</el-button>
					</template>
					<el-button link @click="(circulVisible=true)">修改周期性</el-button>
        </el-popover>
        <el-dialog v-model="circulVisible" title="设置周期性" width="35%">
          周期性的数据设置我还不知道，先放一放
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="(this.circleVisible = false)">Cancel</el-button>
              <el-button type="primary" @click="setCircul">Confirm</el-button>
            </span>
          </template>
        </el-dialog>

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
    import { Calendar, Clock, Select, StarFilled} from '@element-plus/icons-vue';
    import {ref} from 'vue';

		export default{
        name:"task-item",
        props:{
            name:{
                type: String,
                default: "任务名称"
            },
            prior:{
                type: String,
                default: false,
            },
            done:{
                type:Boolean,
                default: false
            },
            content:{
                type:Object,
                default:{
                    task_id: 0,
                    register_id: 0,
                    createTime: "2022-12-08",
                    deadline: "暂无",
                    circul: "暂无",
                    is_favor: false,
                    belongs_folder_id: 0
                }
            }
        },
        data(){
            return {
                createTime: "2022-12-08 9:19",
                coordinator:[],
                isImportant: this.prior,
                isDone: this.done,
                isfocus: false,
                selectTime: ref(''),
                selectcrl: ref(''),
                dateVisible: false,
                circulVisible: false,
            }
        },
        methods:{
            starClick(){
                // console.log("click star");
                this.isImportant=!this.isImportant;
                console.log(this.isImportant,this.prior);
            },
            focusOn(){this.isfocus=true;},
            focusLeave(){this.isfocus=false;},
            confirmDone(){
                // console.log("click finish");
                this.isDone=!this.isDone;
            },
            setDDL(){
                if(this.selectTime != null) this.content.deadline=this.selectTime;
                else this.content.deadline="暂无";
                this.dateVisible = false;
            },
            setCircul(){
                if(this.selectcrl!=null) this.circul=this.selectcrl;
                else this.circul="暂无";
                this.circulVisible=false;
            }
        }
    }

</script>

<style scoped>
    @import '../assets/css/TaskItem.css';
</style>
  