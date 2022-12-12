<template>
  <el-affix :offset="55">
    <el-container class="side">
      <el-aside width="200px" class="sideGlobal">
        <el-container>
          <el-header>
            <el-menu class="menu">
              <el-menu-item index="1-0" class="menuItem">
                <el-icon>
                  <Fold />
                </el-icon>
              </el-menu-item>
            </el-menu>
          </el-header>
          <el-aside>
            <!-- <el-scrollbar> -->
            <el-menu class="menu" default-active="this.$route.path" router>
              <el-menu-item-group>

                <el-menu-item index="/home" class="menuItem">
                  <el-icon>
                    <sunny />
                  </el-icon>
                  我的一天
                </el-menu-item>

                <el-menu-item index="/important" class="menuItem">
                  <el-icon>
                    <Star />
                  </el-icon>
                  重要
                </el-menu-item>

                <el-menu-item index="/ddl" class="menuItem">
                  <el-icon>
                    <Calendar />
                  </el-icon>
                  有截止日期的任务
                </el-menu-item>

                <el-menu-item index="/period" class="menuItem">
                  <el-icon>
                    <UserFilled />
                  </el-icon>
                  周期性任务
                </el-menu-item>

                <el-menu-item index="/period" class="menuItem">
                  <el-icon>
                    <UserFilled />
                  </el-icon>
                  群组任务
                </el-menu-item>

                <el-menu-item index="/allTask" class="menuItem">
                  <el-icon>
                    <HomeFilled />
                  </el-icon>
                  所有任务
                </el-menu-item>

              </el-menu-item-group>
            </el-menu>

            <el-divider />

            <el-menu class="menu">

              <el-menu-item-group>
                <todo-item v-for="(todo, index) in todos" :key="todo.id" :title="todo.title"
                  @remove="todos.splice(index, 1)">
                </todo-item>

              </el-menu-item-group>

              <form v-on:submit.prevent="addNewTodo">
                <el-input placeholder="新建列表" id="new-todo" v-model="newTodoText">
                </el-input>
              </form>

            </el-menu>
            <!-- </el-scrollbar> -->
          </el-aside>

        </el-container>
      </el-aside>
    </el-container>
  </el-affix>
</template>

<script>
import TodoItem from './newlistitem.vue';
import { reactive, ref } from 'vue';
import { padStart } from 'lodash';
import { RouterView } from 'vue-router';

export default {
  components: { TodoItem },
  data() {
    return {
      newTodoText: '',
      todos: [],
      nextTodoId: 1
    }
  },
  methods: {
    addNewTodo() {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
}

const form = reactive({
  name: ''
})
const items = form.name;

</script>

<style scoped>
a:link {
  color: black
}

.margin {
  margin-right: 50px;
}

icon.color {
  color: black;
}

.side {
  width: 200px;
  height: 980px;
  background-color: #FFF;
  float: left;
}

.sideGlobal {
  border-right: 1px solid#b1b3b8;
  background-color: #FFF;
  padding: 0px;
}

.border {
  border: 1px solid #000;
}

.menu {
  border: transparent;
  width: 183px;
}

.menuItem {
  width: 181px;
}

.footer {
  position: absolute;
  bottom: 0px;
  padding-left: 35px;
}
</style>
