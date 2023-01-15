<template>
	<div>
		<!-- 顶栏 -->
		<el-affix>
      <topLine></topLine>
		</el-affix>
		<el-container class="global">
			<el-container class="main">
				<!-- 侧边栏 -->
				<sidebar></sidebar>
				<!-- 主要内容 -->
				<div class="content">
					<!-- "我的一天"对应的标题栏 -->
					<div class="headline-other">
						<div style="flex-direction:row; font-size: 20px;">
							<h2 style="margin: 0px; line-height: 15px;">
								<el-icon><Calendar /></el-icon>
								任务列表：{{folder_name}}
							</h2>
						</div>
					</div>
					<!-- 任务列表 -->
					<div class="item-slot">
						<div style="font-size: 18px;">
							<h1 style="text-align: left; margin: 0px 0px 10px 0px;">任务列表</h1>
						</div>
						<div style="display: flex; flex-direction: row; flex-wrap: wrap;">
							<div v-for="task in tasks" class="item-container" >
                <task-item :task_id="task.task_id" :done="task.done" :content="task.content"></task-item>
              </div>
							<div class="item-container">
								<new-task></new-task>
							</div>
						</div>
					</div>
				</div>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import Sidebar from '../../components/Sidebar.vue';
import TopLine from '../../components/TopLine.vue';
import TaskItem from '../../components/TaskItem.vue';
import NewTask from '../../components/NewTask.vue';
import TaskUtil from '../../http/utils/task-method.js';
import { mapState } from 'vuex';
import { toRaw } from '@vue/reactivity';

export default {
    components: {
      "sidebar": Sidebar,
      "topline": TopLine,
      "task-item": TaskItem,
      "new-task": NewTask
    },
    data() {
      return {
          folder_id: 0,
          folder_name: '',
          tasks: [],
      }
    },
    computed: {
        ...mapState(["account"]),
        ...mapState(["folders"]),
    },
    methods: {
    },
    async updated() {
        let client_id = this.account.client_id;
        this.folder_id = Number(this.$route.params.fold);
        this.tasks = await TaskUtil.getFolder(client_id,this.folder_id);
        this.folder_name = this.$route.params.name;
        console.log(this.folder_id);
    },
}

</script>

<style scoped>
	@import '../../assets/css/maincontent.css';

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