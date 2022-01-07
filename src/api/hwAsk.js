import { Slider } from "element-ui"
import { tempdir } from "shelljs"
import axios from "./http"


发送注册数据至后端
async function askQues(title,content,sid,tid){
    return axios.post('/question/addNewQuestion/',{
        title:title,
        content:content,
        sid:sid,
        tid:tid
    })
}

export default {
    // askQues
}