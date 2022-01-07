import axios from "./http"

// 校验登陆数据
async function findLatestCourse() {  
    var res = {}

    await axios.get('/course/findLatest').then(response => {
        res = response
    })
    console.log('course find latest 2 week:', res)
    return res
    
}

// 拉取所有课程
async function courseFindAll(){
    var res = {}

    await axios.get('/course/findAll/' + '1/20').then(response => {
        res = response
    })
    console.log('course find all:', res)
    return res
}

// 添加课程
async function courseSave(T_Course){
    var res = {}

    await axios.post(`course/save`, JSON.stringify(T_Course)).then(response=>{
        res = response         
    })
    console.log('new course:', res)
    return res
}

async function courseUpdate(T_Course){
    var res = {}

    await axios.put(`/course/update`, JSON.stringify(T_Course)).then(response=>{
        res = response         
    })
    console.log('update course:', res)
    return res
}

async function courseDelete(cid){
    var res = {}

    await axios.delete('/course/deleteById/' + cid).then(response => {
        res = response
    })
    console.log('delete course:', res)
    return res
}


export default {
    findLatestCourse,
    courseFindAll,
    courseSave,
    courseUpdate,
    courseDelete,
}