<template>
    <div>
        <head-top></head-top>   
        <div style="margin: 20px 150px 0 40px">
            <!-- 作业列表 -->
            <p style="font-size:30px">已发布的作业：</p>
            <div style="margin: 20px">
                <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item v-for="(item,index) in allhw" :key="index" :title="item.title" :name="index">
                    <div>作业说明：{{item.content}}</div>
                    <div>发布时间：{{item.pubtime}}</div>
                    <div>截至时间：{{item.ddl}}</div>
                </el-collapse-item>
                </el-collapse>                
            </div>
            <el-divider></el-divider>
            <div v-if="this.role==='老师'">
                <p style="font-size:30px">发布新作业：</p>
                <div style="margin: 20px">
                    <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="作业标题" prop="title">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="截止时间" prop="ddl">
                        <div class="block">
                            <el-date-picker
                            v-model="form.ddl"
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="yyyy/MM/dd HH:mm:ss"
                            format="yyyy/MM/dd HH:mm:ss"
                            align="right"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="作业内容" prop="content">
                        <el-input type="textarea" v-model="form.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">发布作业</el-button>
                        <el-button @click="resetForm('form')">取消</el-button>
                    </el-form-item>
                    </el-form>                
                </div>
            </div>
        </div>    
    </div>
</template>

<script>
import headTop from '../../components/HeadTop'
export default {
    components: {
        headTop
    },
    data() {
        return {
            role: this.$globalData.roleArr[this.$globalData.role],
            activeNames: '0',
            // 从后台拉取
            allhw: [
                {
                    title:"进程调度作业1",
                    content:"书中的P12-13",
                    pubtime:"2021/11/28 21:02:10",
                    ddl:"2021/11/30 23:59:59"
                },
                {
                    title:"进程调度作业2",
                    content:"书中课后习题P22-23",
                    pubtime:"2021/11/28 20:03:20",
                    ddl:"2021/12/30 23:59:59"
                },
            ],
            form: {
                title: '',
                ddl:'',
                content: ''
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
    methods: {
      handleChange() {
          console.log("查看作业");
      },
      onSubmit() {
        var mytime=(new Date()).toLocaleString('chinese',{hour12:false}); 
        this.allhw.unshift({title:this.form.title,content:this.form.content,pubtime:mytime,ddl:this.form.ddl});
        this.resetForm('form');
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style>
.el-collapse-item__header {
    font-size: 14px;
}
</style>