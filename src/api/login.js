import axios from "./http"

// 校验登陆数据
async function loginData(usrname, password, role=1) {  
    var res = {}

    // 学生登录
    if(role === 1){
        await axios.get('/student/login/' + usrname + '/' + password).then(response => {
            console.log('/login', response.data)
            res = response
        })
        console.log('student login', res)
        return res
    }
    // 教师/管理员登录
    else{
        await axios.get('/teacher/login/' + usrname + '/' + password).then(response => {
            console.log('/login', response.data)
            res = response
        })
        console.log('teacher login', res)
        return res 
    }
}

// 发送注册数据至后端
async function registerData(usrname, password){
    var res = {}
    console.log('yes')

    await axios.get('/student/register/' + usrname + '/' + password).then(response => {
        console.log('/register', response.data)
        res = response
    })
    console.log('student register', res)
    return res 
}

async function findkeyData(pswd,tel){
    return axios.post('',{
        telnum:tel,
        password:pswd
    })
}

export default {
    loginData,
    registerData,
    findkeyData
}