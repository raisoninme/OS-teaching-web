<template>
    <div>
        <head-top></head-top>
        <div style="margin: 20px 150px 0 40px;">
            <div style="margin:20px 0 0 0">
                <div style="height:40px">
                    <span style="vertical-align:middle; float:inline-start; font-size:20px">课程列表</span>
                    <span style="vertical-align:middle; float:right">
                        <el-button type="primary" @click="touchAdd" size="mini" v-if="!isStu">添加课程</el-button>
                    </span>
                </div> 
            <el-table
                border
                :data="classesTable"
                style="width: 100%">
                <el-table-column
                    label="课程名称"
                    width="190">
                    <template slot-scope="scope">
                        <!-- <span class="divTest" 
                            style="text-decoration: underline;" 
                            @click="gotoDetail(scope.row)">{{scope.row.className}}</span>  -->
                        <span class="list">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="时间"
                    width="190">
                    <template slot-scope="scope">
                        <span class="list">{{format("yyyy/MM/dd hh:mm:ss", scope.row.date)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="地点"
                    width="190">
                    <template slot-scope="scope">
                        <span class="list">{{scope.row.place}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="发布时间"
                    width="190">
                    <template slot-scope="scope">
                        <span class="list">{{format("yyyy/MM/dd hh:mm:ss", scope.row.classReleaseTime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="249">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="touchEdit(scope.$index, scope.row)"
                        v-if="!isStu">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        plain
                        @click="touchDelete(scope.$index, scope.row)"
                        v-if="!isStu">删除</el-button>
                    <el-button
                        size="mini"
                        @click="gotoDetail(scope.row)">查看</el-button> 
                </template>
                </el-table-column>
            </el-table>

            <el-dialog :title="arr[state]" :visible.sync="ClassFormIsShow" width="50%">
                <el-form :model="classObj" status-icon ref="classObj" label-width="100px">
                    <el-form-item label="课程名称">
                        <el-input v-model="classObj.name"
                            placeholder="请输入课程名称"
                            v-if="state !== 0"></el-input>
                            <p class="list" v-else>{{classObj.name}}</p>
                    </el-form-item>
                    <el-form-item label="上课地点">
                        <el-input v-model="classObj.place" 
                            maxlength="10" show-word-limit
                            placeholder="请输入上课地点"
                            v-if="state !== 0">
                        </el-input>
                        <p class="list" v-else>{{classObj.place}}</p>
                    </el-form-item>
                    <el-form-item label="上课时间" prop="date">
                        <div class="block" v-if="state !== 0">
                            <el-date-picker
                                v-model="classObj.date"
                                type="datetime"
                                placeholder="选择日期时间"
                                value-format="yyyy/MM/dd HH:mm:ss"
                                format="yyyy/MM/dd HH:mm:ss"
                                align="right"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                        <p class="list" v-else>{{format("yyyy/MM/dd hh:mm:ss", classObj.date)}}</p>
                    </el-form-item>
                    <el-form-item label="课程介绍">
                        <el-input v-model="classObj.introduction" 
                            type="textarea"
                            :autosize="{ minRows: 4 }"
                            placeholder="请输入课程介绍"
                            v-if="state !== 0">
                        </el-input>
                        <p class="list" style="margin-right: 50px;" v-else>{{classObj.introduction}}</p>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="ClassFormIsShow = false; isAdd = true; clear()">{{state === 0 ? '关 闭' : '取 消'}}</el-button>
                    <el-button type="primary" 
                        @click="submitClassInfo(classObj)"
                        v-if="state !== 0">提 交</el-button>
                </div>
            </el-dialog>

            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
            <span>确认删除课程{{classObj.name}}吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false; clear()">取 消</el-button>
                <el-button
                    type="danger"
                    plain
                    @click="handleDelete()"
                    v-if="!isStu">删 除</el-button>
            </span>
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
                dialogVisible: false,
                state:0,
                index:-1,
                arr:['课程详情','编辑课程','添加课程'],
                classesTable: [{
                    // ————————————连接后端后删除————————————————
                    cid:1,
                    name:'U11.内存',
                    date:new Date('2021/11/28 10:20:00'),
                    place:'二教201',
                    classReleaseTime:new Date('2021/11/25 10:20:00'),
                    introduction:'这里是U11的课程介绍',
                    hour:0,
                    photo:'',
                    video:'',
                }, {
                    cid:2,
                    name:'U12.磁盘',
                    date:new Date('2021/12/01 10:20:00'),
                    place:'二教201',
                    classReleaseTime:new Date('2021/11/28 10:20:00'),
                    introduction:'这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍',
                    hour:0,
                    photo:'',
                    video:'',
                    // ——————————————————————————————————————————
                }],
                classObj:{
                    cid:0,
                    name:'',
                    date:'',
                    place:'',
                    classReleaseTime:'',
                    introduction:'',
                    hour:0,
                    photo:'',
                    video:'',
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
            clear(){
                this.state = 0
                this.classObj = {}
                this.index = -1
            },
            gotoDetail(classObj){
                // console.log('gotodetail', classObj)
                // // this.$router.push('/classesDetail')
                // let objData = JSON.stringify(classObj)
                // this.$router.push({
                //     path: './classesDetail',
                //     query:{allData: encodeURIComponent(objData)}
                // })
                this.ClassFormIsShow = true
                this.classObj = classObj
            },
            format(fmt, date) { 
                date = new Date(date)
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
            //添加课程
            addClassInfo(classObj){
                classObj.classReleaseTime = this.format("yyyy/MM/dd hh:mm:ss", new Date())
                //—————————————— 与后台交互——————————————
                classObj.cid = 3
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
                this.clear()
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
                this.clear()
            },
            //删除课程
            handleDelete(){
                this.dialogVisible = false
                console.log('第' + this.index + '个课程将被删除')
                console.log(this.classObj)

                //—————————————— 与后台交互——————————————

                let isSuccess = true
                // ————————————————————————————————————
                if (isSuccess) {
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.classesTable.splice(this.index,1)
                }
                else {
                    this.$message.error('删除失败！');
                }
                this.clear()

            },
            submitClassInfo(classObj){
                if (this.state === 2) {this.addClassInfo(classObj)}
                else{this.editClassInfo(classObj)}
            },
            touchAdd(){
                this.clear()
                this.state = 2
                this.ClassFormIsShow = true
            },
            touchEdit(index, classObj){
                this.state = 1
                this.ClassFormIsShow = true
                this.classObj = classObj
                this.index = index
            },
            touchDelete(index, classObj){
                this.dialogVisible = true
                this.index = index
                this.classObj = classObj
            }
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