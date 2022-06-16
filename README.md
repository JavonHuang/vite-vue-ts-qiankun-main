# Vue 3 + TypeScript + Vite

本项目使用Vue 3和[Vite](https://vitejs.cn/guide/)结合TypeScript进行开发。模板使用Vue 3 `<script setup>`更多信息参考 [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## About qiankun.js

qiankun 是一个基于 single-spa 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。

qiankun 孵化自蚂蚁金融科技基于微前端架构的云产品统一接入平台，更多信息科参考[乾坤官网](https://qiankun.umijs.org/)介绍。

## 项目介绍
当前项目是微前端的主应用项目，将作为一个系统集成平台。其他子系统将通过qiankun.js的方式接入平台。

- 功能点
1. 通过接口获取子应用列表实现动态配置微应用
2. 处理路由异常及应用加载异常公用主应用错误页面
3. 实现主应用与子应用间双向通信

## 配套子应用项目
- [system应用](https://github.com/JavonHuang/vue2-qiankun-system)
- [customer应用](https://github.com/JavonHuang/vue2-qiankun-customer)