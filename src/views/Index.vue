<template>
	<div class="Index" style="height: 100%;">
		<el-row style="height: 100%;">
	  		<el-col :span="4" class="col">
				<el-menu :default-active="defaultActive" 
				style="height: 100%;border-right:0px" 
				text-color="#bfcbd9"
				background-color="#324057"
				router
				unique-opened
				>
					<el-menu-item index="index">
						<i class="el-icon-s-management"></i>首页
					</el-menu-item>
					<el-menu-item index="classesInfo">
						<i class="el-icon-document"></i>课程信息
					</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-reading"></i>作业辅导</template>
                        <el-menu-item index="homeworkInfo">作业信息</el-menu-item>
                        <el-menu-item index="homeworkBoard">师生交流</el-menu-item>
					</el-submenu>
					<el-menu-item index="experiment">
						<i class="el-icon-data-analysis"></i>实验辅导
					</el-menu-item>
					<el-menu-item index="massageBoard">
						<i class="el-icon-chat-dot-round"></i>留言板
					</el-menu-item>
					<el-menu-item index="Map">
						<i class="el-icon-guide"></i>知识图谱
					</el-menu-item>
					<el-menu-item index="manager" v-if="this.role=='管理员'">
						<i class="el-icon-s-tools"></i>管理员页面
					</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
        name: 'Index',
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
		data(){
			return {
				role: this.$globalData.roleArr[this.$globalData.role],
			}
		}
    }
</script>

<style scoped>
.col {
	background-color: #324057;
	min-height: 100%;

}
</style>