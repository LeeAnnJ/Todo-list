<template>
  <div>
    <!-- 顶栏 -->
    <TopLine></TopLine>
    <el-container class="main">
      <!-- 任务详情栏 -->
      <div class="card-slot">
        <!-- 标题栏 -->
        <div class="title">
          <img class="title-icon" src="../../assets/icons/2_content.png" alt="some_text" />
          <b style="float: left;">任务概况</b>
        </div>
        <!-- 任务名称 任务描述 -->
        <el-card class="box-card-taskintro">
          <div class="introcard-header">
              <div class="introcard-title">
                任务名称
                <el-button :class="isImportant? 'starIcon clicked':'starIcon'" @click="starClick">
                  <el-icon><StarFilled /></el-icon>
                </el-button>
              </div>
            任务描述任务描述 balabala balabala balabala balabala balabala
          </div>
        </el-card>
        <el-card class="taskdetail">
          <el-icon class="icon" color="#256CF4"><CollectionTag /></el-icon>
          创建于 2022年 11月 25日 周五
        </el-card>
        <el-card class="taskdetail">
          <el-icon class="icon" color="#256CF4"><Memo /></el-icon>
          已添加至今日任务
        </el-card>
        <el-card class="taskdetail">
          <el-icon class="icon" color="#256CF4"><Clock /></el-icon>
          截止时间: 2022年 11月 25日 20:50
        </el-card>
        <el-card class="taskdetail">
          <el-icon class="icon" color="#256CF4"><Refresh /></el-icon>
          重复: 每周二
        </el-card>
        <el-card class="taskdetail">
          <el-icon class="icon" color="#256CF4"><Document /></el-icon>
          所属任务列表: 中级实训
        </el-card>
      </div>

      <!-- 子步骤 -->
      <div class="card-slot">
        <!-- 标题栏 -->
        <div class="title">
          <img class="title-icon" src="../../assets/icons/9_application.png" alt="some_text" />
          <b style="float: left;">子步骤（2）</b>
        </div>
        <!-- 子步骤 -->
        <el-card class="substep">
          <div class="substep-tag">未完成</div>
          <div style="padding-left: 15px;">子步骤1</div>
        </el-card>
        <el-card class="substep">
          <div class="substep-tag">未完成</div>
          <div style="padding-left: 15px;">子步骤2 balabala balabala balabala balabala balabaal</div>
        </el-card>
        <el-card class="substep">
          <div class="substep-tag finish">已完成</div>
          <div style="padding-left: 15px;">子步骤3</div>
        </el-card>
        <el-button class="add-button" round>
          <el-icon><Plus /></el-icon>
          添加子步骤
        </el-button>
      </div>

      <!-- 动态 -->
      <div class="card-slot">
        <!-- 标题栏 -->
        <div class="title">
          <img class="title-icon" src="../../assets/icons/10_inform.png" alt="some_text" />
          <b style="float: left;">动态（3）</b>
        </div>
        <!-- 动态条目 -->
        <el-card class="feed-item">
          <div class="feed-user">
            <el-avatar> user </el-avatar>
            用户名
          </div>
          <div class="feed-detail" style="">添加了子步骤:子步骤3</div>
          <span style="padding-left: 25px;">2022-11-26 14:34</span>
        </el-card>
        <el-card class="feed-item">
          <div class="feed-user">
            <el-avatar> user </el-avatar>
            用户名
          </div>
          <div class="feed-detail" style="">加入了该任务</div>
          <span style="padding-left: 25px;">2022-11-26 15:14</span>
        </el-card>
        <el-card class="feed-item">
          <div class="feed-user">
            <el-avatar> user </el-avatar>
            用户名
          </div>
          <div class="feed-detail" style="">测试文字折叠测试文字折叠测试文字折叠测试文字折叠测试文字折叠</div>
          <span style="padding-left: 25px;">2022-11-26 15:14</span>
        </el-card>
      </div>

      <!-- 共同参与人 -->
      <div class="card-slot">
        <!-- 标题栏 -->
        <div class="title">
          <img class="title-icon" src="../../assets/icons/3_user.png" alt="some_text" />
          <b style="float: left;">共同参与人（5）</b>
        </div>
        <!-- 参与人 -->
        <el-card v-for="i in 10" class="user">
          <el-avatar :size="50" class="user-avatar"> user </el-avatar>
          用户名
        </el-card>
        <el-button class="add-button" round>
          <el-icon><Plus /></el-icon>
          添加共同参与人
        </el-button>
      </div>

      <!-- 共同参与人 -->
      <div class="card-slot">
        <!-- 标题栏 -->
        <div class="title">
          <img class="title-icon" src="../../assets/icons/6_classific.png" alt="text" />
          <b style="float: left;">附件（0）</b>
        </div>
        <!-- 参与人 -->
        <el-button class="add-button" round>
          <el-icon><Plus /></el-icon>
          添加附件
        </el-button>
      </div>

    </el-container>
  </div>
</template>

<script>
    import TopLine from '../../components/TopLine.vue';
    import { Document, StarFilled } from '@element-plus/icons-vue';
    
    export default {
        components :{
          TopLine,
          Document
        },
        data(){
            return {
                iconUrl:[
                    '../../assets/icons/2_content.png',
                ],
            }
        }
    }
</script>

<style>
  .el-card{
    border-radius: 8px;
  }
</style>

<style scoped>
    .main{
        background-color: #F5F6F7;
        min-height: 765px;
        width: 1700px;
    }
    .card-slot{
        /* border: 1px solid #000; */
        height: 100%;
        width: 320px;
        padding: 30px 20px;
    }
    .title{
      /* border: 1px solid #000; */
      width: 100%;
      float: left;
      font-size: 20px;
      margin-bottom: 15px;
    }
    .title-icon{
        width: 25px;
        height: 25px;
        float: left;
        margin-right: 5px;
    }
    .box-card-taskintro{
        width: 100%;
        flex-direction: column;
        border-radius: 8px;
    }
    .introcard-header{
        /* border: 1px solid #000; */
        width: 100%;
        height: max-content;
        text-align: left;
        color: #909399;
        font-size: 14px;
        word-wrap: break-word;
    }
    .introcard-title{
        font-weight: 600;
        font-size: 20px;
        color: #102e6c;
        line-height: 36px;
        margin-bottom: 5px;
    }
    .starIcon{
        border:none;
        /* border: 1px solid #000000; */
        width: 30px;
        height: 30px;
        padding: 0px;
        margin: 0px;
        padding: 0px; 
        float: right;
        font-size: 30px;
    }
    .starIcon:hover {
        background-color:#fff8e1;
        color: #FFCA19;
    }
    .starIcon:focus {
        background-color: #FFFFFF;
        color: #c8c9cc;
    }
    .starIcon:active {
        color: #FFCA19;
        background-color: #FFFFFF;
    }
    .starIcon.clicked{
        color: #FFCA19;
        background-color: #FFFFFF;
    }
    .taskdetail{
      width: 100%;
      border-radius: 8px;
      text-align: left;
      font-size: 14px;
      color: #73767a;
      
    }
    .icon{
        font-size: 17px;
        vertical-align: middle;
        margin-right: 5px;
    }
    .substep{
        border-radius: 8px;
        width: 100%;
        min-height: 90px;
        text-align: left;
        margin-bottom: 13px;
    }
    .substep:hover{
      /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
        box-shadow: 7px 9px 3px 1px#c7c8ca !important;
    }
    .substep-tag{
        border-radius: 5px;
        width: 50px;
        height: 22px;
        background-color: #FFCC99;
        color: #fff;
        margin-bottom: 7px;
        padding: 0px 5px;
        font-weight: 700;
    }
    .substep-tag.finish{
      background-color: #97D077;
    }
    .add-button{
        border: none;
        width: 100%;
        height: 40px;
    }
    .feed-item{
        width: 100%;
        border-radius: 8px;
        text-align: left;
        color: #606266;
        font-size: 14px;
        margin-bottom: 12px;
    }
    .feed-user{
        /* border: 1px solid #000; */
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: 600;
        color: #303133;
    }
    .feed-detail{
        padding-left: 40px;
        margin-bottom: 10px;
    }
    .user{
        text-align: left;
        border-radius: 8px;
        margin-bottom: 13px;
        padding-left: 10px;
        font-weight: 600;
    }
    .user-avatar{
        margin-right: 10px;
    }
</style>