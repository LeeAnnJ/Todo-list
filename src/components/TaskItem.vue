<template>
  <div :class="isfocus? 'global up':'global'" @mouseenter="focusOn" @mouseleave="focusLeave" @click="turnDetail(task_id)">
    <!-- 左边的颜色条 -->
    <div :class="isDone? 'colorside finish':'colorside'"></div>
    <!-- 主要内容 -->
    <div class="item-content">
      <!-- 任务名称 和 更多菜单-->
      <div class="title">
        <b v-if="!isedit">{{content.name}}</b>
        <el-input v-else class="title-input" v-model="content.name" placeholder="请输入任务名称" @click.stop />
        <!-- 菜单部分 -->
        <el-popover v-if="!isedit" trigger="hover" transition="all 0.5s">
					<template #reference>
            <div class="menu" @mouseenter="focusOn">
						  <el-icon v-if="isfocus" ><MoreFilled /></el-icon>
            </div>
					</template>
          <div style="margin-top: 7px" @mouseenter="focusOn">
            <div class="menu-item">
              <button class="menu-button" >收藏该任务</button>
            </div>
            <div class="menu-item">
              <button class="menu-button" @click="corpVisible=true;">添加共同参与人</button>
            </div>
            <div class="menu-item">
              <button class="menu-button" @click="isedit=true;" >重命名</button>
            </div>
            <div class="menu-item">
              <button class="menu-button" >分组</button>
            </div>
            <div class="menu-item">
              <button class="menu-button" @click="deleteTask">删除该任务</button>
            </div>
          </div>
        </el-popover>
        <!-- 修改任务名时的完成图标 -->
        <el-button v-else class="menu finish" @click.stop="editName">
          <el-icon><Select /></el-icon>
        </el-button>
      </div>

      <!-- 添加共同参与人的对话框 -->
      <el-dialog v-model="corpVisible" width="35%" @click.stop="">
        <span>添加共同参与人</span>
        <el-input v-model="corpInput" placeholder="请输入用户名" ></el-input>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="(this.corpVisible = false)">取消</el-button>
            <el-button type="primary" @click="">确认</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 细节部分，后面共同参与人我想升级成头像 -->
      <div class="detail">
        <div>创建时间: {{content.create_time}}</div>
        <div v-if="(coordinator.length>0)">
          共同参与人: 
          <span v-for="name in coordinator" class="coordinator">{{name}}</span>
        </div>
        <div v-else>共同参与人: 暂无</div>
      </div>
      <!-- 下方图标操作 -->
      <div class="iconGroup" @click.stop="">
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
              <el-button @click="(dataVisible = false)">取消</el-button>
              <el-button type="primary" @click="setDDL">确认</el-button>
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
          <el-select v-model="selectcrl" class="circle-select" placeholder="选择周期性" size="large">
            <el-option v-for="item in cycle_options"
              :key="item.value" :label="item.label" :value="item.value"
            />
          </el-select>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="(circleVisible = false)">取消</el-button>
              <el-button type="primary" @click="setCircul">确认</el-button>
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
    import { ElMessageBox } from 'element-plus'
    import {ref} from 'vue';
    import taskAPI from '../http/api/task';
    import TaskUtil from '../http/utils/task-method.js'

		export default{
    name: "task-item",
    props: {
        task_id: {
            type: Number,
            default: 0
        },
        done: {
            type: Boolean,
            default: false
        },
        content: {
            type: Object,
            default: {
                name: "任务名称",
                register_id: 0,
                create_time: "2022-12-22 9:32",
                priority: false,
                deadline: "暂无",
                circul: "暂无",
                is_favor: false,
                belongs_folder_id: 0,
            }
        }
    },
    data() {
        return {
            coordinator: ["张三", "李四"],
            isImportant: this.content.priority,
            isDone: this.done,
            corpInput: "",
            isfocus: false,
            isedit: false,
            selectTime: ref(""),
            selectcrl: ref(""),
            dateVisible: false,
            circulVisible: false,
            corpVisible: false,
            cycle_options: [
                {value: 0, label: '暂无'},
                {value: 1, label: '每周一'},
                {value: 2, label: '每周二'},
                {value: 3, label: '每周三'},
                {value: 4, label: '每周四'},
                {value: 5, label: '每周五'},
                {value: 6, label: '每周六'},
                {value: 7, label: '每周日'}
              ]
        };
    },
    methods: {
        starClick() {
            this.isImportant = !this.isImportant;
            this.content.priority = this.isImportant;
            TaskUtil.setImportant(this.task_id,this.isImportant).then(
                res=>{console.log(res)},
                err=>{console.log(err)}
            )
            console.log(this.isImportant,this.content.priority);
        },
        focusOn() { this.isfocus = true; },
        focusLeave() { this.isfocus = false; },
        confirmDone() {
            // console.log("click finish");
            this.isDone = !this.isDone;
        },
        editName(){
            this.isedit = false;
            let that=this;
            let task = {
                task_id: that.task_id,
                name : that.content.name 
            }
            taskAPI.modifyTask(task).then(res=>{
                },error => {
                    console.log(error);
                });
        },
        setDDL() {
            if (this.selectTime != null)
                this.content.deadline = this.selectTime;
            else
                this.content.deadline = "暂无";
            this.dateVisible = false;
        },
        setCircul() {
            if (this.selectcrl != null)
                this.content.circul = this.cycle_options[this.selectcrl].label;
            else
                this.content.circul = "暂无";
            this.circulVisible = false;
        },
        turnDetail(task_id){
            console.log("turn detail",task_id);
            this.$router.push({
                name: "taskDetail",
                params: {id: task_id},
            });
        },
        deleteTask(){
            ElMessageBox.confirm(
                '确定删除此任务？',
                '提示',
                {
                  confirmButtonText: '确认',
                  cancelButtonText: '取消',
                  type: 'info'
                }
            ).
              then(()=>{
                  console.log("确认删除任务");
              })
              .catch(()=>{
                  console.log("error!");
              })
        }
    },
    mounted(){
        if(this.content.deadline!="暂无") this.selectTime=this.content.deadline;
        if(this.content.circul!="暂无") this.selectcrl=this.content.circul;
    }
}

</script>

<style scoped>
    @import '../assets/css/TaskItem.css';
</style>
  