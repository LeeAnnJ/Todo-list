<template>
	<div>
		<el-button @click="jumpDetail">测试跳转任务详情</el-button>
		<el-button @click="testRequest">测试请求后端数据</el-button>
		<div style="border: 1px solid #000;">
      请求结果：{{getdata}}
		</div>
	</div>
</template>

<script>
	  import testGet from '../../http/api/test';
	  import account from '../../http/api/account'

    export default{
        data(){
            return{
              getdata: '暂未请求'
            }
        },
        methods:{
            jumpDetail(){
                this.$router.push({
                  path:"/taskDetail"
                });
            },
            testRequest(){
                let that = this;
                account.getUserById().then(res=>{
                    that.getdata = JSON.stringify(res.data);
                    // console.log("请求数据：",res)
                },error => {
                    that.getdata="请求失败！";
                    console.log(error);
                });
            }
        }
    }
</script>