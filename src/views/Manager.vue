<template>
    <div>
        <head-top></head-top>
        <div style="margin: 20px 150px 0 40px">
            <div style="margin:20px 0 0 0">
                <div style="height:40px">
                    <span style="vertical-align:middle; float:inline-start; font-size:20px">学生管理</span>
                </div> 
            <el-table
                border
                :data="t_student"
                style="width: 100%">
                <el-table-column
                    label="序号"
                    width="60%">
                    <template slot-scope="scope">
                        <span class="list">{{scope.row.sid}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="学生姓名"
                    width="80%">
                    <template slot-scope="scope">
                        <span class="list">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="性别"
                    width="60%">
                    <template slot-scope="scope">
                        <span class="list">{{scope.row.gender === 0 ? '女' : '男'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="联系方式"
                    >
                    <template slot-scope="scope">
                        <span class="list">{{scope.row.phone}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="邮箱"
                    >
                    <template slot-scope="scope">
                        <span class="list">{{scope.row.email}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        plain
                        @click="touchDelete(scope.$index, scope.row)"
                        v-if="!isStu">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            </div> 
        </div>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
        <span>确认删除学生{{studentObj.name}}吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false; studentObj = {};">取 消</el-button>
            <el-button
                type="danger"
                plain
                @click="stuDelete()"
                v-if="!isStu">删 除</el-button>
        </span>
        </el-dialog>       
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
            dialogVisible:false,
            index: -1,
            t_student:[
                {
                    sid:1,
                    name:'林伊菡',
                    password:'',
                    phone:'13333333333',
                    email:'1234567@gmail.com',
                    gender:0,
                    avatar:'',
                    read_count:0,
                    tid:0
                },
                {
                    sid:2,
                    name:'真可爱',
                    password:'',
                    phone:'13411111111',
                    email:'7654321@gmail.com',
                    gender:1,
                    avatar:'',
                    read_count:0,
                    tid:0
                }
            ],
            studentObj:{}
        }
    },
    methods:{
        clear(){
            this.index = -1
            this.studentObj = {}
        },
        stuDelete(){
            this.dialogVisible = false
            console.log('即将删除学生', this.studentObj)
            // ——————————————与后台交互——————————————

            let isSuccess = true
            // ————————————————————————————————————
            if (isSuccess) {
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                });
                this.t_student.splice(this.index,1)
                this.clear()
            }
            else {
                this.$message.error('删除失败！');
            }
            this.studentObj = {}
        },
        touchDelete(index, studentObj){
            this.dialogVisible = true
            this.index = index
            this.studentObj = studentObj
        }
    }
}
</script>

<style>
.list {
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        color: #606266;
        font-size: 14px;
    }
</style>