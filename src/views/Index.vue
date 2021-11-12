<template>
	<div class="Index">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>欢迎</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>课程信息</template>
						<el-menu-item index="shopList">教学大纲</el-menu-item>
						<el-menu-item index="foodList">学习进度</el-menu-item>
						<el-menu-item index="orderList">考试安排</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>作业辅导</template>
                        <el-menu-item index="visitor">作业总览</el-menu-item>
                        <el-menu-item index="visitor">师生交流</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>实验辅导</template>
						<el-menu-item index="visitor">实验简介</el-menu-item>
                        <el-menu-item index="visitor">实验说明</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-edit"></i>留言板</template>
                        <el-menu-item index="visitor">实验说明</el-menu-item>
					</el-submenu>
					<el-submenu index="7">
						<template slot="title"><i class="el-icon-warning"></i>说明</template>
						<el-menu-item index="explain">说明</el-menu-item>
					</el-submenu>
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
		// computed: {
		// 	defaultActive: function(){
		// 		return this.$route.path.replace('/', '');
		// 	}
		// },
    }
</script>


<style lang="less" scoped>
	// @import '../style/mixin';
	// .manage_page{
		
	// }
</style>