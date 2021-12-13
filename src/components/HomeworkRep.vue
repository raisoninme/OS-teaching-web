<template>
    <div style="margin: 10px 40px">
        <div class="to_do">
            <el-badge :value=newmsg class="item">
                <p style="font-size:20px">待回复</p>
            </el-badge>
            <div class="msgList" v-for="(msg,index) in msgList" :key=index> 
                <div style="margin-bottom: 10px;color:#409EFF;font-weight:bold">
                    <span>{{msg.name}}</span>
                    <span v-if="msg.type=='askques'">&nbsp;向您提出问题:</span> 
                    <span v-else>&nbsp;回复了您</span> 
                </div>
                <p style="color:#606266">{{msg.content | ellipsis}}</p>
                <el-link type="primary" @click="checkAndRep(msg)">点击查看详情并回复</el-link>
                <el-divider></el-divider>
            </div>            
        </div>
        <div class="history">
            <el-link type="primary" @click="searchHistory">点击查看历史回复</el-link>
        </div>
        <el-drawer
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        size='40%'>
        <div class="newques" v-if="this.checked.type=='askques'" style="font-size:20px; margin:20px">
            <span>{{checked.name}}</span>
            <span>&nbsp;向您提出问题:</span> 
            <p style="color:#606266">{{checked.content}}</p>
            <div class="reinput">
                <el-input type="textarea" :rows="2" v-model="reparea_1" placeholder="回复此条问题"></el-input> 
                <el-button type="primary" @click="submitRep_1" size="mini" style="margin-top:5px">回复</el-button>
            </div>
        </div>
        <div class="rep" v-else style="font-size:20px; margin:20px">
            <!-- 之前的消息记录展示 -->
            <span>{{checked.name}}</span>
            <span>&nbsp;回复了您:</span> 
            <p style="color:#606266">{{checked.content}}</p>
            <div class="reinput">
                <el-input type="textarea" :rows="2" v-model="reparea_2" placeholder="回复此条问题"></el-input> 
                <el-button type="primary" @click="submitRep_2" size="mini" style="margin-top:5px">回复</el-button>
            </div>
        </div>

        </el-drawer>
        <!-- <div class="done">
            <p style="font-size:20px">已解决</p> -->
            <!-- 避免回复过多加载时间，采用直接搜索学生名字后出现历史记录的方式查看 -->
            <!-- <p>通过搜索在此作业下提问过的同学的姓名查询相关记录:</p>
            <el-input>
               <i slot="prefix" class="el-input__icon el-icon-search"></i> 
            </el-input>
            <div class="history"></div>
        </div> --> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            checked:{},
            direction:'rtl',
            drawer:false,
            //从后端拉取数据
            newmsg:'2',
            msgList:[{
                content:'不会做作业aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                name:'Sherry',
                type:'askques'
            },{
                content:'真的不会做啊',
                name:'Sherry',
                type:'reply',
            }],
            reparea_1:'',
            reparea_2:''
        }
    },
    filters:{
        ellipsis(value){
          if (!value) return '';
          if (value.length > 20) {
            return value.slice(0,10) + '...'
          }
          return value
        }
    },
    methods: {
        checkAndRep(msg){
            this.drawer=true;
            this.checked=msg;
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        },
        submitRep_1(){
            if(this.reparea_1=='' || this.reparea_1.replace(/(^\s*)|(\s*$)/g, "")==""){
                this.$message({
                    message: '回复不能为空',
                    type: 'warning'
                    });
            }
            else{
                //将reparea的回复交给后端，并关闭抽屉
                this.$message({
                    message: '已成功回复，您可在历史回复中查找相应记录!',
                    type: 'success'
                    });
                this.drawer=false;
            }  
        },
        submitRep_2(){
            if(this.reparea_2=='' || this.reparea_2.replace(/(^\s*)|(\s*$)/g, "")==""){
                this.$message({
                    message: '回复不能为空',
                    type: 'warning'
                    });
            }
            else{
                //将reparea的回复交给后端，并关闭抽屉
                this.$message({
                    message: '已成功回复，您可在历史回复中查找相应记录!',
                    type: 'success'
                    });
                this.drawer=false;
            } 
        },
        searchHistory(){

        }

    }
}
</script>

<style scoped>
.el-divider--horizontal{
     margin: 5px;
     background: 0 0;
     border-top: 1px dashed #9f9fa0;
 } 
</style>