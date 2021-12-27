<template>
    <div style="margin: 10px 40px">
        <el-switch
        style="display: block"
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="已回复"
        inactive-text="待回复">
        </el-switch>
        <div style="margin-top:20px" v-show="!this.value">
            <el-badge :value=newmsg class="item">
                <p style="font-size:20px">待回复</p>
            </el-badge>
            <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item v-for="(msg,index) in msgList" :key=index :name=index @click="getHistory(msg)">
                <template slot="title">
                    <span>{{msg.name}}</span>
                    <span v-if="msg.type=='askques'">&nbsp;向您提出问题:</span> 
                    <span v-else>&nbsp;回复了您:</span> 
                    <span style="color:#777;">&nbsp;&nbsp;&nbsp;{{msg.content | ellipsis}}</span>
                </template>
                <div class="historyList"  v-for="(item,index) in historyList" :key="index">
                <div>
                    <p style="color: #303133b3;font-weight:bold">原提问:</p>
                    <p style="color:#606266">{{item.content}}</p>
                    <span class="time">{{item.time}}</span>
                    <div><el-link type="primary" @click="reply(item.name,'同学')">回复</el-link></div>
                </div>
                <el-divider></el-divider>
                <div class="reblock" v-for="(re,index) in item.relist" :key="index">
                    <div class="replyinfo">
                        <span>{{re.name}}({{re.role}})</span>
                        <span>&nbsp;回复&nbsp;</span> 
                        <span>{{re.repto}}:</span>
                    </div>
                    <p style="color:#606266">{{re.content}}</p>
                    <span class="time">{{re.time}}</span>
                    <div><el-link type="primary" @click="reply(re.name,re.role)" v-if="re.name!=usrname">回复</el-link></div>
                    <el-divider></el-divider>
                </div>  
                <div class="reinput" v-show="item.relist.length!=0">
                    <el-input type="textarea" :rows="2" v-model="reparea" :placeholder="repinfo"></el-input> 
                    <el-button type="primary" @click="submitRep" size="mini" style="margin-top:5px">回复</el-button>
                </div>
                </div> 
            </el-collapse-item>
            </el-collapse>
        </div>
        <div style="margin-top:20px" v-show="this.value">
            <p style="font-size:20px; margin-top:20px">查看历史记录</p>
            <find-history></find-history>
        </div>
    </div>
</template>

<script>
import findHistory from '../components/FindHistory'
import FindHistory from './FindHistory.vue';
export default {
  components: { FindHistory },
    component: {
        findHistory
    },
    data() {
        return {
            value: false,
            usrname:this.$globalData.usrname,
            activeNames: ['1'],
            reparea:'',
            repinfo:'回复:',
            //以下数据均从后端拉取数据
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
            //点击折叠面板后，从后端拉取
            historyList: [{
                content:"不会做作业",
                name:'Sherry',
                time: '2021/11/28 11:35:30',//原提问
                relist:[{
                    name:'陈佳',
                    role:'老师',
                    repto:'Sherry',
                    content: '这你都不会？？',
                    time: '2021/11/28 12:35:30',
                },{
                    name:'陈佳',
                    role:'老师',
                    repto:'Sherry',
                    content:'明天上课收拾你',
                    time: '2021/11/28 15:35:30',
                },
                {
                    name:'Sherry',
                    role:'同学',
                    repto:'陈佳',
                    content:'我错了老师',
                    time: '2021/11/28 18:35:30',
                }],
            }],
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
        reply(name,role){
            this.repinfo="回复 "+name+"("+role+"):"
        },
        handleChange(val) {
            console.log(val);
        },
        submitRep(){
            if(this.reparea=='' || this.reparea.replace(/(^\s*)|(\s*$)/g, "")==""){
                this.$message({
                    message: '回复不能为空',
                    type: 'warning'
                    });
            }
            else{
                //将reparea的提问content交给后端，并刷新当前页面，便于从后端抓取显示已提交的回复
                this.$message({
                    message: '已成功回复!',
                    type: 'success'
                    });
            } 
        },
        getHistory(msg){
            //const res = await this.$api.hwRep.getHistoryForSingle(msg);
            console.log(msg);
        },
    }
}
</script>

<style scoped>
.el-divider--horizontal{
     margin: 5px;
     background: 0 0;
     border-top: 1px dashed #9f9fa0;
 } 
.reblock {
    margin-left:30px;
}
.historyList p {
    margin-bottom: 2px;
}
.time {
    font-size:4px;
    font-style:italic;
    color:#606266;
}
.replyinfo {
    margin-bottom: 4px;
    color: #303133b3;
    font-weight:bold;
    font-size:13px;
}
</style>