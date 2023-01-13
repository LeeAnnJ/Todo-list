<template>
	<div>
		<el-button @click="jumpDetail">测试跳转任务详情</el-button>
		<el-button @click="testRequest">测试请求后端数据</el-button>
		<div style="border: 1px solid #000;">
      请求结果：{{getdata}}
		</div>
    <div>
      <el-input v-model="inputText" style="width:200px" />
      <el-button @click="modifyvuex">测试修改vuex中的user_name</el-button>
      <el-button @click="calcuSM3">测试SM3结果</el-button>
      <br>测试vuex:{{JSON.stringify(account)}}<br>
      测试SM3:{{SM3data}}
    </div>
    <div>
      <el-button>日期格式调整</el-button>
      {{dateTime}}
    </div>
	</div>
</template>

<script>
    import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
	import testGet from '../../http/api/test';
	import account from '../../http/api/account';
    import task from '../../http/api/task';
    import{ sm3 } from 'sm-crypto';
    
    export default{
        data(){
            return{
              getdata: '暂未请求',
              SM3data:'',
              inputText: "",
              dateTime: "",
            }
        },
        computed:{
            ...mapState(["account"]),
        },
        methods:{
            ...mapMutations(["alterName"]),
            ...mapMutations(["alterAccount"]),
            jumpDetail(){
                this.$router.push({
                  path:"/taskDetail"
                });
            },
            testRequest(){
                let that = this;
                let task_id=1;
                let data = {
                    register_id: 1,
                    name: "测试添加任务",
                    type : 0,
                    priority: 0,
                    deadline: "2023-1-13 12:00:00",
                    note: "试一下后端接口",
                    belongs_folder_id: 1,
                    group_id: null,
                    people :[]
                }
                task.createTask(data).then(res=>{
                    that.getdata = JSON.stringify(res.data);
                },error => {
                    that.getdata="请求失败！";
                    console.log(error);
                });
            },
            modifyvuex(){
                this.alterName(this.inputText);
            },
            calcuSM3(){
                this.SM3data=sm3(this.inputText);
            }
        }
    }
</script>