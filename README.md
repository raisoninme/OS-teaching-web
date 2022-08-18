<!-- 
2.index+管理员入口（删除学生）
4.管理员：留言板删除留言
5.师生交流
6.首页（七天之内课程 接口）（作业消息&留言板消息更新信息） -->


# OS teaching web

> A Vue.js project

### 1.技术栈说明（初始化时已引入，无需再次引入）

- 组件库使用element-ui
- 通过axios与后端交互
- 通过vue-router管理路由
- 通过vuex管理状态（存储token等）
- 如有其他需要在项目中引入，请先与同组同学讨论（字体/颜色等除外）

### 2.代码规范

- 请将会复用的组件添加至components中，页面放置于views中
- 请使用scoped避免造成style全局污染
- 窗口伸缩时组件的位置问题等css格式可在最后进行调整，前期不苛求


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
