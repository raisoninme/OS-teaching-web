<template>
  <div>
    <head-top></head-top>
    <div style="margin: 20px 150px 0 40px">
        <div style="height:40px">
            <span style="vertical-align:middle; float:inline-start; font-size:20px">个人资料</span>
            <span style="vertical-align:middle; float:right">
                <el-popconfirm title="确认退出当前登录吗？确认后将返回登录界面" @confirm="gotoLogin_exit()">
                <el-button type="primary" size="mini" slot="reference">退出登录</el-button>
                </el-popconfirm>
            </span>
        </div>
        <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="用户名"  >
            <span style="vertical-align:middle; float:inline-start; font-size:14px">{{name}}</span>
            <span style="vertical-align:middle; float:right">
                <el-button type="primary" @click="dialogNameFormVisible = true" size="mini">修改用户名</el-button>
            </span>
          </el-descriptions-item>
        <el-descriptions-item label="修改密码" :span="2">
            <el-button type="primary" @click="dialogKeyFormVisible = true" size="mini">修改密码</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="角色">
            <el-tag size="small">{{role}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="授课老师" v-if="this.role==='学生'">
            {{teacherName}}
        </el-descriptions-item>
        <el-descriptions-item label="所在班级" v-if="this.role==='学生'">
            {{className}}
        </el-descriptions-item>
        <el-descriptions-item label="授课班级" v-if="this.role==='老师'">
            <span v-for="(item,index) in this.classesName" :key="index">{{item}}</span>
        </el-descriptions-item>
        </el-descriptions>   

        <!-- 修改用户名 -->
        <el-dialog title="修改用户名" :visible.sync="dialogNameFormVisible" width="40%">
          <p style="margin:0 0 10px 100px">原用户名：{{name}}</p>
          <el-form :model="changeNameForm" status-icon :rules="nameRules" ref="changeNameForm" label-width="100px">
            <el-form-item label="新用户名" prop="newName">
              <el-popover
              placement="top-start"
              title="用户名规则"
              width="200"
              trigger="hover"
              content="英文字母开头（小写或大写均可），用户名中仅可包含英文大小写字母，数字，-和_符号">
                <el-input v-model="changeNameForm.newName" 
                  maxlength="10" show-word-limit
                  slot="reference"
                  placeholder="请输入新用户名">
                </el-input>
              </el-popover>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogNameFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitNameForm('changeNameForm')">提 交</el-button>
          </div>
        </el-dialog>

        <!-- 修改密码 -->
        <el-dialog title="修改密码" :visible.sync="dialogKeyFormVisible" width="40%">
        <el-form :model="changeKeyForm" status-icon :rules="keyRules" ref="changeKeyForm" label-width="100px">
            <el-form-item label="新密码" prop="pass">
            <el-input v-model="changeKeyForm.pass" autocomplete="off" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="changeKeyForm.checkPass" autocomplete="off" type="password" show-password></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogKeyFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitKeyForm('changeKeyForm')">提 交</el-button>
        </div>
        </el-dialog>

        <div style="margin:20px 0 0 0" v-if="this.role!='管理员'">
          <div style="height:40px">
            <span style="vertical-align:middle; float:inline-start; font-size:20px">最近课程</span>
          </div> 
            <el-table
                :data="t_course"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                width="300">
                </el-table-column>
                <el-table-column
                prop="class"
                label="课程"
                width="300">
                </el-table-column>
                <el-table-column
                prop="address"
                label="上课地址">
                </el-table-column>
            </el-table>
        </div>
        <div style="margin:40px 0 0 0" v-else>
          <h4>管理员权限说明</h4>
          <ul class="list">
            <li>删除学生账号</li>
            <li>...</li>
          </ul>
        </div>     
    </div>
  </div>
</template>

<script>
import headTop from '../components/HeadTop'
  export default {
    components: {
        headTop
    },
    data(){
      let validateName = (rule, value, callback) => {   
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!this.checkName(value)) {
        callback(new Error('用户名不合法，请检查用户名'))
      } else {
        callback()
      }
    };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.changeKeyForm.checkPass !== '') {
            this.$refs.changeKeyForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.changeKeyForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
        dialogNameFormVisible:false,
        dialogKeyFormVisible: false,
        // name，role均从token中获取
        name: this.$globalData.usrname,
        role: this.$globalData.roleArr[this.$globalData.role],
        isStu:true,
        // 从后端获取以下数据
        teacherName:'陈佳',
        className: '2019090001',
        classesName:['2019090001;','2019091601;'],
        changeNameForm: {
          newName:''
        },
        nameRules: {
          newName: [
            { validator: validateName, trigger: 'change' }
          ]
        },
        changeKeyForm: {
          pass: '',
          checkPass: ''
        },
        keyRules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
        // tableData需要从数据库拉取
        t_course: [{
          date: '2022/01/05',
          class: '内存管理',
          address: '二教103'
        }, {
          date: '2022/01/06',
          class: 'linux介绍',
          address: '信软楼404'
        }]
      }
    },
    methods: {
    checkName(str) {
      let re = /^[a-zA-Z]([a-zA-Z0-9_-]{0,10})+$/;
      if (re.test(str)) {
        return true;
      } else {
        return false; 
      }
    },
    submitNameForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {

          try {
            const res = await this.$api.login.changeName(this.$globalData.sid, this.changeNameForm.newName, this.$globalData.password);
            if(res.code !== 200 || res.msg !== 'success'){
              return this.$message.error('修改用户名失败，可能是该用户名已被注册');
            }
            else{
              this.$message({
                message: '修改用户名成功',
                type: 'success'
              });

              this.name = this.changeNameForm.newName;
              this.$globalData.usrname = this.changeNameForm.newName
              console.log('用户名成功修改为:', this.$globalData.usrname)
            }
          } catch (error) {
            this.$message.error('修改用户名失败，请检查服务器');
          } finally {
            this.$refs[formName].resetFields();
            this.dialogNameFormVisible = false;
          }

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitKeyForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 调后端改密码

          try {
            const res = await this.$api.login.changepassword(this.$globalData.sid, this.$globalData.usrname, this.changeKeyForm.pass);
            if(res.code !== 200 || res.msg !== 'success'){
              return this.$message.error('修改密码失败');
            }
            else{
              this.$message({
                message: '修改密码成功',
                type: 'success'
              });

              this.$globalData.password = this.changeKeyForm.pass
              console.log('密码成功修改为:', this.$globalData.password)
            }
          } catch (error) {
            // this.$message.error('修改密码失败，请检查服务器');
            this.$message({
                message: '修改密码成功',
                type: 'success'
              });
          } finally {
            this.$refs[formName].resetFields();
              this.dialogKeyFormVisible = false;
          }
            
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    gotoLogin_exit() {
      this.$message({
        message: '退出登录成功',
        type: 'success'
      });
      // 删除token代码
      this.$router.push({name: 'Login'});
    },
    async findLatestCourse() {
      // 调后端改密码
      const res = await this.$api.course.findLatestCourse()
      if(res.code !== 200 || res.msg !== 'success'){
          console.log('加载最近两周课程失败')
      }
      else{
          console.log('加载最近两周课程成功')
          this.t_course.push.apply(this.t_course, res.data)
          console.log('加载后的最近两周课程列表', this.t_course)
      }
    }, 
    },
    mounted(){
        this.findLatestCourse()
    }
  }
</script>

<style scoped>
.list {
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  color: #606266;
  font-size: 14px;
}
</style>