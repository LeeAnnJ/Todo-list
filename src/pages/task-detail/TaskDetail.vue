<template>
  <div>
    <!-- 顶栏 -->
    <TopLine></TopLine>
    <el-container>
      <!-- 任务详情栏 -->
      <div class="card-slot">
        <!-- 标题栏 -->
        <div class="title">
          <img class="title-icon" src="../../assets/icons/2_content.png" alt="some_text" />
          <b>任务概况</b>
        </div>
      </div>
      <div class="card-slot">
        开发中...
      </div>
    </el-container>
  </div>
</template>

<script>
    import TopLine from '../../components/TopLine.vue';
    
    export default {
        components :{
            TopLine,
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

<style scoped>
    .main{
        background-color:#000;
    }
    .card-slot{
        border: 1px solid #000;
        height: 100%;
        width: 320px;
        background-color: #F5F6F7;
        padding: 30px 20px;
    }
    .title{
      /* border: 1px solid #000; */
      float: left;
      font-size: 18px;
    }
    .title-icon{
        width: 25px;
        height: 25px;
        float: left;
    }

</style>