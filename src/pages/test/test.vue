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
      <el-upload
        name="head"
        class="avatar-uploader"
        action="http://localhost:3000/account/changeAvatar"
        :data="requestData"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
      <template #trigger>
        <el-button type="primary">select file</el-button>
      </template>
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <el-avatar class="user" :src="account.avator_path" fit="cover"> {{ store.state.account.user_name }} </el-avatar>
      <el-button @click="alterAvator">修改头像</el-button>

    </div>
	</div>
</template>

<script>
    import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
	  import account from '../../http/api/account';
    import task from '../../http/api/task';
    import folder from '../../http/api/folder';
    import{ sm3 } from 'sm-crypto';
    import { ref } from 'vue'
    
    export default{
        data(){
            return{
              getdata: '暂未请求',
              SM3data:'',
              inputText: "",
              dateTime: "",
              imageUrl: ref(''),
              requestData:{
                client_id: 1,
              }
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
                let client_id=1;
                let data = {
                    folder_creator: 1,
                    folder_name: "测试添加任务",
                    folder_description: "测试添加任务",
                }
                task.getTaskByUserId(1).then(res=>{
                    that.getdata = JSON.stringify(res.data);
                    console.log(res.data.data)
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
            },
            getAvator(){
                let that = this;
                account.getAvator().then(res=>{
                    that.getdata = res;
                },error=>{
                    that.getdata="请求失败！";
                    console.log(error);
                })
            },
            handleAvatarSuccess(res, file) {
              this.imageUrl = URL.createObjectURL(file.raw);
              console.log("res:",res);
              console.log(this.imageUrl);
            },
            beforeAvatarUpload(file) {
                this.getdata = "file type:"+file.type;
            }
        }
    }
</script>