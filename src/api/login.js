import axios from "./http"

// 校验登陆数据
function loginData(usrname, pswd) {
    return axios.post('',{
        username: usrname,
        password: pswd
    })
}

// 发送注册数据至后端
function registerData(usrname,pswd,tel){
    return axios.post('',{
        usrname: usrname,
        password: pswd,
        telnum: tel
    })
}

function findkeyData(pswd,tel){
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