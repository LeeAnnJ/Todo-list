<template>
  <el-container class="side">
    <el-aside width="225px">
      
        <el-container width="200px">
      <el-header>
          <el-menu>
            <el-menu-item index="1-0">
                <el-icon><Fold /></el-icon>
                </el-menu-item>
        </el-menu></el-header>
      <el-main>
        <el-scrollbar>
          <el-menu >
            <el-menu-item-group>
              
              <el-menu-item index="1-1">
                <el-icon><sunny /></el-icon>
                我的一天</el-menu-item>
              <el-menu-item index="1-2">
                <el-icon><Star /></el-icon>
                重要</el-menu-item>
              <el-menu-item index="1-3">
                <el-icon><Calendar /></el-icon>
                有截止日期的任务</el-menu-item>
              <el-menu-item index="1-4">
                <el-icon><UserFilled /></el-icon>
                周期性任务</el-menu-item>
              <el-menu-item index="1-5">
                <el-icon><HomeFilled /></el-icon>
                所有任务</el-menu-item>
            </el-menu-item-group>
          <el-divider />
            <el-menu-item-group title="">
              
              <el-menu-item index="1-7" text @click="dialogTableVisible = true">
                <el-icon><Expand /></el-icon>
                新建任务1
              </el-menu-item>
              
              <el-menu-item index="1-6" text @click="dialogTableVisible = true">
                <el-icon><Plus /></el-icon>
                新建列表<p class="margin"></p>
                <el-icon><DocumentAdd /></el-icon>
              </el-menu-item>
  <el-dialog v-model="dialogTableVisible">

  </el-dialog>
              
            </el-menu-item-group>
        </el-menu>
        </el-scrollbar>
          </el-main>
      <el-footer>
          <i>
              <el-tooltip
        class="box-item"
        effect="dark"
        content="Right Bottom prompts info"
        placement="right-end"
      > 
        <a href="" >
               <el-icon><Message /></el-icon>
               </a>
      </el-tooltip>
       <el-icon><SemiSelect /></el-icon>        
            
            <el-tooltip
        class="box-item"
        effect="dark"
        content="Right Bottom prompts info"
        placement="right-end"
      > 
        <a href="" class="color">
               <el-icon><Calendar /></el-icon>
               </a>
      </el-tooltip>
              
              
              <el-icon><SemiSelect /></el-icon>
            <el-tooltip
        class="box-item"
        effect="dark"
        content="Right Bottom prompts info"
        placement="right-end"
      > 
        <a href="">
               <el-icon><Avatar /></el-icon>
               </a>
      </el-tooltip>
              
              <el-icon><SemiSelect /></el-icon>
            <el-tooltip
        class="box-item"
        effect="dark"
        content="Right Bottom prompts info"
        placement="right-end"
      > 
        <a href="">
               <el-icon><Link /></el-icon>
               </a>
      </el-tooltip>
              
              <el-icon><SemiSelect /></el-icon>
            <el-tooltip
        class="box-item"
        effect="dark"
        content="Right Bottom prompts info"
        placement="right-end"
      > 
        <a href="">
               <el-icon><Check /></el-icon>
               </a>
      </el-tooltip>
              
             
            </i>
          </el-footer>
    </el-container>

      

      
      
    </el-aside> 

  </el-container>     

</template>


<script lang="ts" setup>
import { ref } from 'vue'
const dialogTableVisible = ref(false)
import { Menu as IconMenu, Message, Setting, Sunny, Star, List, HomeFilled, UserFilled,Plus,DocumentAdd,Fold,Calendar,Link,Avatar,Check,Expand
       } from '@element-plus/icons-vue'

const item = {
  
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped>
  
  a:link{
    color:black
  }
  .margin
{
	margin-right:50px;
}
 icon.color {color:black;}
.side {
  background-color: #FDFDFD;
        
        float: left;
}

</style>
