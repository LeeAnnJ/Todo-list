<template>
	<img alt="Vue logo" src="../../assets/logo.png" />
	
  <h1>{{ msg }}</h1>

  <p>
    Welcome:
    <a href="https://hx.dcloud.net.cn/" target="_blank">HBuilderX</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <button type="button" @click="pageJump">点击跳转</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style>
a {
  color: #42b983;
}
</style>

<script>
import { ref } from 'vue'

export default {
	data() {
		return {
			count:ref(0),
		};
	},
	methods: {
		pageJump() {
			console.log("页面跳转：")
			this.$router.push({
				path:"/jump"
			})
		}
	},
};

</script>