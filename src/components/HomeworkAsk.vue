<template>
  <div style="margin-left: 40px; margin-right: 40px">
        <p style="font-size:14px">请在此输入你的问题：</p>
        <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入问题"
        v-model="textarea">
        </el-input>
        <div style="margin-top:15px"><el-button type="primary" @click="submitNewques">点击发送新问题</el-button></div>
        <div style="margin-top:15px" class="quesList"  v-for="(ques,Index) in quesList" :key="Index">
            <div style="padding:15px 15px 0 15px">
                <p style="color:#409EFF;font-weight:bold">您的提问:</p>
                <p style="color:#606266">{{ques.content}}</p>
                <span class="time">{{ques.time}}</span>
            </div>
            <el-divider content-position="left" v-if="ques.relist.length==0">已发送问题给老师，请耐心等待</el-divider> 
            <div class="reblock" v-for="(re,index) in ques.relist" :key="index" v-else>
                <div style="margin-bottom: 10px;color:#409EFF;font-weight:bold">
                    <span>{{re.name}}({{re.role}})</span>
                    <span>&nbsp;回复&nbsp;</span> 
                    <span>{{re.repto}}:</span>
                </div>
                <p style="color:#606266">{{re.content}}</p>
                <span class="time">{{re.time}}</span>
                <div><el-link type="primary" @click="reply(re.name,re.role)" v-if="re.name!=usrname">回复</el-link></div>
                <el-divider></el-divider>
            </div>  
            <div class="reinput" v-show="ques.relist.length!=0">
                <el-input type="textarea" :rows="2" v-model="reparea" :placeholder="repinfo"></el-input> 
                <el-button type="primary" @click="submitRep(Index)" size="mini" style="margin-top:5px">回复</el-button>
            </div>
            <el-divider></el-divider>
        </div> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            usrname:this.$globalData.usrname,
            rep:false,
            textarea: '',
            reparea:'',
            repinfo:'回复:',
            // 从后台获取 传入学生name 得学生评价过的内容，以及每一条内容对应的回复
            quesList: [{
                content:"不会做作业",
                time: '2021/11/28 11:35:30',
                relist:[{
                    name:'X',
                    role:'老师',
                    repto:'sherry',
                    content: '这你都不会？？',
                    time: '2021/11/28 12:35:30',
                }],
            }]
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        reply(name,role){
            this.repinfo="回复 "+name+"("+role+"):"
        },
        submitNewques() {
            if(this.textarea=='' || this.textarea.replace(/(^\s*)|(\s*$)/g, "")==""){
                this.$message({
                    message: '提问不能为空',
                    type: 'warning'
                    });
            }
            else{
                //将textarea的提问content交给后端，并刷新当前页面，便于从后端抓取显示已提交的问题
                // const res = this.$api.hwAsk.askQues('raise_a_quesion!',this.textarea,this.$globalData.sid,'teacher_1');
                // if(res.code !== 200 || res.msg !== 'success'){
                //     console.log(res);
                //     return this.$message.error('请重试');
                // }
                // else{
                    var mytime=(new Date()).toLocaleString('chinese',{hour12:false});
                    this.quesList.unshift({content:this.textarea,time:mytime,relist:[]})
                    this.$message({
                    message: '已成功提交问题给老师!',
                    type: 'success'
                    });
                // }   
            }   
        },
        submitRep(Index){
            if(this.reparea=='' || this.reparea.replace(/(^\s*)|(\s*$)/g, "")==""){
                this.$message({
                    message: '回复不能为空',
                    type: 'warning'
                    });
            }
            else{
                //将reparea的提问content交给后端，并刷新当前页面，便于从后端抓取显示已提交的回复
                var mytime=(new Date()).toLocaleString('chinese',{hour12:false});
                this.quesList[Index].relist.push({name:'sherry',role:'学生',repto:'X',content:this.reparea,time:mytime});
                this.$message({
                    message: '已成功回复!',
                    type: 'success'
                    });
            } 
        }
    }
}
</script>

<style scoped>
.quesList {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.reblock{
    margin-left: 20px;
    margin-right: 10px;
    padding:8px 10px 2px 20px;
}
.reinput {
    margin-left: 20px;
    margin-right: 10px;
    padding:8px 10px 2px 20px;
}
.reblock .el-divider--horizontal{
     margin: 0;
     background: 0 0;
     border-top: 1px dashed #9f9fa0;
} 
.time {
    font-size:4px;
    font-style:italic;
    color:#606266;
}
</style>