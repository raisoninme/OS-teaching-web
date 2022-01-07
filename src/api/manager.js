import axios from "./http"

// 管理员拉取
async function findAll() {  
    var res = {}

    await axios.get('/student/findall').then(response => {
        res = response
    })
    console.log('manager: find all student', res)
    return res
    
}

// 管理员删除学生
async function studentDelete(sid) {  
    var res = {}

    await axios.get('/student/delete/' + sid).then(response => {
        res = response
    })
    console.log('manager: delete student', res)
    return res
    
}


export default {
    findAll,
    studentDelete
}