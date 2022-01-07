<template>
    <div>
        <head-top></head-top>
        <div style="margin: 20px 150px 0 40px;">
            <p style="font-size:30px">实验辅导：</p>
            <div style="margin: 20px">
                <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item v-for="(item,index) in t_exercise" :key="item.eid" :title="item.title" :name="index">
                    <div>实验时间：{{format("yyyy/MM/dd hh:mm:ss", item.date)}}</div>
                    <div>实验简介：{{item.introduction}}</div>
                    <div>实验文档：{{item.content}}</div>
                </el-collapse-item>
                </el-collapse>                
            </div>
            <el-divider></el-divider>
            <div v-if="this.$globalData.role !== 1">
                <p style="font-size:30px">发布新实验：</p>
                <div style="margin: 20px">
                    <el-form ref="form" :model="T_Exercise" label-width="80px">
                    <el-form-item label="实验标题" prop="title">
                        <el-input v-model="T_Exercise.title" placeholder="请输入实验标题"></el-input>
                    </el-form-item>
                    <el-form-item label="实验时间" prop="date">
                        <div class="block">
                            <el-date-picker
                            v-model="T_Exercise.date"
                            type="datetime"
                            placeholder="选择日期时间"
                            align="right"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="实验文档" prop="content">
                        <el-input v-model="T_Exercise.content" placeholder="请输入实验所需实验文档名"></el-input>
                    </el-form-item>
                    <el-form-item label="实验简介" prop="introduction">
                        <el-input type="textarea" v-model="T_Exercise.introduction" :autosize="{ minRows: 4 }" placeholder="请输入实验简介"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitExercise">发布实验</el-button>
                        <el-button @click="resetForm('T_Exercise')">取消</el-button>
                    </el-form-item>
                    </el-form>                
                </div>
            </div>   
        </div>       
    </div>
</template>

<script>
import headTop from '../components/HeadTop'
export default {
    components: {
        headTop
    },
    data(){
        return {
            activeNames: '0',
            t_exercise:[
                // ————————————连接后端后删除——————————
                {
                    eid:100,
                    title:'操作系统基础实验',
                    introduction:'哲学家就餐问题：五个哲学家共用一张圆桌，分别坐在周围的五张椅子上，在圆桌上有五个碗和五只筷子。筷子是临界资源，哲学家需要对筷子进行互斥访问。',
                    content:'暂无',
                    date:new Date('2021/12/03 10:20:00'),
                    cid:0,
                    tid:0,
                },
                {
                    eid:101,
                    title:'基于Linux的编程实验',
                    introduction:'使用shell编程监测文件大小的变化。',
                    content:'暂无',
                    date:new Date('2021/12/09 10:00:00'),
                    cid:0,
                    tid:0,
                },
                // ————————————————————————————————————
            ],
            T_Exercise:{
                eid:0,
                title:'',
                introduction:'',
                content:'',
                date:null,
            },
            pickerOptions: {
                shortcuts: [{
                text: '今天',
                onClick(picker) {
                picker.$emit('pick', new Date());
                }
            }, {
                text: '明天',
                onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() + 3600 * 1000 * 24);
                picker.$emit('pick', date);
                }
            }, {
                text: '一周后',
                onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
                }
            }]
            },

        }
    },
    methods:{
        handleChange() {
            console.log(this.activeNames);
        },
        format(fmt, date) { 
            var o = {
                "M+": date.getMonth() + 1, //月份 
                "d+": date.getDate(), //日 
                "h+": date.getHours(), //小时 
                "m+": date.getMinutes(), //分 
                "s+": date.getSeconds(), //秒 
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
                "S": date.getMilliseconds() //毫秒 
            }
            if (/(y+)/.test(fmt)) 
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) 
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        
        onSubmitExercise(){
            console.log('新增实验',this.T_Exercise)

            // 检查必要值不能为空
            // !T_Course.hasOwnProperty('name') || !T_Course.hasOwnProperty('introduction')
            if(!this.T_Exercise.hasOwnProperty('title') || !this.T_Exercise.hasOwnProperty('introduction')){
                this.$message.error('添加失败，实验标题和简介不能为空！');
                return
            }

            // ——————————————与后台交互——————————————

            let isSuccess = true
            this.T_Exercise.eid = 2021//从后台接收eid
            // ——————————————————————————————————————
            if (isSuccess) {
                //输出成功信息
                this.$message({
                    message: '添加成功！',
                    type: 'success'
                });
                this.t_exercise.unshift(this.T_Exercise)
                this.T_Exercise = {}
            }
            else {
                this.$message.error('添加失败！');
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
      }
    }
}
</script>

<style>

</style>