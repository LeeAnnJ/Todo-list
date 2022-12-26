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
				<!-- 主要内容 -->
				<div class="content">
					<!-- "我的一天"对应的标题栏 -->
					<div class="headline-other">
						<div style="flex-direction:row; font-size: 20px;">
							<h2 style="margin: 0px; line-height: 15px;">
								<el-icon><HomeFilled /></el-icon>
								所有任务
							</h2>
						</div>
					</div>
					<!-- 任务列表 -->
					<div class="item-slot">
						<div style="font-size: 18px;">
							<h1 style="text-align: left; margin: 0px 0px 10px 0px;">任务列表</h1>
						</div>
						<div style="display: flex; flex-direction: row; flex-wrap: wrap;">
							<div v-for="task in tasks" class="item-container">
                <task-item :task_id="task.task_id" :done="task.done" :content="task.content"></task-item>
              </div>
							<div class="item-container">
								<NewTask></NewTask>
							</div>
						</div>
					</div>
				</div>
			</el-container>
		</el-container>
	</div>
</template>


<script>
    import Sidebar from '../home/sidebar.vue';
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
              tasks: [{
                    task_id: 0,
                    done: false,
                    content: {
                        name: "任务一",
                        register_id: 0,
                        create_time: "2022-12-22 9:32",
                        priority: false,
                        deadline: "暂无",
                        circul: "暂无",
                        is_favor: false,
                        belongs_folder_id: 0
                    }
                },{
                    task_id: 1,
                    done: false,
                    content: {
                        name: "任务二",
                        register_id: 0,
                        create_time: "2022-12-22 20:21",
                        priority: false,
                        deadline: "暂无",
                        circul: "暂无",
                        is_favor: false,
                        belongs_folder_id: 0
                    }
                },{
                    task_id: 2,
                    done: true,
                    content: {
                        name: "任务三",
                        register_id: 0,
                        create_time: "2022-12-22 21:21",
                        priority: false,
                        deadline: "暂无",
                        circul: "暂无",
                        is_favor: false,
                        belongs_folder_id: 0
                    }
                }],
            }
        },
        methods: {
        }
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