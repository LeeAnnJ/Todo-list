<template>
	<div>
		<p>成功跳转界面！</p>
		<p>{{count}}</p>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				count:0
			}
		},
		mounted() {
			console.log("in jump!");
		}
	}
</script>

<style>
</style>