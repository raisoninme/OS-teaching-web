<template>
    <div>
        <head-top></head-top>
        <div style="margin: 20px 150px 0 40px;">
            <div style="margin:20px 0 0 0">
                <div style="height:40px">
                    <span style="vertical-align:middle; float:inline-start; font-size:20px">课程列表</span>
                    <span style="vertical-align:middle; float:right">
                        <el-button type="primary" @click="touchAdd" size="mini" v-if="role !== 1">添加课程</el-button>
                    </span>
                </div> 
            <el-table
                border
                :data="t_course"
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
                        <span class="list">{{scope.row.place === null ? '暂未确定' : scope.row.place}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="发布时间"
                    width="190">
                    <template slot-scope="scope">
                        <span class="list">{{format("yyyy/MM/dd hh:mm:ss", scope.row.subtime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="249">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="touchEdit(scope.$index, scope.row)"
                        v-if="role !== 1">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        plain
                        @click="touchDelete(scope.$index, scope.row)"
                        v-if="role !== 1">删除</el-button>
                    <el-button
                        size="mini"
                        @click="gotoDetail(scope.row)">查看</el-button> 
                </template>
                </el-table-column>
            </el-table>

            <el-dialog :title="arr[state]" :visible.sync="ClassFormIsShow" width="50%">
                <el-form :model="T_Course" status-icon ref="T_Course" label-width="100px">
                    <el-form-item label="课程名称">
                        <el-input v-model="T_Course.name"
                            placeholder="请输入课程名称"
                            v-if="state !== 0"></el-input>
                            <p class="list" v-else>{{T_Course.name}}</p>
                    </el-form-item>
                    <el-form-item label="上课地点">
                        <el-input v-model="T_Course.place" 
                            maxlength="10" show-word-limit
                            placeholder="请输入上课地点"
                            v-if="state !== 0">
                        </el-input>
                        <p class="list" v-else>{{T_Course.place}}</p>
                    </el-form-item>
                    <el-form-item label="上课时间" prop="date">
                        <div class="block" v-if="state !== 0">
                            <el-date-picker
                                v-model="T_Course.date"
                                type="datetime"
                                placeholder="选择日期时间"
                                value-format="yyyy/MM/dd HH:mm:ss"
                                format="yyyy/MM/dd HH:mm:ss"
                                align="right"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                        <p class="list" v-else>{{format("yyyy/MM/dd hh:mm:ss", T_Course.date)}}</p>
                    </el-form-item>
                    <el-form-item label="课程介绍">
                        <el-input v-model="T_Course.introduction" 
                            type="textarea"
                            :autosize="{ minRows: 4 }"
                            placeholder="请输入课程介绍"
                            v-if="state !== 0">
                        </el-input>
                        <p class="list" style="margin-right: 50px;" v-else>{{T_Course.introduction}}</p>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="ClassFormIsShow = false; isAdd = true; clear()">{{state === 0 ? '关 闭' : '取 消'}}</el-button>
                    <el-button type="primary" 
                        @click="submitClassInfo(T_Course)"
                        v-if="state !== 0">提 交</el-button>
                </div>
            </el-dialog>

            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
            <span>确认删除课程{{T_Course.name}}吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false; clear()">取 消</el-button>
                <el-button
                    type="danger"
                    plain
                    @click="handleDelete()"
                    v-if="role !== 1">删 除</el-button>
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
                role: this.$globalData.role,
                ClassFormIsShow: false,
                dialogVisible: false,
                state:0,
                index:-1,
                arr:['课程详情','编辑课程','添加课程'],
                t_course: [
                    // {
                    //     cid:1,
                    //     name:'U11.内存',
                    //     date:new Date('2021/11/28 10:20:00'),
                    //     place:'二教201',
                    //     // classReleaseTime:new Date('2021/11/25 10:20:00'),
                    //     subtime: new Date('2021/11/25 10:20:00'),
                    //     introduction:'这里是U11的课程介绍',
                    //     hour:0,
                    //     photo:'',
                    //     video:'',
                    // }, 
                    // {
                    //     cid:2,
                    //     name:'U12.磁盘',
                    //     date:new Date('2022/01/14 11:30:49'),
                    //     place:'二教103',
                    //     // classReleaseTime:new Date('2021/11/28 10:20:00'),
                    //     subtime: new Date('2022/01/07 11:31:12'),
                    //     introduction:'这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍这里是U12的课程介绍',
                    //     hour:0,
                    //     photo:'',
                    //     video:'',
                    // }
                ],
                T_Course:{
                    cid:0,
                    name:'',
                    date: null,
                    place:'',
                    subtime:'',
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
                this.T_Course = {}
                this.index = -1
            },
            gotoDetail(T_Course){
                // console.log('gotodetail', T_Course)
                // // this.$router.push('/classesDetail')
                // let objData = JSON.stringify(T_Course)
                // this.$router.push({
                //     path: './classesDetail',
                //     query:{allData: encodeURIComponent(objData)}
                // })
                this.ClassFormIsShow = true
                this.T_Course = T_Course
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
            async addClassInfo(T_Course){

                // 检查是否为空
                if(!T_Course.hasOwnProperty('name') || !T_Course.hasOwnProperty('introduction')) {
                    this.$message.error('课程名称和简介不能为空');
                    console.log('空', T_Course)
                    return
                }
                // T_Course.subtime = this.format("yyyy/MM/dd hh:mm:ss", new Date())
                T_Course.subtime = new Date()
                T_Course.date = new Date(T_Course.date)
                T_Course.cid = null
                T_Course.photo = ''
                T_Course.video = ''
                T_Course.homework = ''
                T_Course.appendix = ''
                T_Course.tid = 0
                
                //—————————————— 与后台交互——————————————
                // T_Course.cid = 3
                console.log('正在添加课程', T_Course)

                try {
                    const res = await this.$api.course.courseSave(this.T_Course);
                    if(res.code !== 200 || res.msg !== 'success'){
                        console.log('添加课程失败')
                    }
                    else{
                        //输出成功信息
                        // this.$message({
                        //     message: '添加成功！',
                        //     type: 'success'
                        // });
                        // this.t_course.push(T_Course)
                    }
                } catch (error) {
                    console.log('访问出错，请检查服务器')
                    // this.$message.error('添加失败！');
                } finally {
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                    this.t_course.push(T_Course)

                    this.ClassFormIsShow = false
                    this.clear()
                }

                // ————————————————————————————————————
                
                // if (isSuccess) {
                //     //输出成功信息
                //     this.$message({
                //         message: '添加成功！',
                //         type: 'success'
                //     });
                //     this.t_course.push(T_Course)
                //     this.ClassFormIsShow = false
                // }
                // else {
                //     //输出失败信息
                //     this.$message.error('添加失败！');
                // }
                // this.clear()
            },
            //编辑课程
            editClassInfo(T_Course){
                console.log('编辑完的课程信息',T_Course)

                // ————————————与后台交互，编辑课程————————————

                let isSuccess = true //接收后台返回数据
                // —————————————————————————————————————————
                if (isSuccess) {
                    //输出成功信息
                    this.$message({
                        message: '编辑成功！',
                        type: 'success'
                    });
                    this.t_course[this.index] = T_Course
                    console.log('编辑完成', this.t_course)
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
                console.log(this.T_Course)

                //—————————————— 与后台交互——————————————

                let isSuccess = true
                // ————————————————————————————————————
                if (isSuccess) {
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.t_course.splice(this.index,1)
                }
                else {
                    this.$message.error('删除失败！');
                }
                this.clear()

            },
            submitClassInfo(T_Course){
                if (this.state === 2) {this.addClassInfo(T_Course)}
                else{this.editClassInfo(T_Course)}
            },
            touchAdd(){
                this.clear()
                this.state = 2
                this.ClassFormIsShow = true
            },
            touchEdit(index, T_Course){
                this.state = 1
                this.ClassFormIsShow = true
                this.T_Course = T_Course
                this.index = index
            },
            touchDelete(index, T_Course){
                this.dialogVisible = true
                this.index = index
                this.T_Course = T_Course
            },
            async courseFindAll(){
                try {
                    const res = await this.$api.course.courseFindAll()
                    if(res.code !== 200 || res.msg !== 'success'){
                        console.log('加载课程列表失败')
                    }
                    else{
                        console.log('加载课程列表成功')
                        this.t_course.push.apply(this.t_course, res.data)
                        console.log('加载后的学生列表', this.t_course)
                }
                } catch (error) {
                    console.log('访问出错，请检查服务器')
                }
                
        },
        },
        mounted() {
            // ——————————从后端拉取课程列表信息——————————————
            this.courseFindAll()
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