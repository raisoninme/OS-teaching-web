import axios from "./http"

// 校验登陆数据
async function findLatestCourse() {  
    var res = {}

    await axios.get('/course/findLatest').then(response => {
        res = response
    })
    console.log('/course/findLatest', res)
    return res
    
}




export default {
    findLatestCourse,
}