<template>
    <div class="header_container">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown trigger="hover" @command="handleCommand">
			<span class="avator">
				<router-link to="/index">
				<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
				</router-link>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item class="clearfix" command="hwRep">
				作业消息
				<el-badge class="mark" :value=this.hwRepNum />
				</el-dropdown-item>
				<el-dropdown-item class="clearfix" command="mgRep">
				留言板消息
				<el-badge class="mark" :value=this.mgRepNum />
				</el-dropdown-item>
				<el-dropdown-item command="signout">
				退出登录
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
	// import {signout} from '@/api/getData'
	// import {mapActions, mapState} from 'vuex'

    export default {
    	data(){
     		return {
				hwRepNum: 0,
				mgRepNum: 1,
    		}
    	},
    	// created(){
    	// 	if (!this.adminInfo.id) {
    	// 		this.getAdminData()
    	// 	}
    	// },
    	// computed: {
    	// 	...mapState(['adminInfo']),
    	// },
		methods: {
			handleCommand(command) {
				if (command == 'hwRep') {
					this.$router.push('/homeworkBoard');
				}else if(command == 'signout'){
					// const res = await signout()
					// if (res.status == 1) {
					// 	this.$message({
	                //         type: 'success',
	                //         message: '退出成功'
	                //     });
	                //     this.$router.push('/');
					// }else{
					// 	this.$message({
	                //         type: 'error',
	                //         message: res.message
	                //     });
					// }
					this.$message({
						type: 'success',
						message: '退出成功'
					});
					this.$router.push('/login')
				}else if(command == 'mgRep') {
					this.$router.push('/massageBoard');
				}
			},
		}
    }
</script>

<style lang="less">
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		margin-right: 37px;
	}
</style>
