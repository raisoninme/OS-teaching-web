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
                      <h4>{{item.memberName}}:</h4>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.content}}</p>
                      <div style="float:right; padding-right:20px"> 
                        <span class="circle flex-h" @click="item.isUp=!item.isUp" :class="item.isUp?'check':''">
                          <div class="img-box" :class="item.isUp?'img-box-check':''">
                            <img v-if="item.isUp" src="../assets/img/点赞2.png" alt="" />
                            <img v-else src="../assets/img/点赞1.png" alt="" />
                          </div>
                        </span>
                        <span style="vertical-align:middle;font-size:14px">{{item.praiseNum+item.isUp}}</span>
                      </div>                   
                    </el-card>
                  </el-timeline-item>
                </div>
                <div v-else>
                   <el-timeline-item placement="top">
                    <el-card class="el-card-m" style="height:120px">
                      <h4>系统:</h4>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 说点什么吧😁</p>
                    </el-card>
                  </el-timeline-item>
                </div>
              </el-timeline> 
              </div>
              <div class="el-card-messages">
                <el-form ref="textForm" :model="textForm">
                  <el-form-item  prop="message">
                    <el-input type="textarea" :rows="5" placeholder="输入留言" maxlength="200" v-model="textForm.message"></el-input>
                    <el-button type="info" round class="submit-message" @click="submitMessage">留言</el-button>                    
                  </el-form-item>
                </el-form>
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
            name:this.$globalData.usrname,
            fit:'fill',
            textForm:{message:''},
            isPraised: 0,
            // allmessages需要从后端调用，以下仅为前端展示
            allmessages:[
                {
                    memberName: "管理员",
                    content:"发表留言时请注意礼貌用词哦~",
                    createTime: '2021/11/28 11:35:30',
                    praiseNum: 0,
                    isUp: false,
                },
            ]
        };
    },
    methods: {
    submitMessage(){
      if(this.textForm.message=='' || this.textForm.message.replace(/(^\s*)|(\s*$)/g, "")==""){
          this.$message('写点什么吧😉');
          return;
      }
    //   头插法添加新元素到allmessages中 name需要从token中读取
      this.allmessages.unshift({memberName:this.name,content:this.textForm.message,createTime:'2021/11/28 11:42:10',praiseNum:0,isUp:false});
      this.$refs["textForm"].resetFields();
    //    这里往下写调用后端的代码；
    },
  }
}
</script>

<style lang='less' scoped>
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
/* .praiseClick {
  width: 20px; 
  height: 20px;
}
.praiseClick:hover {
  cursor:pointer
} */
.circle {
  float: left;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 0px 0px 0px rgba(223, 46, 58, 0.5);
  width: 20px;
  .img-box {
    width: 20px;
    height: 20px;
    // margin: 5px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none; // 防止快速点击图片被选中，可不加，为提高体验，博主加上了这几行代码。
    & img {
      width: 100%;
      height: 100%;
    }
  }
}
.check {
  -webkit-transition: box-shadow 0.5s;
  -moz-transition: box-shadow 0.5s;
  -o-transition: box-shadow 0.5s;
  transition: box-shadow 0.5s;
  box-shadow: 0px 0px 0px 1em rgba(226, 32, 44, 0);
}
.img-box-check {
  animation: anm 0.5s;
  -moz-animation: anm 0.5s;
  -webkit-animation: anm 0.5s;
  -o-animation: anm 0.5s;
}
@keyframes anm {
  0% {
    transform: scale(0);
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
  }
  50% {
    transform: scale(1.3);
    -webkit-transform: scale(1.3);
    -moz-transform: scale(1.3);
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
  }
}
</style>