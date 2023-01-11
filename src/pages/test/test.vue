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
                let user_name = "hahahah";
                let password = "d07e27c8d0695a8e6c25b2182bee0b38efc027ed8aa01a178c11ccf42964f5fc"
                let intro = "testtest";
                let req = {
                    username: user_name,
                    passwd_hash: password,
                    introduction: intro,
                }
                account.create(req).then(res=>{
                    that.getdata = JSON.stringify(res.data);
                    // {"code":200,"message":"success","data":{"client_id":11}}
                    // {"code":400,"message":"username already used","data":null}
                    //console.log(res);
                    // let account={
                    //     client_id: data.client_id,
                    //     user_name: data.user_name,
                    //     avator_path: data.avatar_path,
                    //     register_time: data.register_time,
                    //     intro: data.introduction
                    // };
                    // that.alterAccount(account);
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