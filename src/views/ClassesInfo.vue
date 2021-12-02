<template>
    <div>
        <head-top></head-top>
        <div style="margin: 20px 150px 0 40px;">
            <div style="margin:20px 0 0 0">
                <div style="height:40px">
                    <span style="vertical-align:middle; float:inline-start; font-size:20px">课程列表</span>
                    <span style="vertical-align:middle; float:right">
                        <el-button type="primary" @click="classObj = {}; 
                        ClassFormIsShow = true" size="mini" v-if="!isStu">添加课程</el-button>
                    </span>
                </div> 
            <el-table
                border
                :data="classesTable"
                style="width: 100%">
                <el-table-column
                    label="课程名称"
                    width="200">
                    <template slot-scope="scope">
                        <span class="divTest" 
                            style="text-decoration: underline;" 
                            @click="gotoDetail(scope.row)">{{scope.row.className}}</span> 
                    </template>
                </el-table-column>
                <el-table-column
                    label="时间"
                    width="200">
                    <template slot-scope="scope">
                        <span class="list">{{scope.row.classDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="地点"
                    width="200">
                    <template slot-scope="scope">
                        <span class="list">{{scope.row.classPlace}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="发布时间"
                    width="200">
                    <template slot-scope="scope">
                        <span class="list">{{scope.row.classReleaseTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="touchEdit(scope.$index, scope.row)"
                        v-if="!isStu">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        plain
                        @click="handleDelete(scope.$index, scope.row)"
                        v-if="!isStu">删除</el-button>
                    <el-button
                        size="mini"
                        @click="gotoDetail(scope.row)"
                        v-else>查看</el-button> 
                </template>
                </el-table-column>
            </el-table>

            <el-dialog title="添加课程" :visible.sync="ClassFormIsShow" width="80%">
                <el-form :model="classObj" status-icon ref="classObj" label-width="100px">
                    <el-form-item label="课程名称">
                        <el-input v-model="classObj.className"
                            placeholder="请输入课程名称"></el-input>
                    </el-form-item>
                    <el-form-item label="上课地点">
                        <el-input v-model="classObj.classPlace" 
                            maxlength="10" show-word-limit
                            placeholder="请输入上课地点">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="上课时间" prop="classDate">
                        <div class="block">
                            <el-date-picker
                                v-model="classObj.classDate"
                                type="datetime"
                                placeholder="选择日期时间"
                                value-format="yyyy/MM/dd HH:mm:ss"
                                format="yyyy/MM/dd HH:mm:ss"
                                align="right"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="课程介绍">
                        <el-input v-model="classObj.classIntroduce" 
                            type="textarea"
                            :autosize="{ minRows: 4 }"
                            placeholder="请输入课程介绍">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="ClassFormIsShow = false">取 消</el-button>
                    <el-button type="primary" @click="submitClassInfo(classObj)">提 交</el-button>
                </div>
            </el-dialog>
            </div>    
        </div>       
    </div>
</template>

<script>
    import headTop from '../components/HeadTop'
    export default {
        data(){
            return{
                isStu:false,
                ClassFormIsShow: false,
                isAdd: true,
                classesTable: [{
                    // ————————————连接后端后删除————————————————
                    classID:'001',
                    className:'U11.内存',
                    classDate:'2021/11/28 10:20:00',
                    classPlace:'二教201',
                    classReleaseTime:'2021/11/25 10:20:00',
                    classIntroduce:'这里是U11的课程介绍'
                }, {
                    classID:'002',
                    className:'U12.磁盘',
                    classDate:'2021/12/01 10:20:00',
                    classPlace:'二教201',
                    classReleaseTime:'2021/11/28 10:20:00',
                    classIntroduce:'这里是U12的课程介绍'
                    // ——————————————————————————————————————————
                }],
                classObj:{
                    classID:'',
                    className:'',
                    classDate:'',
                    classPlace:'',
                    classReleaseTime:'',
                    classIntroduce:''
                },
                pickerOptions: {
                    shortcuts: [{
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
        components: {
            headTop
        },
        methods: {
            gotoDetail(classObj){
                console.log('gotodetail', classObj)
                // this.$router.push('/classesDetail')
                let objData = JSON.stringify(classObj)
                this.$router.push({
                    path: './classesDetail',
                    query:{allData: encodeURIComponent(objData)}
                })
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
                console.log(o)
                if (/(y+)/.test(fmt)) 
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) 
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            },
            //添加课程
            addClassInfo(classObj){
                classObj.classReleaseTime = this.format("yyyy/MM/dd hh:mm:ss", new Date())
                //—————————————— 与后台交互——————————————
                classObj.classID = '003'
                console.log('添加课程', classObj)


                let isSuccess = true //接收后台返回结果
                // ————————————————————————————————————
                
                if (isSuccess) {
                    //输出成功信息
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                    this.classesTable.push(classObj)
                    this.ClassFormIsShow = false
                }
                else {
                    //输出失败信息
                    this.$message.error('添加失败！');
                }
            },
            //编辑课程
            editClassInfo(classObj){
                console.log('编辑完的课程信息',classObj)

                // ————————————与后台交互，编辑课程————————————

                let isSuccess = true //接收后台返回数据
                // —————————————————————————————————————————
                if (isSuccess) {
                    //输出成功信息
                    this.$message({
                        message: '编辑成功！',
                        type: 'success'
                    });
                    this.classesTable[this.index] = classObj
                    console.log('编辑完成', this.classesTable)
                    this.ClassFormIsShow = false
                }
                else {
                    //输出失败信息
                    this.$message.error('添加失败！');
                }
                this.isAdd = true
            },
            submitClassInfo(classObj){
                if (this.isAdd) {this.addClassInfo(classObj)}
                else{this.editClassInfo(classObj)}
            },
            touchEdit(index, classObj){
                this.isAdd = false
                this.ClassFormIsShow = true
                this.classObj = classObj
                this.index = index
            },
            //删除课程
            handleDelete(index, classObj){
                console.log('第' + index + '个课程将被删除')
                console.log(classObj)

                //—————————————— 与后台交互——————————————

                let isSuccess = true
                // ————————————————————————————————————
                if (isSuccess) {
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.classesTable.splice(index,1)
                }
                else {
                    this.$message.error('删除失败！');
                }

            },
            
        },
        mounted() {
            // ——————————从后端拉取课程列表信息——————————————

            // ——————————————————————————————————————————
        },
    }
</script>

<style>
    .link {
        color: #606266;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        font-size: 14px;
        text-decoration: underline;
    }

    .list {
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        color: #606266;
        font-size: 14px;
    }

    .divTest:hover{
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        font-size: 14px;
        color: #6495ED;
    }
</style>