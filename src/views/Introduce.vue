<template>
<div style="height: 100%">
    <div class="top"></div>
    <div class="block">
        <div class="title">
            <img class="logo" src="../assets/icon/teach.png"> 
            <span class="intro1">course website</span>
            <span class="intro2">
            操作系统原理与实践课程教学平台
            </span>
        </div>
        <el-carousel height="640px">
            <el-carousel-item v-for="item in imgwrap" :key="item.url">
            <img :src="item.url" class="bannerimg"/>
            </el-carousel-item>
        </el-carousel>
        <div class="content_block">
            <h2>Start Learning For</h2>
            <h2>Success Future</h2>    
            <h4>click here to sign in or register</h4>
            <div class="button_row">
                <el-button plain style="width:140px;height:50px;font-weight:600;font-size: 16px" @click="gotoLogin">登录</el-button>
                <el-button plain style="width:140px;height:50px;font-weight:600;font-size: 16px" @click="gotoReg">注册</el-button>
            </div>
        </div>
  </div>
</div>

</template>

<script>
export default {
    name: 'Introduce',
    data(){
        return{
            bannerHeight: 200,
            imgwrap:[
                {url:require("../assets/img/pic1.jpg")},
                {url:require("../assets/img/pic2.jpg")},
                {url:require("../assets/img/pic3.jpg")},
            ]
        }
    },
    mounted(){
       this.setSize();
       window.addEventListener('resize', ()=>{
         this.setSize();
       },false);       
    },
    methods:{
    setSize(){
      this.bannerHeight = document.body.clientWidth / 4
    },
    gotoLogin(){
        this.$router.push('/login')
    },
    gotoReg(){
        this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.top {
    background-color: black;
    height: 25px;
}
.logo {
    /* width:4%; */
    height: 50px;
    vertical-align: middle;
}
.bannerimg{
    width: 100%;
    height: inherit;
    opacity: 0.7;
}
.block {
    margin: 25px 0 40px;
    position: relative;
    z-index:99;
}
.title {
    padding: 0 100px 25px;
}
.intro1 {
    font-size: 30px;
    font-weight: 600;
    color:#515A61;
    vertical-align: middle;
    float:inline-start;
}
.intro2 {
    font-size: 30px;
    font-weight: 600;
    color:#515A61;
    vertical-align: middle;
    float: right;
}
.content_block {
    position: absolute;
    left: 50%;
    top: 53%;
    transform: translate(-50%,-50%);
    z-index:999;
}
.content_block h2 {
    font-size: 80px;
    font-weight: 700;
    color:rgb(27, 26, 26);
    text-align: center;
    margin:2px;
}
.content_block h4 {
    text-align: center;
    font-weight: 600;
    color:rgb(27, 26, 26);
}
.button_row {
    padding: 30px;
    text-align: center;
}
</style>