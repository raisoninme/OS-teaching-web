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
              :rules="rule"
              ref="form"
            >
            <el-form-item style="display: flex; justify-content:center">
              <i class="el-icon-star-on">仅能注册学生</i>
            </el-form-item>
            <el-form-item prop="name">
              <el-popover
                placement="top-start"
                title="用户名规则"
                width="200"
                trigger="hover"
                content="英文字母开头（小写或大写均可），用户名中仅可包含英文大小写字母，数字，-和_符号">
                <el-input slot="reference" v-model="form.name" auto-complete="off" placeholder="请自定义用户名"  maxlength="10" show-word-limit></el-input>
              </el-popover>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password"
                v-model="form.password" auto-complete="off"
                placeholder="设定密码，不超过20位" show-password
                maxlength="20"></el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                <el-input type="password"
                v-model="form.checkPass" auto-complete="off"
                placeholder="再次输入，确认密码" show-password
                maxlength="20"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="submitForm('form')" style="width:100%;">注册</el-button>
              </el-form-item>
              <p class="login" @click="gotoLogin">已有账号？立即登录</p>
            </el-form>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Register", 
  data() {
    // 验证用户名
    let validateName = (rule, value, callback) => {   
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!this.checkName(value)) {
        callback(new Error('用户名不合法，请检查用户名'))
      } else {
        callback()
      }
    };
    // 验证密码
    let validatePass = (rule, value, callback) => {   
      if (value === "") {
        callback(new Error("请输入密码，不超过20位"))
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback()
      }
    };
    // 二次验证密码
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {  
      form: {
        name: "",
        password: "",
        checkPass: "",
      },
      rule: {
        name: [{ validator: validateName, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
      }
    }
  }, 
  methods: {
    // <!--提交注册-->
    submitForm(formName) {
      this.$refs[formName].validate( async valid => {
        if (valid) {          
          // 调后端注册
          const res = await this.$api.login.registerData(this.form.name, this.form.password);
          if(res.code !== 200 || res.msg !== 'success'){
            return this.$message.error('注册失败，请检查账户或密码');
          }
          else{
            this.$message({
            message: '注册成功',
            type: 'success'
          })
          }
          
        }else {
          console.log("error submit!!");
          return false;
        }
      })
    },
    // <!--进入登录页-->
    gotoLogin() {
      this.$router.push('/login');
    },
    checkName(str) {
      let re = /^[a-zA-Z]([a-zA-Z0-9_-]{0,10})+$/;
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
    width:350px;
}

.one{
  padding: 25px 0 0;
}
.two {
  padding: 10px 25px 25px 25px;
}
/* 标题 */
.login {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: #337AB7;
  font-style: italic;
  text-align: right;
}
.login:hover {
  color: black;
  text-decoration: underline;
  cursor:pointer
}
</style>