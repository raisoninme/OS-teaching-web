<template>
    <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item v-for="(msg,index) in msgList" :key=index :name=index @click="getHistory(msg)">
        <template slot="title">
            <span>{{msg.name}}</span>
            <span>&nbsp;的提问:</span> 
            <span style="color:#777;">&nbsp;&nbsp;&nbsp;{{msg.content | ellipsis}}</span>
        </template>
        <div class="historyList"  v-for="(item,Index) in historyList" :key="Index">
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
        <div class="reinput" v-if="repinfo!='回复:'">
            <el-input type="textarea" :rows="2" v-model="reparea" :placeholder="repinfo"></el-input> 
            <el-button type="primary" @click="submitRep(Index)" size="mini" style="margin-top:5px">回复</el-button>
        </div>
        </div> 
    </el-collapse-item>
    </el-collapse>
</template>

<script>
export default {
    data() {
        return {
            usrname:this.$globalData.usrname,
            activeNames: ['1'],
            reparea:'',
            repinfo:'回复:',
            //以下数据均从后端拉取数据
            msgList:[{
                content:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                name:'sherry',
            }],
            //点击折叠面板后，从后端拉取
            historyList: [{
                content:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                name:'sherry',
                time: '2021/11/28 11:35:30',//原提问
                relist:[{
                    name:'X',
                    role:'老师',
                    repto:'sherry',
                    content: '11',
                    time: '2021/12/28 12:23:39',
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
            this.repinfo='回复:'
        },
        submitRep(Index){
            if(this.reparea=='' || this.reparea.replace(/(^\s*)|(\s*$)/g, "")==""){
                this.$message({
                    message: '回复不能为空',
                    type: 'warning'
                    });
            }
            else{
                var mytime=(new Date()).toLocaleString('chinese',{hour12:false});
                this.historyList[Index].relist.push({name:'X',role:'老师',repto:'sherry',content:this.reparea,time:mytime});
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