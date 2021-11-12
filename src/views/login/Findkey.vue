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
          </div>
          <div class="two">
            <el-form
            :model="form"
            status-icon
            :rules="rules3"
            ref="form"
            class="loginform"
            >
              <el-form-item prop="tel">
                <el-input v-model="form.tel" auto-complete="off" placeholder="请输入注册时使用的手机号"></el-input>
              </el-form-item>
              <el-form-item prop="smscode" class="code">
                <el-input v-model="form.smscode" placeholder="验证码"></el-input>
                <el-button plain type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button>
              </el-form-item>
              <el-form-item prop="pass">
                <el-input type="password" v-model="form.pass" auto-complete="off" placeholder="输入新密码" show-password></el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                <el-input type="password" v-model="form.checkPass" auto-complete="off" placeholder="确认新密码" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-button plain type="primary" @click="submitForm('form')" style="width:100%;">注册</el-button>
                <p class="login" @click="gotoLogin">返回登录界面</p>
              </el-form-item>
            </el-form>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Findkey", 
  data() {
    // <!--验证手机号是否合法-->
    let checkTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!this.checkMobile(value)) {
        callback(new Error('手机号码不合法'))
      } else {
        callback()
      }
    }
    //  <!--验证码是否为空-->
    let checkSmscode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机验证码'))
      } else {
        callback()
      }
    }
    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"))
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback()
      }
    }
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {  
      form: {
        pass: "",
        checkPass: "",
        tel: "",
        smscode: ""
      },
      rules3: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        tel: [{ validator: checkTel, trigger: 'change' }],
        smscode: [{ validator: checkSmscode, trigger: 'change' }],
      },
      buttonText: '发送验证码',
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true
    }
  }, 
  methods: {
    // <!--发送验证码-->
    sendCode () {
      let tel = this.form.tel
      if (this.checkMobile(tel)) {
        let time = 60
        this.buttonText = '已发送'
        this.isDisabled = true
        if (this.flag) {
          this.flag = false;
          let timer = setInterval(() => {
            time--;
            this.buttonText = time + ' 秒'
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = '重新获取'
              this.isDisabled = false
              this.flag = true;
            }
          }, 1000)
        }
      }
    },
    // <!--提交新密码-->
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          setTimeout(() => {
            // const {data: res} = await this.$api.login.findkeyData(this.form.pass,this.form.tel);
            // if(res.meta.status !== 200){
            //     return this.$message.error('该手机号没有账户，请先注册');
            // }
            this.$message({
            message: '新密码设置成功',
            type: 'success'
            });
          }, 400);
          this.gotoLogin();
        } else {
          console.log("error submit!!");
          return false;
        }
      })
    },
    // <!--进入登录页-->
    gotoLogin() {
      this.$router.push('/Login')
    },
    // 验证手机号
    checkMobile(str) {
      let re = /^1\d{10}$/
      if (re.test(str)) {
        return true;
      } else {
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
.login {
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  color: #1ab2ff;
  cursor: pointer;
  text-align: left;
  text-indent: 8px;
  width: 80%;
}
.login:hover {
  color: #2c2fd6;
}
.one{
  padding: 25px 0 0;
}
.two {
  padding: 10px 25px 25px 25px;
}
.code >>> .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.code button {
  margin-left: 20px;
  width: 140px;
  text-align: center;
}
</style>