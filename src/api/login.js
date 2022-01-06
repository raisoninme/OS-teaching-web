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

async function changeName(sid, newName, password){
    var res = {}
    console.log('changeName')

    await axios.get('/student/changename/' + sid + '/' + newName+ '/' + password).then(response => {
        console.log('/changename', response.data)
        res = response
    })
    console.log('changename', res)
    return res 
}

async function changepassword(sid, name, newPassword){
    var res = {}
    console.log('changepassword')

    await axios.get('/student/changename/' + sid + '/' + name+ '/' + newPassword).then(response => {
        console.log('/changepassword', response.data)
        res = response
    })
    console.log('changepassword', res)
    return res 
}

export default {
    loginData,
    registerData,
    findkeyData,
    changeName,
    changepassword,
}