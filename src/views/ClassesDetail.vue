<template>
    <div>
        <head-top></head-top>
        <div style="margin: 20px 150px 0 40px">
            <div style="height:40px">
                <span style="vertical-align:middle; float:inline-start; font-size:20px">课程详情</span>
            </div>
            <el-row>
                <el-col :span="3">
                    <div class="grid-content">
                        <p class="title">课程名称</p>
                    </div>
                </el-col>
                <el-col :span="21">
                    <div class="grid-content">
                        <p class="content">{{classObj.className}}</p>
                    </div>
                </el-col>
            </el-row>
            
            <el-row>
                <el-col :span="3">
                    <div class="grid-content">
                        <p class="title">课程时间</p>
                    </div>
                </el-col>
                <el-col :span="21">
                    <div class="grid-content">
                        <p class="content">{{classObj.classDate}}</p>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="3">
                    <div class="grid-content">
                        <p class="title">上课地点</p>
                    </div>
                </el-col>
                <el-col :span="21">
                    <div class="grid-content">
                        <p class="content">{{classObj.classPlace}}</p>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="3">
                    <div class="grid-content">
                        <p class="title">课程介绍</p>
                    </div>
                </el-col>
                <el-col :span="21">
                    <div class="grid-content">
                        <p class="content">{{classObj.classIntroduce}}</p>
                    </div>
                </el-col>
            </el-row>
                                   
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
                isStu:false,
            }
        },
        computed:{
            classObj(){
                var obj = {}
                if (this.$route.query.allData) {
                    let formObj = decodeURIComponent(this.$route.query.allData)
                    obj = JSON.parse(formObj)
                    console.log('classObj change!', obj)
                }
                return obj
            }
        },
        methods:{
            
        },
        
    }
</script>

<style>
    .title {
        font-size:17px;
        color: #606266;

    }

    .content {
        font-size: 16px;
        color: black;
    }

.el-row{
    display:flex;
    flex-wrap: wrap;
}

    /* .el-row {
    margin-bottom: 20px;

  } */

  .grid-content {
    min-height: 36px;
    margin-top: 30px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>