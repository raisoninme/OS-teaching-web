<template>
  <div>
    <div class="top"></div>
    <div class="block">
      <div class="title">
          <img class="logo" src="../../assets/icon/teach.png"> 
          <span class="intro1">course website</span>
          <span class="intro2">
          操作系统原理与实践课程教学平台
          </span>
      </div>
      <div style="height: 640px; background-color: rgb(138,138,138)">
        <div class="login_block">
          <div class="one">
            <h1 style="margin: 5px 0; font-size: 20px; color:#515A61; text-align: center">
              操作系统原理与实践课程教学平台
            </h1>
            <h2 style="text-align: center; font-weight:600">登录
                <span style="font-size: 16px">没有账号？<span @click="gotoReg" class="registerline">点此注册</span></span>
            </h2>
          </div>
          <div class="two">
            <el-form ref="form" :rules="rules" :model="form" class="loginform">
                <el-form-item prop="role" style="display: flex; justify-content:center">
                      <el-radio v-model="form.role" :label="1">学生</el-radio>
                      <el-radio v-model="form.role" :label="2">老师</el-radio>
                </el-form-item>
                <el-form-item prop="name">
                    <el-input v-model="form.name" 
                    maxlength="10" show-word-limit
                    prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password"
                    prefix-icon="el-icon-key"
                    type="password" maxlength="20"
                    show-password placeholder="请输入密码"
                    ></el-input>
                </el-form-item>
                <el-form-item style="display: flex; justify-content:center">
                    <el-button plain style="width:300px" @click="onLogin('form')">登录</el-button>
                </el-form-item>
                <el-checkbox v-model="form.isAdm">管理员选项</el-checkbox>
            </el-form>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    let validateName = (rule, value, callback) => {   
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!this.checkName(value)) {
        callback(new Error('用户名不合法，请检查用户名'))
      } else {
        callback()
      }
    };
    return {
      form: {
        name: "",
        password: "",
        role: 0,
        isAdm: false,
      },
      rules: {
          name: [{ validator: validateName, trigger: 'blur' }],
          pswd: [
              { required: true, message: '请输入密码', trigger: 'blur' }
          ]
      }
    };
  },
  methods: {
    onLogin(formName) {
        this.$refs[formName].validate( async valid => {
          if (valid) {
            if(this.form.role==''&&this.form.isAdm==false){
              this.$message.error('请选择一个角色登录');
            }
            else{
            if(this.form.isAdm==true) {this.form.role = 0}
            // 发送表单至后端，进行用户名密码核查
            const res = await this.$api.login.loginData(this.form.name, this.form.password, this.form.role);
            // const res = await this.$api.login.registerData(this.form.name, this.form.password);
            if(res.code !== 200 || res.msg !== 'success'){
              return this.$message.error('登陆失败，请检查账户或密码');
            }
            else{
              this.$globalData.role = this.form.role
              this.$globalData.usrname = res.data[0].name
              if(this.$globalData.role === 0){
                this.$globalData.sid = res.data[0].sid
              }
              else{
                this.$globalData.tid = res.data[0].tid
              }
              this.$message({
              message: '登录成功',
              type: 'success'
              });
              this.$router.push("/Index")
            }       
            }
          }else {
            return false;
          }
        });
      },
    gotoReg() {
      this.$router.push('/register')
    },
    checkName(str) {
      let re1 = /^[a-zA-Z]([a-zA-Z0-9_-]{0,10})+$/;
      let re2 = /[\u4E00-\u9FA5]/; 
      if (re1.test(str)) {
        return true;
      }else if(re2.test(str)){
        return true; 
      }else{
        return false;
      }
    }
  }
};
</script>

<style scoped>
.top {
    background-color:black;
    height: 25px;
}
.logo {
    /* width:4%; */
    height: 50px;
    vertical-align: middle;
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
.block {
    margin: 25px 0 40px;
    position: relative;
    z-index:99;
}
.login_block {
    position: absolute;
    left: 50%;
    top: 53%;
    transform: translate(-50%,-50%);
    z-index:999;
    background-color:white;
    border-radius: 15px;
}

.one{
  padding: 25px 0 0;
}
.two {
  padding: 10px 25px 25px 25px;
}
/* 标题 */
.registerline{
  color: #337AB7;
  font-style: italic;
}
.registerline:hover {
    color:black;
    font-style: italic;
    text-decoration: underline;
    cursor:pointer
}
</style>