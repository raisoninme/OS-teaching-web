# OS teaching web

> A Vue.js project

***重要说明：由于环境配置原因，不建议后端同学下载使用此代码！后端同学对本代码具体使用说明请见下文***

## 注意事项：

1. 本仓库权限为private，权限仅对综设小组成员开放
2. 请不要直接对主分支进行修改，如果merge时遇到代码冲突，请先abort此次合并并与同组成员沟通
3. 请提交时，写明大致完成部分
4. 后端同学可以在本文档中看到大致完成的页面，前端同学会不定期传送图片附于文档最后用于参考
5. 友情提示：请尽量使用ssh进行传输，http方式容易time out

## 后端同学使用看这里

### 1.下载代码（不推荐）

- 请直接下载zip压缩包避免对代码误操作而对远程仓库造成影响

### 2.查看前端api用于前后端交互

- 所有api文件位于src->api文件夹中（api与http文件为配置文件，由前端同学查看编写即可，后端同学请跳过），其余js文件中的function为前端封装的函数，除axios.post（）外的内容由前端编写，后端请跳过
- 请注意核对axios.post()中的第一个参数（类型为字符串），这是后端path和前端会发送的query，需要由后端同学提供并核对
- axios.post()中的第二个参数为对象（默认传递的是json格式的数据），请后端同学查看所传数据是否符合后端要求（具体指传送数据是否冗余/缺少，其他不做太大更改，前端同学会在api文档中对所传数据进行解释）
- 另外：请后端返回中携带token，因为涉及登录者的权限以及页面跳转等问题

## 前端同学看这里

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

## 页面展示（11.12更新）
![img](https://i.bmp.ovh/imgs/2021/11/6dc743f441c07a89.png)
![img](https://i.bmp.ovh/imgs/2021/11/6975446c36ea6170.png)
![img](https://s3.bmp.ovh/imgs/2021/11/938d2c462fe94064.png)
![img](https://i.bmp.ovh/imgs/2021/11/745b6c490d8d5e3a.png)
![img](https://i.bmp.ovh/imgs/2021/11/c97754311bd5a0bd.png)
![img](https://i.bmp.ovh/imgs/2021/11/9f43dde4a1af72d4.png)
![img](https://i.bmp.ovh/imgs/2021/11/708dd7dc59a53660.png)
![img](https://i.bmp.ovh/imgs/2021/11/a9980b8def248074.png)
![img](https://i.bmp.ovh/imgs/2021/11/48eb1165f75cb51c.png)
![img](https://i.bmp.ovh/imgs/2021/11/3fc6572c9b7e7efe.png)