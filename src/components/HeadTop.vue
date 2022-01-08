<template>
    <div class="header_container">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown trigger="hover" @command="handleCommand">
			<span class="avator">
				<router-link to="/index">
				<el-avatar :size="35" :src="require('../assets/img/'+this.rolePic+'.png')"></el-avatar>
				</router-link>
			</span>
			<el-dropdown-menu slot="dropdown" v-if="role === 1">
				<el-dropdown-item class="clearfix" command="classInfo">
				新课程提醒
				<el-badge class="mark" :value=this.newClassNum />
				</el-dropdown-item>
				<el-dropdown-item class="clearfix" command="hwRep">
				作业消息
				<el-badge class="item" is-dot />
				</el-dropdown-item>
				<el-dropdown-item class="clearfix" command="mgRep">
				留言板消息
				<el-badge class="mark" :value=this.mgRepNum />
				</el-dropdown-item>
				<el-dropdown-item command="signout">
				退出登录
				</el-dropdown-item>
			</el-dropdown-menu>
			<el-dropdown-menu slot="dropdown" v-else-if="role !==1">
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
			<el-dropdown-menu slot="dropdown" v-else>
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
				newClassNum: 0,
				hwRepNum: 1,	//老师收到的作业被回复
				mgRepNum: 0,    //留言板消息数量
				rolePic: this.$globalData.roleArr[this.$globalData.role],
				role: this.$globalData.role,
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
				}else if(command == 'classInfo') {
					this.$router.push('/classesInfo');
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
