import axios from "./http"

// 校验登陆数据
async function loginData(usrname, password) {  
    var res = {}
    await axios.get('/studentlogin/' + usrname + '/' + password).then(response => {
        console.log('/login', response.data)
        res = response
    })
    console.log('res js', res)
    return res
}

// 发送注册数据至后端
async function registerData(usrname,pswd,tel){
    return axios.post('',{
        usrname: usrname,
        password: pswd,
        telnum: tel
    })
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