<template>
    <div>
        <head-top></head-top>     
        <div style="margin: 20px 150px 0 40px">
            <el-card class="el-card-d" shadow="always">
             <div class="infinite-list-wrapper" style="overflow:auto;">
                <el-timeline
                  infinite-scroll-disabled="disabled">
                <div v-if="allmessages.length>0"> 
                  <el-timeline-item v-for="(item,index) in allmessages"  :key="index" :timestamp='item.createTime' placement="top">
                    <el-card class="el-card-m" style="height:120px">
                      <h4>{{item.memberName}}：</h4>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.content}}</p>
                    </el-card>
                  </el-timeline-item>
                </div>
                <div v-else>
                   <el-timeline-item placement="top">
                    <el-card class="el-card-m" style="height:120px">
                      <h4>系统：</h4>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 说点什么吧😁</p>
                    </el-card>
                  </el-timeline-item>
                </div>
              </el-timeline> 
              </div>
              <div class="el-card-messages">
                 <el-input type="textarea" :rows="5" placeholder="输入留言" maxlength="200" v-model="message"></el-input>
                 <el-button type="info" round class="submit-message" @click="submitMessage">留言</el-button>
              </div>
            </el-card>
        </div>  
    </div>
</template>

<script>
import headTop from '../components/HeadTop'
export default {
    components: {
        headTop
    },
    data() {
        return {
            message:'',
            // allmessages需要从后端调用，以下仅为前端展示
            allmessages:[
                {
                    memberName: "a333",
                    content:"gulugulu",
                    createTime: '2021/11/28 11:35:30'
                },
                {
                    memberName:"a123",
                    content:"123",
                    createTime: '2021/11/28 11:34:30'
                }
            ]
        };
    },
    methods: {
    submitMessage(){
      if(this.message=='' || this.message.replace(/(^\s*)|(\s*$)/g, "")==""){
          this.$message('写点什么吧😉');
          return;
      }
    //   头插法添加新元素到allmessages中 name需要从token中读取
      this.allmessages.unshift({memberName:'a1111',content:this.message,createTime:'2021/11/28 11:42:10'})
    //    这里往下写调用后端的代码；
      }
    }
}
</script>

<style scoped>
   .infinite-list-wrapper {
      width: 100%;
      height: 500px;
    }
    .submit-message{
        width: 100%; 
        background: rgb(235, 245, 247);
        color: cadetblue;
        letter-spacing:20px;
        margin-top: 20px;
    }  
</style>