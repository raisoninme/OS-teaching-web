import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push 
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [
    {path: '/', redirect: '/introduce'},
    {path: '/login', name: 'Login', component: ()=>import('../views/login/Login')},
    {path: '/register', name:'Register', component: ()=>import('../views/login/Register')},
    {path: '/introduce', name:'Introduce', component: ()=>import('../views/Introduce')},
    {path: '/index', name: '', component: ()=>import('../views/Index'),
     children: [
      {path: '', name:'Home', component: ()=>import('../views/Home'),meta:[]},
      {path: '/classesInfo', name:'ClassesInfo', component: ()=>import('../views/ClassesInfo'),meta:['课程信息']},
      {path: '/classesDetail', name:'ClassesDetail', component: ()=>import('../views/ClassesDetail'),meta:['课程信息','课程详情']},
      {path: '/homeworkInfo', name:'HomeworkInfo', component: ()=>import('../views/homework/HomeworkInfo'),meta:['作业辅导','作业信息']},
      {path: '/homeworkBoard', name:'HomeworkBoard', component: ()=>import('../views/homework/HomeworkBoard'),meta:['作业辅导','作业交流']},
      {path: '/experiment', name:'Experiment', component: ()=>import('../views/Experiment'),meta:['实验辅导']},
      {path: '/massageBoard', name:'MassageBoard', component: ()=>import('../views/MassageBoard'),meta:['留言板']},
      {path: '/instruction', name:'Instruction', component: ()=>import('../views/Instruction'),meta:['说明']},
     ]
    }
  ]
})

// 设置导航守卫，登陆后才能进入其他页面
// router.beforeEach((to,from,next)=>{
//   if(to.path === '/login') return next()
//   const tokenStr = windows.sessionStorage.getItem('token')
//   if(!tokenStr) return next('/login')
//   next()
// })

export default router
