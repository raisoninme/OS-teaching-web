import axios from "./http"

// 管理员拉取
async function findAll() {  
    var res = {}

    await axios.get('/exercise/findAll/').then(response => {
        res = response
    })
    console.log('exercise find all', res)
    return res
    
}


export default {
    findAll,
    
}